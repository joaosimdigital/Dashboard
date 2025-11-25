// src/pages/Migration.jsx
import React, { useState } from "react";
import axios from "axios";

const Migration = () => {
  const [status, setStatus] = useState("");

  const conveniaToken = "9d77f813-cb46-4ca4-bc7e-bb09e658a450";
  const conveniaTokenFerias = "62b7aa00-c46d-4934-a89e-e631c530112c";
  const conveniaTokenInativos = "b71f76bf-5dcc-420c-8e67-d2f5ab0d2ad6";
  const conveniaBaseUrl = "https://public-api.convenia.com.br/api/v3";

  // 🔹 Token e URL da Sólides (Tangerino)
  const solidesBaseUrl = "https://api.tangerino.com.br/v1"; // confirme a base no doc
  const solidesAuthHeader =
    "Basic ZTNhYzljMGIzMjQ2NGQ4MGIxZDIxYWY5ZDljNjE0OWY6NTBkMjcyZDU1ZmRkNDVkM2I2NTYxZmQ5ZmNmMGQ3ZjY=";

  // =========================
  // 🔹 Buscar colaboradores da Convenia
  // =========================
  const getEmployees = async () => {
    try {
      setStatus("Buscando colaboradores na Convenia...");

      const response = await axios.get(`${conveniaBaseUrl}/employees`, {
        headers: { token: conveniaToken },
        params: { paginate: 1000 },
      });

      const employees = response.data.data;

      console.log("Colaboradores retornados:", employees.length);

      setStatus("Busca de colaboradores concluída ✅ Verifique o console");
    } catch (err) {
      console.error("Erro ao buscar colaboradores:", err);
      setStatus("Erro ao buscar colaboradores ❌");
    }
  };

  // Colaboradores inativos

  const getEmployeesDismiss = async () => {
    try {
      setStatus("Buscando colaboradores na Convenia...");

      const response = await axios.get(
        `${conveniaBaseUrl}/employees/dismissed`,
        {
          headers: { token: conveniaTokenInativos },
          params: { paginate: 1000 },
        }
      );

      const employeesDismiss = response.data.data;

      console.log("Colaboradores retornados:", employeesDismiss.length);

      setStatus("Busca de colaboradores concluída ✅ Verifique o console");
    } catch (err) {
      console.error("Erro ao buscar colaboradores:", err);
      setStatus("Erro ao buscar colaboradores ❌");
    }
  };

  // =========================
  // 🔹 Buscar times da Convenia
  // =========================
  const getTeams = async () => {
    try {
      setStatus("Buscando times na Convenia...");

      const response = await axios.get(`${conveniaBaseUrl}/companies/teams`, {
        headers: { token: conveniaToken },
        params: { paginate: 1000 },
      });

      const teams = response.data.data;

      console.log("Times retornados:", teams.length);
      console.log("Dados dos times:", teams);

      setStatus("Busca de times concluída ✅ Verifique o console");
    } catch (err) {
      console.error("Erro ao buscar times:", err);
      setStatus("Erro ao buscar times ❌");
    }
  };

  // =========================
  // 🔹 Buscar solicitações de férias e migrar para Sólides
  // =========================
  const getVacationRequests = async (employeeId, employeeName) => {
    try {
      setStatus(
        `Buscando solicitações de férias do colaborador ${employeeId}...`
      );

      const response = await axios.get(
        `${conveniaBaseUrl}/employees/${employeeId}/vacations/solicitations`,
        {
          headers: { token: conveniaTokenFerias },
          params: { paginate: 100 },
        }
      );

      const vacationRequests = response.data.data;

      if (!vacationRequests || vacationRequests.length === 0) {
        console.log(
          `Nenhuma solicitação de férias encontrada para o colaborador ${employeeId}.`
        );
        setStatus("Nenhuma solicitação encontrada ❌");
        return;
      }

      // 🔹 Formatar e enviar para Sólides
      const formattedRequests = vacationRequests.map((request, index) => ({
        adjustmentReasonDTO: {
          id: index + 1, // contador incremental
          description: "FÉRIAS",
        },
        employeeDTO: {
          id: employeeId,
          name: employeeName || request.employee_name || "N/A",
        },
        startDate: new Date(request.start_date).getTime(),
        endDate: new Date(request.end_date).getTime(),
        fullDay: true,
        origem: "Integração",
        status: request.status ? request.status.toUpperCase() : "INDEFINIDO",
      }));

      console.log(
        `Solicitações de férias formatadas de ${employeeId}:`,
        formattedRequests
      );

      // 🔹 POST para Sólides
      for (const vacation of formattedRequests) {
        try {
          const postResponse = await axios.post(
            `${solidesBaseUrl}/adjustment/register`, // confirme o endpoint exato na doc
            vacation,
            {
              headers: {
                Authorization: solidesAuthHeader,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(
            `✅ Férias enviadas para Sólides (Colaborador ${employeeId}):`,
            postResponse.data
          );
        } catch (postErr) {
          console.error(
            `❌ Erro ao enviar férias para Sólides (Colaborador ${employeeId}):`,
            postErr.response?.data || postErr.message
          );
        }
      }

      setStatus("Migração de férias concluída ✅");
    } catch (err) {
      console.error("Erro ao buscar solicitações de férias:", err);
      setStatus("Erro ao buscar ou migrar solicitações de férias ❌");
    }
  };

  const migrateDismissedEmployees = async () => {
    try {
      setStatus("Buscando colaboradores inativos...");

      const response = await axios.get(
        `${conveniaBaseUrl}/employees/dismissed`,
        {
          headers: { token: conveniaTokenInativos },
          params: { paginate: 1000 },
        }
      );

      const employeesDismissed = response.data.data;

      if (!employeesDismissed || employeesDismissed.length === 0) {
        setStatus("Nenhum colaborador inativo encontrado ❌");
        return;
      }

      // 🔹 Formatar para o padrão da Sólides
      const formattedEmployees = employeesDismissed.map((emp) => ({
        name: "Desligado",
        email:
          emp.email || "", // fallback
        birthDateInMillis: emp.birth_date
          ? new Date(emp.birth_date).getTime()
          : null,
        phone: emp.cell_phone || emp.phone || "",
        cpf: "00000000000",
        ctps: emp.ctps_number || "",
        series: emp.ctps_series || "",
        pis: emp.pis_number || "",
        admissionDate: emp.admission_date
          ? new Date(emp.admission_date).getTime()
          : null,
        effectiveDate: emp.admission_date
          ? new Date(emp.admission_date).getTime()
          : null,
        workSchedule: 1, // ⚠️ ID de escala existente na Sólides
        workplace: 1, // ⚠️ ID de local de trabalho existente na Sólides
        timeZone: "SAO_PAULO",
      }));

      console.log("Colaboradores inativos formatados:", formattedEmployees);

      // 🔹 Enviar para o backend (um por um)
      for (const employee of formattedEmployees) {
        try {
          const postRes = await axios.post(
            "http://localhost:5001/api/register-employee",
            employee,
            { headers: { "Content-Type": "application/json" } }
          );
          console.log(
            `✅ Colaborador cadastrado: ${employee.name}`,
            postRes.data
          );
        } catch (postErr) {
          console.error(
            `❌ Erro ao cadastrar ${employee.name}:`,
            postErr.response?.data || postErr.message
          );
        }
      }

      setStatus("Migração de colaboradores inativos concluída ✅");
    } catch (err) {
      console.error("Erro ao buscar colaboradores inativos:", err);
      setStatus("Erro na migração de colaboradores inativos ❌");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Migração Convenia → Sólides</h2>
      <p>Status: {status}</p>

      <button onClick={getEmployees} style={{ marginRight: 10 }}>
        Buscar colaboradores
      </button>

      <button onClick={migrateDismissedEmployees} style={{ marginRight: 10 }}>
        Migrar colaboradores inativos para Sólides
      </button>

      <button onClick={getEmployeesDismiss} style={{ marginRight: 10 }}>
        Buscar colaboradores inativos
      </button>

      <button onClick={getTeams} style={{ marginRight: 10 }}>
        Buscar times
      </button>

      <button
        onClick={async () => {
          const employeeId = prompt("Digite o ID do colaborador:");
          const employeeName = prompt(
            "Digite o nome do colaborador (opcional):"
          );
          if (!employeeId) return;

          setStatus("Buscando férias e iniciando migração...");

          try {
            // 1️⃣ Buscar férias da Convenia
            const response = await axios.get(
              `https://public-api.convenia.com.br/api/v3/employees/${employeeId}/vacations/solicitations`,
              {
                headers: { token: "62b7aa00-c46d-4934-a89e-e631c530112c" },
                params: { paginate: 100 },
              }
            );

            const vacationRequests = response.data.data;

            if (!vacationRequests || vacationRequests.length === 0) {
              setStatus("Nenhuma solicitação de férias encontrada ❌");
              return;
            }

            // 2️⃣ Formatar férias
            const formattedRequests = vacationRequests.map(
              (request, index) => ({
                adjustmentReasonDTO: { id: index + 1, description: "FÉRIAS" },
                employeeDTO: {
                  id: employeeId,
                  name: employeeName || request.employee_name || "N/A",
                },
                startDate: new Date(request.start_date).getTime(),
                endDate: new Date(request.end_date).getTime(),
                fullDay: true,
                origem: "Integração",
                status: request.status
                  ? request.status.toUpperCase()
                  : "INDEFINIDO",
              })
            );

            console.log("Férias formatadas:", formattedRequests);

            // 3️⃣ Enviar array completo para o backend
            const res = await axios.post(
              "http://localhost:5001/api/migrate-with-body",
              formattedRequests,
              { headers: { "Content-Type": "application/json" } }
            );

            console.log(res.data);
            setStatus("Migração concluída ✅ Verifique o console");
          } catch (err) {
            console.error(err);
            setStatus("Erro na migração ❌");
          }
        }}
      >
        Migrar férias de colaborador
      </button>
    </div>
  );
};

export default Migration;
