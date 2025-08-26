// Frontend React – Horizontal BarChart com logos dentro das barras + animação suave + gradientes por marca
// Dependências: npm i recharts

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const LOGOS = {
  Google: "https://www.google.com/favicon.ico",
  OLX: "https://www.olx.com.br/favicon.ico",
  Instagram: "https://www.instagram.com/static/images/ico/favicon-200.png/ab6eff5951bb.png",
  Facebook: "https://www.facebook.com/favicon.ico",
};

export default function LatenciaUrl() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("desconectado");
  const [endpoint, setEndpoint] = useState("ws://localhost:8765");
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

  const renderCustomLabel = ({ x, y, width, height, index }) => {
    const item = sorted[index];
    if (!item) return null;
    const logo = LOGOS[item.name];
    const pad = 4;
    const size = Math.max(16, Math.min(height - pad * 2, 40));
    const left = x + pad;
    const top = y + (height - size) / 2;
    const showText = width > size + 40;
    return (
      <foreignObject x={left} y={top} width={Math.max(width - pad * 2, 0)} height={size}>
        <div style={{ display: "flex", alignItems: "center", height: size, transition: "opacity 0.6s ease" }}>
          <img src={logo} alt={item.name} style={{ width: size, height: size, borderRadius: 4, transition: "transform 0.4s ease" }} />
          {showText && (
            <span style={{ marginLeft: 20, fontSize: 20, color: "#fff", fontWeight: 600, transition: "opacity 0.6s ease" }}>
              {fmt(item.last)}
            </span>
          )}
        </div>
      </foreignObject>
    );
  };

  return (
    <div style={{ width: "95%", margin: "32px auto", padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ margin: 0, fontSize: 50, fontWeight: 800 }}>Latência</h1>
      <div style={{ fontSize: 13, color: "#374151", marginBottom: 50 }}>
        Status WS: <strong>{status}</strong> · Atualiza a cada <strong>5s</strong> após logos carregadas
      </div>

      <div style={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={sorted} margin={{ top: 10, right: 20, bottom: 10, left: 90 }}>
            <defs>
              {/* Gradientes oficiais aproximados */}
              <linearGradient id="gradGoogle" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="25%" stopColor="#34A853" />
                <stop offset="50%" stopColor="#FBBC05" />
                <stop offset="100%" stopColor="#EA4335" />
              </linearGradient>
              <linearGradient id="gradFacebook" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1877F2" />
                <stop offset="100%" stopColor="#3b5998" />
              </linearGradient>
              <linearGradient id="gradOLX" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff9900" />
                <stop offset="100%" stopColor="#6a1b9a" />
              </linearGradient>
              <linearGradient id="gradInstagram" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f58529" />
                <stop offset="30%" stopColor="#dd2a7b" />
                <stop offset="60%" stopColor="#8134af" />
                <stop offset="100%" stopColor="#515bd4" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" hide domain={[0, "auto"]} />
            <YAxis dataKey="name" type="category" width={80} />
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

function barFill(name) {
  switch (name) {
    case "Google":
      return "url(#gradGoogle)";
    case "Facebook":
      return "url(#gradFacebook)";
    case "OLX":
      return "url(#gradOLX)";
    case "Instagram":
      return "url(#gradInstagram)";
    default:
      return "#6b7280";
  }
}
