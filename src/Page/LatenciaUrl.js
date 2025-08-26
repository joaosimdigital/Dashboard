// Frontend React – Horizontal BarChart com logos dentro das barras + animação suave + gradientes por marca
// Dependências: npm i recharts

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const LOGOS = {
  Google: "https://www.google.com/favicon.ico",
  Amazon: "https://www.amazon.com/favicon.ico",
  Americanas: "https://www.americanas.com.br/favicon.ico",
  Bradesco: "https://banco.bradesco/favicon.ico",
  BancoC6: "https://c6bank.com.br/favicon.ico",
  BancoCaixa: "https://www.caixa.gov.br/favicon.ico",
  BancoCentral: "https://www.bcb.gov.br/favicon.ico",
  Inter: "https://www.bancointer.com.br/favicon.ico",
  Itaú: "https://logospng.org/download/itau/logo-itau-1024.png", 
MercadoPago: "https://seeklogo.com/images/M/mercado-pago-logo-0FC3E8C5C9-seeklogo.com.png",
  PayPal: "https://www.paypal.com/favicon.ico",
  Sicoob: "https://www.sicoob.com.br/favicon.ico",
  Deezer: "https://www.deezer.com/favicon.ico",
  Discord: "https://discord.com/favicon.ico",
  Dota2: "https://www.dota2.com/favicon.ico",
  Shopee: "https://shopee.com.br/favicon.ico",
  EpicGames: "https://icons8.com.br/icon/83331/epic-games",
  Facebook: "https://www.facebook.com/favicon.ico",
  Instagram: "https://www.instagram.com/favicon.ico",
  Twitter: "https://x.com/favicon.ico",
  LinkedIn: "https://www.linkedin.com/favicon.ico",
  MercadoLivre: "https://www.mercadolivre.com.br/favicon.ico",
  Nubank: "https://nubank.com.br/favicon.ico",
  OLX: "https://www.olx.com.br/favicon.ico",
  Outlook: "https://outlook.office.com/favicon.ico",
  Pinterest: "https://br.pinterest.com/favicon.ico",
  Playstation: "https://store.playstation.com/favicon.ico",
  Santander: "https://www.santander.com.br/favicon.ico",
  Skype: "https://www.skype.com/favicon.ico",
  Snapchat: "https://www.snapchat.com/favicon.ico",
  SoundCloud: "https://soundcloud.com/favicon.ico",
  Spotify: "https://www.spotify.com/favicon.ico",
  Steam: "https://store.steampowered.com/favicon.ico",
  Telegram: "https://web.telegram.org/favicon.ico",
  TikTok: "https://www.tiktok.com/favicon.ico",
  Tinder: "https://tinder.com/favicon.ico",
  Tumblr: "https://www.tumblr.com/favicon.ico",
  Twitch: "https://www.twitch.tv/favicon.ico",
  UOL: "https://www.uol.com.br/favicon.ico",
  Valorant: "https://playvalorant.com/favicon.ico",
  Vimeo: "https://vimeo.com/favicon.ico",
  Waze: "https://www.waze.com/favicon.ico",
  WhatsApp: "https://web.whatsapp.com/favicon.ico",
  Wikipedia: "https://www.wikipedia.org/favicon.ico",
  Xbox: "https://www.xbox.com/favicon.ico",
  YouTube: "https://www.youtube.com/favicon.ico",
  Zoom: "https://zoom.us/favicon.ico"
};

export default function LatenciaUrl() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("desconectado");
  const [endpoint, setEndpoint] = useState("ws://localhost:3003");
  const wsRef = useRef(null);
  const [logosLoaded, setLogosLoaded] = useState(false);

  const latestRowsRef = useRef([]);
  const latestTsRef = useRef(0);
  const committedTsRef = useRef(0);

  // Pré-carregar logos
  useEffect(() => {
    const images = Object.values(LOGOS);
    let loaded = 0;
    images.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === images.length) setLogosLoaded(true);
      };
      img.onerror = () => {
        setTimeout(() => setLogosLoaded(true), 300);
      };
      img.src = src;
    });
  }, []);

  // WebSocket
  useEffect(() => {
    const ws = new WebSocket(endpoint);
    wsRef.current = ws;
    setStatus("conectando...");

    ws.onopen = () => setStatus("conectado");
    ws.onclose = () => setStatus("desconectado");
    ws.onerror = () => setStatus("erro");

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (!Array.isArray(data.rows)) return;
        latestRowsRef.current = data.rows;
        latestTsRef.current = data.ts || Date.now() / 1000;
      } catch {}
    };

    return () => ws.close();
  }, [endpoint]);

  // Commit a cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      if (!logosLoaded) return;
      if (latestTsRef.current > committedTsRef.current) {
        setRows(latestRowsRef.current || []);
        committedTsRef.current = latestTsRef.current;
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [logosLoaded]);

  const sorted = useMemo(() => {
    const data = [...rows];
    data.sort((a, b) => {
      const la = a?.last ?? a?.avg ?? -1;
      const lb = b?.last ?? b?.avg ?? -1;
      return lb - la;
    });
    return data;
  }, [rows]);

  function fmt(v) {
    return v == null || Number.isNaN(v) ? "–" : `${v.toFixed(0)} ms`;
  }

  const renderCustomLabel = ({ x = 0, y = 0, width = 0, height = 0, index }) => {
  const item = sorted[index];
  if (!item || !width || !height) return null;  // evita NaN
  
  const logo = LOGOS[item.name];
  const pad = 4;
  const size = Math.max(16, Math.min(height - pad * 2, 40));
  const left = x + pad;
  const top = y + (height - size) / 2;
  const showText = width > size + 40;

  return (
    <foreignObject x={left} y={top} width={Math.max(width - pad * 2, 0)} height={size}>
      <div style={{ display: "flex", alignItems: "center", height: size }}>
        <img
          src={logo}
          alt={item.name}
          style={{ width: size, height: size, borderRadius: 4 }}
          onError={(e) => { e.target.style.display = "none"; }} // evita erro se imagem não carregar
        />
        {showText && (
          <span style={{ marginLeft: 20, fontSize: 20, color: "#fff", fontWeight: 600 }}>
            {fmt(item.last)}
          </span>
        )}
      </div>
    </foreignObject>
  );
};


  // Converte "Banco C6" -> "banco-c6" (usado como id do gradiente)
