
# ping_ws_server.py
# Servidor WebSocket que mede latência ICMP e transmite ranking em tempo real.
# Requisitos: Python 3.9+, e 'websockets' (pip install websockets)
#
# Como rodar:
#   pip install websockets
#   python ping_ws_server.py
# Frontend deve conectar em ws://localhost:8765
#
import asyncio
import json
import platform
import shutil
import sys
import time
from collections import deque

try:
    import websockets
except ImportError:
    print("Dependência ausente: instale com 'pip install websockets'")
    raise

HOSTS = [
    ("Google", "www.google.com.br"),
    ("Amazon", "www.amazon.com"),
    ("Americanas", "www.americanas.com.br"),
    ("Bradesco", "banco.bradesco"),
    ("C6 Bank", "c6bank.com.br"),
    ("Caixa", "179.191.172.17"),
    ("Banco Central", "bcb.gov.br"),
    ("Banco Inter", "www.bancointer.com.br"),
    ("Itaú", "itau.com.br"),
    ("Mercado Pago", "mercadopago.com.br"),
    ("PayPal", "paypal.com"),
    ("Sicoob", "sicoob.com.br"),
    ("Deezer", "deezer.com"),
    ("Discord", "discord.com"),
    ("Dota2", "dota2.com"),
    ("Shopee", "shopee.com.br"),
    ("Epic Games", "store.epicgames.com"),
    ("Facebook", "facebook.com.br"),
    ("Instagram", "instagram.com"),
    ("Twitter", "x.com"),
    ("LinkedIn", "linkedin.com"),
    ("MercadoLivre", "mercadolivre.com.br"),
    ("Nubank", "nubank.com.br"),
    ("OLX", "olx.com.br"),
    ("Outlook", "outlook.office.com"),
    ("Pinterest", "br.pinterest.com"),
    ("Playstation", "store.playstation.com"),
    ("Santander", "2.20.20.64"),
    ("Skype", "52.113.194.133"),
    ("Snapchat", "snapchat.com"),
    ("SoundCloud", "soundcloud.com"),
    ("Spotify", "spotify.com"),
    ("Steam", "store.steampowered.com"),
    ("Telegram", "web.telegram.org"),
    ("TikTok", "2.16.197.142"),
    ("Tinder", "tinder.com"),
    ("Tumblr", "192.0.77.40"),
    ("Twitch", "twitch.tv"),
    ("UOL", "uol.com"),
    ("Valorant", "187.16.216.68"),
    ("Vimeo", "vimeo.com"),
    ("Waze", "waze.com"),
    ("WhatsApp", "web.whatsapp.com"),
    ("Wikipedia", "wikipedia.org"),
    ("Xbox", "xbox.com"),
    ("YouTube", "youtube.com"),
    ("Zoom", "zoom.us"),
]


INTERVAL = 1.0   # segundos entre ciclos
TIMEOUT  = 5.0   # timeout do ping (segundos)
WINDOW   = 20    # tamanho da janela para média (últimos N pings)

history = {name: deque(maxlen=WINDOW) for name, _ in HOSTS}

def build_ping_cmd(host: str, timeout_s: float):
    sysname = platform.system().lower()
    if "windows" in sysname:
        timeout_ms = int(timeout_s * 1000)
        return ["ping", "-n", "1", "-w", str(timeout_ms), host]
    else:
        return ["ping", "-c", "1", "-W", str(int(timeout_s)), host]

async def ping_once(host: str, timeout_s: float):
    cmd = build_ping_cmd(host, timeout_s)
    t0 = time.perf_counter()
    try:
        proc = await asyncio.create_subprocess_exec(
            *cmd, stdout=asyncio.subprocess.DEVNULL, stderr=asyncio.subprocess.DEVNULL
        )
    except FileNotFoundError:
        return None
    try:
        await asyncio.wait_for(proc.wait(), timeout=timeout_s + 1.0)
    except asyncio.TimeoutError:
        with contextlib.suppress(ProcessLookupError):
            proc.kill()
        return None
    if proc.returncode != 0:
        return None
    t1 = time.perf_counter()
    return (t1 - t0) * 1000.0

async def measure_once():
    # mede todos em paralelo
    tasks = { name: asyncio.create_task(ping_once(host, TIMEOUT)) for name, host in HOSTS }
    results = {}
    for name, task in tasks.items():
        try:
            results[name] = await task
        except Exception:
            results[name] = None

    # atualiza histórico
    for name, val in results.items():
        if val is not None:
            history[name].append(val)

    # monta tabela
    rows = []
    for name, host in HOSTS:
        vals = list(history[name])
        avg = sum(vals)/len(vals) if vals else None
        rows.append({
            "name": name,
            "host": host,
            "last": results[name],
            "avg": avg,
            "samples": len(vals),
        })
    # ordenação padrão aqui é por maior latência atual (desc); se 'last' None, usa média; se None, vai pro fim
    def sort_key(r):
        key = r["last"] if r["last"] is not None else (r["avg"] if r["avg"] is not None else -1)
        return key
    rows.sort(key=sort_key, reverse=True)
    payload = {
        "ts": time.time(),
        "interval": INTERVAL,
        "timeout": TIMEOUT,
        "window": WINDOW,
        "rows": rows,
    }
    return payload

clients = set()

async def producer():
    while True:
        data = await measure_once()
        msg = json.dumps(data)
        # envia para todos os clientes conectados
        if clients:
            await asyncio.gather(*[ws.send(msg) for ws in list(clients)], return_exceptions=True)
        await asyncio.sleep(INTERVAL)

async def handler(websocket):
    clients.add(websocket)
    try:
        # envia um primeiro snapshot imediato
        data = await measure_once()
        await websocket.send(json.dumps(data))
        async for _ in websocket:
            # não esperamos mensagens do cliente; ignoramos p/ manter conexão viva
            pass
    finally:
        clients.discard(websocket)

async def main():
    host = "0.0.0.0"
    port = 8000
    print(f"Servidor WebSocket em ws://{host}:{port}  (conecte seu frontend neste endereço)")
    async with websockets.serve(handler, host, port, ping_interval=20, ping_timeout=20):
        await producer()  # loop infinito

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nEncerrado.")
