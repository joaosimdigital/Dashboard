// Frontend React – Horizontal BarChart com logos dentro das barras + animação suave + gradientes por marca
// Dependências: npm i recharts

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";



export default function LatenciaUrl() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("desconectado");
  const [endpoint, setEndpoint] = useState("ws://172.17.1.2:8000");
  const wsRef = useRef(null);
  const [logosLoaded, setLogosLoaded] = useState(false);

  const latestRowsRef = useRef([]);
  const latestTsRef = useRef(0);
  const committedTsRef = useRef(0);


  // helper para favicon estável
const FAV = (domain) => `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

const LOGOS = {
  Google: FAV("google.com"),
  Amazon: FAV("amazon.com"),
  Americanas: FAV("americanas.com.br"),
  Bradesco: FAV("bradesco.com.br"),
  "Banco C6": FAV("c6bank.com.br"),
  "Banco Caixa": FAV("caixa.gov.br"),
  "Banco Central": FAV("bcb.gov.br"),
  Inter: FAV("bancointer.com.br"),
  Itaú: FAV("itau.com.br"),
  "Mercado Pago": FAV("mercadopago.com.br"),
  PayPal: FAV("paypal.com"),
  Sicoob: FAV("sicoob.com.br"),
  Deezer: FAV("deezer.com"),
  Discord: FAV("discord.com"),
  Dota2: FAV("dota2.com"),
  Shopee: FAV("shopee.com.br"),
  "Epic Games": FAV("epicgames.com"),
  Facebook: FAV("facebook.com"),
  Instagram: FAV("instagram.com"),     // ← corrigido
  Twitter: FAV("x.com"),
  LinkedIn: FAV("linkedin.com"),
  MercadoLivre: FAV("mercadolivre.com.br"),
  Nubank: FAV("nubank.com.br"),
  OLX: FAV("olx.com.br"),
  Outlook: FAV("outlook.office.com"),
  Pinterest: FAV("pinterest.com"),
  Playstation: FAV("playstation.com"),
  Santander: FAV("santander.com.br"),
  Skype: FAV("skype.com"),
  Snapchat: FAV("snapchat.com"),
  SoundCloud: FAV("soundcloud.com"),
  Spotify: FAV("spotify.com"),
  Steam: FAV("steampowered.com"),
  Telegram: FAV("telegram.org"),
  TikTok: FAV("tiktok.com"),
  Tinder: FAV("tinder.com"),
  Tumblr: FAV("tumblr.com"),
  Twitch: FAV("twitch.tv"),
  UOL: FAV("uol.com.br"),
  Valorant: FAV("playvalorant.com"),
  Vimeo: FAV("vimeo.com"),
  Waze: FAV("waze.com"),
  WhatsApp: FAV("whatsapp.com"),
  Wikipedia: FAV("wikipedia.org"),
  Xbox: FAV("xbox.com"),
  YouTube: FAV("youtube.com"),
  Zoom: FAV("zoom.us"),
};


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
  onError={(e) => { e.currentTarget.src = FAV("example.com"); }}
  style={{ width: size, height: size, borderRadius: 4 }}
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
    <div style={{ width: "100%", margin: "32px auto", padding: 16, fontFamily: "system-ui, sans-serif", backgroundColor: '#373535', marginTop: 0 }}>
      <h1 style={{ margin: 0, fontSize: 50, fontWeight: 800 }}>Latência</h1>
      <div style={{ fontSize: 13, color: "white", marginBottom: 50 }}>
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

            <CartesianGrid strokeDasharray="3 3"  vertical={false}  horizontal={false}/>
            <XAxis type="number" hide domain={[0, "auto"]} />
<YAxis 
  dataKey="name" 
  type="category" 
  width={120} 
  tick={{ fill: "white", fontSize: 14, fontWeight: 600 }} 
  axisLine={false} 
/>

           <Tooltip 
  formatter={(v) => fmt(v)} 
  contentStyle={{ backgroundColor: "#222", color: "white", borderRadius: 8 }}
/>
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