const slug = (name) => name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");

// Paleta de gradientes por marca (ordem = da esquerda p/ direita na barra)
const BRAND_GRADIENTS = {
  Google: ["#4285F4", "#34A853", "#FBBC05", "#EA4335"],
  Amazon: ["#FF9900", "#232F3E"],
  Americanas: ["#FF0000", "#CC0000"],
  Bradesco: ["#CC092F", "#7A001F"],
  "Banco C6": ["#000000", "#666666"],
  "Banco Caixa": ["#005CA9", "#00A1E0"],
  "Banco Central": ["#1A4175", "#0F2A4D"],
  Inter: ["#FF7A00", "#FF5400"],
  Itaú: ["#FF7F32", "#002D72"],
  "Mercado Pago": ["#00B1EA", "#0077B5"],
  PayPal: ["#003087", "#009CDE"],
  Sicoob: ["#0D734B", "#00A77E"],
  Deezer: ["#FF0000", "#00D3FF"],
  Discord: ["#5865F2", "#404EED"],
  Dota2: ["#B71C1C", "#7F0000"],
  Shopee: ["#702d20ff", "#D73211"],
  "Epic Games": ["#2A2A2A", "#000000"],
  Facebook: ["#1877F2", "#3B5998"],
  Instagram: ["#F58529", "#DD2A7B", "#8134AF", "#515BD4"],
  Twitter: ["#000000", "#1A1A1A"], // X
  LinkedIn: ["#0A66C2", "#004182"],
  MercadoLivre: ["#FFE600", "#00A650"],
  Nubank: ["#820AD1", "#4B067A"],
  OLX: ["#6A1B9A", "#FF9900"],
  Outlook: ["#0078D4", "#005A9E"],
  Pinterest: ["#E60023", "#AD081B"],
  Playstation: ["#003791", "#0D57BF"],
  Santander: ["#EC0000", "#B30000"],
  Skype: ["#00AFF0", "#0078D7"],
  Snapchat: ["#FFFC00", "#F7D900"],
  SoundCloud: ["#FF5500", "#FF2E00"],
  Spotify: ["#1DB954", "#1ED760"],
  Steam: ["#171A21", "#0B0D12"],
  Telegram: ["#2AABEE", "#229ED9"],
  TikTok: ["#69C9D0", "#EE1D52"],
  Tinder: ["#8b2e52ff", "#FF655B"],
  Tumblr: ["#001935", "#36465D"],
  Twitch: ["#9146FF", "#772CE8"],
  UOL: ["#FFCC00", "#FF9900"],
  Valorant: ["#FF4655", "#0F1923"],
  Vimeo: ["#1AB7EA", "#00ADEF"],
  Waze: ["#33CCFF", "#00A0DE"],
  WhatsApp: ["#25D366", "#128C7E"],
  Wikipedia: ["#000000", "#555555"],
  Xbox: ["#0f270fff", "#054B16"],
  YouTube: ["#FF0000", "#CC0000"],
  Zoom: ["#2D8CFF", "#0B5CFF"],
};



function barFill(name) {
  if (BRAND_GRADIENTS[name]) {
    return `url(#grad-${slug(name)})`;
  }
  // fallback cinza
  return "#6b7280";
}


  return (
    <div style={{ width: "95%", margin: "32px auto", padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ margin: 0, fontSize: 50, fontWeight: 800 }}>Latência</h1>
      <div style={{ fontSize: 13, color: "#374151", marginBottom: 50 }}>
        Status WS: <strong>{status}</strong> · Atualiza a cada <strong>5s</strong> após logos carregadas
      </div>

      <div style={{ height: 1500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={sorted} margin={{ top: 10, right: 20, bottom: 10, left: 90 }}>
        <defs>
  {Object.entries(BRAND_GRADIENTS).map(([name, stops]) => {
    const id = `grad-${slug(name)}`;
    return (
      <linearGradient key={id} id={id} x1="0" y1="0" x2="1" y2="0">
        {stops.map((color, i) => (
          <stop
            key={`${id}-stop-${i}`}
            offset={`${stops.length === 1 ? 100 : Math.round((i / (stops.length - 1)) * 100)}%`}
            stopColor={color}
          />
        ))}
      </linearGradient>
    );
  })}
</defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" hide domain={[0, "auto"]} />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip formatter={(v) => fmt(v)} />
            <Bar
              dataKey="last"
              barSize={54}
              label={renderCustomLabel}
              isAnimationActive
              animationDuration={1000}
              animationEasing="ease-in-out"
            >
              {sorted.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barFill(entry.name)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
