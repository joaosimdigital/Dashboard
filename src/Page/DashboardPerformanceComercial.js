import React, { useState } from "react";
import "../CSS/DashboardPerformanceComercial.css";

function DashboardPerformanceComercial() {
  const [activeSection, setActiveSection] = useState("ranking-semanal");

  const vendasSemana = 434;
  const vendasMes = 586;
  const faturamentoMes = "R$ 94.200,00";

  const rankingVendas = [
    { nome: "João Silva", valor: 122 },
    { nome: "Carla Mendes", valor: 108 },
    { nome: "Rafael Torres", valor: 96 },
    { nome: "Marina Faria", valor: 88 },
    { nome: "Joana Santos", valor: 79 },
  ];

  const rankingFaturamento = [
    { nome: "João Silva", valor: "R$ 21.300,00" },
    { nome: "Carla Mendes", valor: "R$ 19.400,00" },
    { nome: "Rafael Torres", valor: "R$ 17.800,00" },
    { nome: "Marina Faria", valor: "R$ 16.100,00" },
    { nome: "Joana Santos", valor: "R$ 14.800,00" },
  ];

  const rankingFaturamentoMensal = [
    { nome: "Márcio Jr", valor: "R$ 27.380,10" },
    { nome: "Ruan de Jesus", valor: "R$ 18.111,00" },
    { nome: "Wellington Pereira", valor: "R$ 17.458,48" },
    { nome: "Marina Faria", valor: "R$ 16.160,00" },
    { nome: "Joana Santos", valor: "R$ 14.870,87" },
  ];

  const rankingVendasMensal = [
    { nome: "Rua de Jesus", valor: 132 },
    { nome: "Marcio Jd", valor: 118 },
    { nome: "Wellington Pereira", valor: 98 },
    { nome: "Marina Faria", valor: 88 },
    { nome: "Joana Santos", valor: 79 },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard Comercial <span className="b2c">B2C</span></h2>
        <nav>
          <button
            className={activeSection === "ranking-semanal" ? "active" : ""}
            onClick={() => setActiveSection("ranking-semanal")}
          >
            Ranking Semanal
          </button>
          <button
            className={activeSection === "ranking-mensal" ? "active" : ""}
            onClick={() => setActiveSection("ranking-mensal")}
          >
            Ranking Mensal
          </button>
          <button
            className={activeSection === "destaques" ? "active" : ""}
            onClick={() => setActiveSection("destaques")}
          >
            Destaques
          </button>
        </nav>
      </aside>

      <main className="dashboard-content">
        <section className="summary-cards">
          <div className="card">
            <p>👁 Vendas na Semana</p>
            <h2>{vendasSemana} <span className="up">+28,4%</span></h2>
          </div>
          <div className="card">
            <p>📈 Vendas no Mês</p>
            <h2>{vendasMes} <span className="down">-12,6%</span></h2>
          </div>
          <div className="card">
            <p>💰 Faturamento no Mês</p>
            <h2>{faturamentoMes} <span className="up">+3,7%</span></h2>
          </div>
        </section>

        {activeSection === "ranking-semanal" && (
          <section className="rankings">
            <div className="ranking-table">
              <h3>🏆 Ranking por Vendas (Top 5)</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vendedor</th>
                    <th>Vendas</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingVendas.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}º</td>
                      <td>{item.nome}</td>
                      <td>{item.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ranking-table">
              <h3>💵 Ranking por Faturamento (Top 5)</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vendedor</th>
                    <th>Faturamento</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingFaturamento.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}º</td>
                      <td>{item.nome}</td>
                      <td>{item.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === "ranking-mensal" && (
          <section className="rankings">
            <div className="ranking-table">
              <h3>🏆 Ranking por Vendas (Top 5)</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vendedor</th>
                    <th>Vendas</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingVendasMensal.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}º</td>
                      <td>{item.nome}</td>
                      <td>{item.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ranking-table">
              <h3>💵 Ranking por Faturamento (Top 5)</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vendedor</th>
                    <th>Faturamento</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingFaturamentoMensal.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}º</td>
                      <td>{item.nome}</td>
                      <td>{item.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === "destaques" && (
            <section className="highlights">
                <div className="highlight-group">
                <h3>Destaques Vendas</h3>
                <div className="highlight-row">
                    <div className="highlight-card">
                    <span className="position">1º</span>
                    <img src="joao.jpg" alt="João Silva" className="profile-img red" />
                    <div className="info">
                        <div className="name">João Silva</div>
                        <div className="tag">Semanal</div>
                    </div>
                    </div>
                    <div className="highlight-card">
                    <span className="position">1º</span>
                    <img src="joana.jpg" alt="Joana Santos" className="profile-img red" />
                    <div className="info">
                        <div className="name">Joana Santos</div>
                        <div className="tag">Mensal</div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="highlight-group">
                <h3>Destaques Faturamento</h3>
                <div className="highlight-row">
                    <div className="highlight-card">
                    <span className="position">1º</span>
                    <img src="carla.jpg" alt="Carla Mendes" className="profile-img red" />
                    <div className="info">
                        <div className="name">Carla Mendes</div>
                        <div className="tag">Semanal</div>
                    </div>
                    </div>
                    <div className="highlight-card">
                    <span className="position">1º</span>
                    <img src="rafael.jpg" alt="Rafael Torres" className="profile-img red" />
                    <div className="info">
                        <div className="name">Rafael Torres</div>
                        <div className="tag">Mensal</div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            )}


        {/* Conteúdo para as outras abas pode ser adicionado futuramente aqui */}
      </main>
    </div>
  );
}

export default DashboardPerformanceComercial;
