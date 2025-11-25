// src/pages/Migration.jsx
import React, { useState } from "react";
import axios from "axios";

const Migration = () => {
  const [status, setStatus] = useState("");

  const conveniaToken = "62422b81-26f4-4208-96d0-d7571fe28472";
  const conveniaBaseUrl = "https://public-api.convenia.com.br/api/v3";

  const migrateEmployees = async () => {
    try {
      setStatus("Buscando colaboradores na Convenia...");

      // 1. Buscar todos os colaboradores da Convenia
      const response = await axios.get(`${conveniaBaseUrl}/employees`, {
        headers: { token: conveniaToken },
        params: { paginate: 1000 },
      });

      const employees = response.data.data;
      console.log("Colaboradores retornados:", employees.length);

      // 2. Mapear os dados para o formato da Sólides
      const formattedEmployees = employees.map(emp => ({
        name: `${emp.name} ${emp.last_name}`,
        email: emp.email || "sem-email@empresa.com",
        birthDateInMillis: emp.birth_date
          ? new Date(emp.birth_date).getTime()
          : new Date("1990-01-01").getTime(),
        phone: emp.phone || "0000000000",
        cpf: emp.cpf,
        ctps: emp.ctps || "00000",
        series: emp.series || "000",
        pis: emp.pis || "00000000000",
        admissionDate: emp.hiring_date
          ? new Date(emp.hiring_date).getTime()
          : Date.now(),
        effectiveDate: emp.hiring_date
          ? new Date(emp.hiring_date).getTime()
          : Date.now(),
        workSchedule: emp.workSchedule || "FULL_TIME", // placeholder
        workplace: emp.workplace || "HEAD_OFFICE", // placeholder
        timeZone: "SAO_PAULO",
      }));

      // 3. Exibir JSON pronto no console para Postman
      console.log("JSON pronto para Sólides:\n", JSON.stringify(formattedEmployees, null, 2));

      setStatus("Formatação concluída ✅ Verifique o console para copiar o JSON");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao buscar/formatar colaboradores ❌");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Migração Convenia → Sólides</h2>
      <p>Status: {status}</p>
      <button onClick={migrateEmployees}>Gerar JSON para Postman</button>
    </div>
  );
};

export default Migration;
