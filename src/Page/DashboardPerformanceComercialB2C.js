import React, { useState, useEffect } from "react";
import "../CSS/DashboardPerformanceComercialB2C.css";
import "../CSS/Dashboard.css";
import imgCoin from "../Images/coin.png";
import imgSales from "../Images/sales.png";
import imgEyes from "../Images/eyes.png";
import imgPerson from "../Images/person.png";
import imgTrophy from "../Images/trophy.png";
import imgPurpleSales from "../Images/purple-sales.png";
import imgSmileSim from "../Images/sim-smille.png";

function DashboardPerformanceComercialB2C() {
  const [activeSection, setActiveSection] = useState("ranking-semanal");
  const [activeBusiness, setActiveBusiness] = useState("B2C");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [topVendedores, setTopVendedores] = useState([]);
  const [topVendedoresSemana, setTopVendedoresSemana] = useState([]);
  const [vendasSemana, setVendasSemana] = useState(0);
  const [vendasMes, setVendasMes] = useState(0);
  const [faturamentoMes, setFaturamentoMes] = useState("R$ 0,00");
  const [totalSemanaAtual, setTotalSemanaAtual] = useState(0);
  const [totalSemanaAnterior, setTotalSemanaAnterior] = useState(0);
  const [faturamentoSemanaAtual, setFaturamentoSemanaAtual] = useState(0);
  const [faturamentoSemanaAnterior, setFaturamentoSemanaAnterior] = useState(0);

  const [totalMesAtual, setTotalMesAtual] = useState(0);
  const [totalMesAnterior, setTotalMesAnterior] = useState(0);
  const [faturamentoMesAtual, setFaturamentoMesAtual] = useState(0);
  const [faturamentoMesAnterior, setFaturamentoMesAnterior] = useState(0);

  const sections = ["ranking-semanal", "ranking-mensal", "destaques"];

  const parseCurrency = (valor) => {
    if (!valor) return 0;
    return parseFloat(valor.replace(/[R$\s.]/g, "").replace(",", "."));
  };

  const calcularPercentual = (atual, anterior) => {
    if (anterior === 0) {
      return atual === 0 ? 0 : 100;
    }
    const resultado = ((atual - anterior) / anterior) * 100;
    return resultado.toFixed(1).replace(".", ",");
  };

  const getImageByVendedor = (nome) => {
    const nomeFormatado = nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
    try {
      return require(`../Fotos/${nomeFormatado}.jpg`);
    } catch (error) {
      return null;
    }
  };

  // Filtra vendedores que não devem aparecer no ranking
  const filtrarVendedoresIndesejados = (vendedores) => {
    const nomesBloqueados = ["bruna b2b", "anderson b2b"];
    return vendedores.filter(
      (vendedor) =>
        !nomesBloqueados.includes(vendedor.vendedor.toLowerCase().trim())
    );
  };

  const fetchTopVendedores = async () => {
    try {
      const url = `http://38.224.145.3:3002/top-vendedores-mensais-b2c`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setTopVendedores(data.vendedores_top_mes);
        setTotalMesAtual(data.totais?.atual?.vendas_pf || 0);
        setTotalMesAnterior(data.totais?.anterior?.vendas_pf || 0);

        setFaturamentoMesAtual(parseCurrency(data.totais?.atual?.faturamento_pf));
        setFaturamentoMesAnterior(
          parseCurrency(data.totais?.anterior?.faturamento_pf)
        );

        const totalVendasMes = data.vendedores_top_mes.reduce(
          (total, vendedor) => total + vendedor.total_vendas,
          0
        );
        setVendasMes(totalVendasMes);

        const totalFaturamento = data.vendedores_top_mes.reduce(
          (total, vendedor) => {
            const valorNumerico = parseFloat(
              vendedor.total_valor.replace(/[^\d,]/g, "").replace(",", ".")
            );
            return total + (isNaN(valorNumerico) ? 0 : valorNumerico);
          },
          0
        );
        setFaturamentoMes(
          totalFaturamento.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        );
      } else {
        console.error("Erro na requisição mensal:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar vendedores mensais:", error);
    }
  };

  // Chamada automática ao montar o componente
  useEffect(() => {
    fetchTopVendedores();
  }, []);

  const fetchTopVendedoresSemana = async () => {
    try {
      const url = `http://38.224.145.3:3002/top-vendedores-semanais-b2c`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setTopVendedoresSemana(data.vendedores_top_semana);
        setTotalSemanaAtual(data.totais?.atual?.vendas_pf || 0);
        setTotalSemanaAnterior(data.totais?.anterior?.vendas_pf || 0);

        setFaturamentoSemanaAtual(
          parseCurrency(data.totais?.atual?.faturamento_pf)
        );
        setFaturamentoSemanaAnterior(
          parseCurrency(data.totais?.anterior?.faturamento_pf)
        );

        const totalVendasSemana = data.vendedores_top_semana.reduce(
          (total, vendedor) => total + vendedor.total_vendas,
          0
        );
        setVendasSemana(totalVendasSemana);
      } else {
        console.error("Erro na requisição semanal:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar vendedores semanais:", error);
    }
  };

  const fetchDataForSection = (section) => {
    if (section === "ranking-semanal") {
      fetchTopVendedoresSemana();
    } else if (section === "ranking-mensal") {
      fetchTopVendedores();
    } else if (section === "destaques") {
      fetchTopVendedoresSemana();
      fetchTopVendedores();
    }
  };

  useEffect(() => {
    // Buscar os dados da seção inicial
    fetchDataForSection(activeSection);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prevSection) => {
        const currentIndex = sections.indexOf(prevSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        const nextSection = sections[nextIndex];

        fetchDataForSection(nextSection); // Busca dados ao trocar
        return nextSection;
      });
    }, 30000); // Troca a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div class="body-principal-b2c">
    <div className="dashboard-wrapper">
      <img src={imgSmileSim} alt="Smile Top Left" className="smile-top-left" />
      <img
        src={imgSmileSim}
        alt="Smile Bottom Right"
        className="smile-bottom-right"
      />
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="dashboard-header">
            <h2 onClick={() => setDropdownOpen(!dropdownOpen)}>
              Dashboard Comercial{" "}
              <span className="business-type">{activeBusiness}</span>
            </h2>
          </div>

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
              <p>
                <img src={imgEyes} alt="Vendas na Semana" className="icon" />
                Vendas na Semana
              </p>
              <h2>
                {totalSemanaAtual}{" "}
                <span
                  className={`percentage-badge ${
                    totalSemanaAtual >= totalSemanaAnterior ? "up" : "down"
                  }`}
                >
                  {calcularPercentual(totalSemanaAtual, totalSemanaAnterior)}%
                </span>
              </h2>
            </div>

            <div className="card">
              <p>
                <img src={imgSales} alt="Vendas no Mês" className="icon" />
                Vendas no Mês
              </p>
              <h2>
                {totalMesAtual}{" "}
                <span
                  className={`percentage-badge ${
                    totalMesAtual >= totalMesAnterior ? "up" : "down"
                  }`}
                >
                  {calcularPercentual(totalMesAtual, totalMesAnterior)}%
                </span>
              </h2>
            </div>

            <div className="card">
              <p>
                <img src={imgCoin} alt="Faturamento no Mês" className="icon" />
                Faturamento no Mês
              </p>
              <h2>
                {faturamentoMesAtual.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
                <span
                  className={`percentage-badge ${
                    faturamentoMesAtual >= faturamentoMesAnterior
                      ? "up"
                      : "down"
                  }`}
                >
                  {calcularPercentual(
                    faturamentoMesAtual,
                    faturamentoMesAnterior
                  )}
                  %
                </span>
              </h2>
            </div>
          </section>

          {activeSection === "ranking-semanal" && (
            <section className="rankings">
              <div className="ranking-table">
                <h3>Ranking por Vendas (Top 5)</h3>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <img
                          src={imgTrophy}
                          alt="Posição"
                          className="header-icon"
                        />
                        Posição
                      </th>
                      <th>
                        <img
                          src={imgPerson}
                          alt="Vendedor"
                          className="header-icon"
                        />
                        Vendedor
                      </th>
                      <th>
                        <img
                          src={imgPurpleSales}
                          alt="Vendas"
                          className="header-icon"
                        />
                        Vendas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topVendedoresSemana
                      .filter((item) => item.tipo_pessoa === "pf")
                      .slice(0, 5)
                      .map((item, idx) => (
                        <tr key={idx} className={`pos-${idx + 1}`}>
                          <td>
                            {idx === 0 && (
                              <span className="medal gold">🥇</span>
                            )}
                            {idx === 1 && (
                              <span className="medal silver">🥈</span>
                            )}
                            {idx === 2 && (
                              <span className="medal bronze">🥉</span>
                            )}
                            {idx > 2 && `${idx + 1}º`}
                          </td>
                          <td>{item.vendedor}</td>
                          <td>{item.total_vendas}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="ranking-table">
                <h3>Ranking por Faturamento (Top 5)</h3>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <img
                          src={imgTrophy}
                          alt="Posição"
                          className="header-icon"
                        />
                        Posição
                      </th>
                      <th>
                        <img
                          src={imgPerson}
                          alt="Vendedor"
                          className="header-icon"
                        />
                        Vendedor
                      </th>
                      <th>
                        <img
                          src={imgPurpleSales}
                          alt="Vendas"
                          className="header-icon"
                        />
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...topVendedoresSemana]
                      .filter((item) => item.tipo_pessoa === "pf")
                      .sort((a, b) => {
                        const valorA = parseFloat(
                          a.total_valor.replace(/[^\d,]/g, "").replace(",", ".")
                        );
                        const valorB = parseFloat(
                          b.total_valor.replace(/[^\d,]/g, "").replace(",", ".")
                        );
                        return valorB - valorA;
                      })
                      .slice(0, 5)
                      .map((item, idx) => (
                        <tr key={idx} className={`pos-${idx + 1}`}>
                          <td>
                            {idx === 0 && (
                              <span className="medal gold">🥇</span>
                            )}
                            {idx === 1 && (
                              <span className="medal silver">🥈</span>
                            )}
                            {idx === 2 && (
                              <span className="medal bronze">🥉</span>
                            )}
                            {idx > 2 && `${idx + 1}º`}
                          </td>
                          <td>{item.vendedor}</td>
                          <td>{item.total_valor}</td>
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
                <h3>Ranking por Vendas (Top 5)</h3>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <img
                          src={imgTrophy}
                          alt="Posição"
                          className="header-icon"
                        />
                        Posição
                      </th>
                      <th>
                        <img
                          src={imgPerson}
                          alt="Vendedor"
                          className="header-icon"
                        />
                        Vendedor
                      </th>
                      <th>
                        <img
                          src={imgPurpleSales}
                          alt="Vendas"
                          className="header-icon"
                        />
                        Vendas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topVendedores
                      .filter((item) => item.tipo_pessoa === "pf")
                      .slice(0, 5)
                      .map((item, idx) => (
                        <tr key={idx} className={`pos-${idx + 1}`}>
                          <td>
                            {idx === 0 && (
                              <span className="medal gold">🥇</span>
                            )}
                            {idx === 1 && (
                              <span className="medal silver">🥈</span>
                            )}
                            {idx === 2 && (
                              <span className="medal bronze">🥉</span>
                            )}
                            {idx > 2 && `${idx + 1}º`}
                          </td>
                          <td>{item.vendedor}</td>
                          <td>{item.total_vendas}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="ranking-table">
                <h3>Ranking por Faturamento (Top 5)</h3>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <img
                          src={imgTrophy}
                          alt="Posição"
                          className="header-icon"
                        />
                        Posição
                      </th>
                      <th>
                        <img
                          src={imgPerson}
                          alt="Vendedor"
                          className="header-icon"
                        />
                        Vendedor
                      </th>
                      <th>
                        <img
                          src={imgPurpleSales}
                          alt="Vendas"
                          className="header-icon"
                        />
                        Vendas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...topVendedores]
                      .filter((item) => item.tipo_pessoa === "pf")
                      .sort((a, b) => {
                        const valorA = parseFloat(
                          a.total_valor.replace(/[^\d,]/g, "").replace(",", ".")
                        );
                        const valorB = parseFloat(
                          b.total_valor.replace(/[^\d,]/g, "").replace(",", ".")
                        );
                        return valorB - valorA;
                      })
                      .slice(0, 5)
                      .map((item, idx) => (
                        <tr key={idx} className={`pos-${idx + 1}`}>
                          <td>
                            {idx === 0 && (
                              <span className="medal gold">🥇</span>
                            )}
                            {idx === 1 && (
                              <span className="medal silver">🥈</span>
                            )}
                            {idx === 2 && (
                              <span className="medal bronze">🥉</span>
                            )}
                            {idx > 2 && `${idx + 1}º`}
                          </td>
                          <td>{item.vendedor}</td>
                          <td>{item.total_valor}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === "destaques" && (
            <section className="highlights">
              {/* Destaques Vendas */}
              <div className="highlight-group">
                <h3>Destaques Vendas</h3>
                <div className="highlight-row">
                  {/* 1º da Semana (por vendas) */}
                  {topVendedoresSemana.filter(
                    (v) => v.tipo_pessoa === "pf"
                  )[0] && (
                    <div className="highlight-card">
                      <span className="position">1º</span>
                      <div className="profile-img red">
                        {(() => {
                          const vendedor = topVendedoresSemana.filter(
                            (v) => v.tipo_pessoa === "pf"
                          )[0];
                          const foto = getImageByVendedor(vendedor.vendedor);
                          return foto ? (
                            <img
                              src={foto}
                              alt={vendedor.vendedor}
                              className="profile-photo"
                            />
                          ) : (
                            vendedor.vendedor.charAt(0)
                          );
                        })()}
                      </div>
                      <div className="info">
                        <div className="name">
                          {
                            topVendedoresSemana.filter(
                              (v) => v.tipo_pessoa === "pf"
                            )[0].vendedor
                          }
                        </div>
                        <div className="tag">Semanal</div>
                      </div>
                    </div>
                  )}

                  {/* 1º do Mês (por vendas) */}
                  {topVendedores.filter((v) => v.tipo_pessoa === "pf")[0] &&
                    (() => {
                      const vendedor = topVendedores.filter(
                        (v) => v.tipo_pessoa === "pf"
                      )[0];
                      const foto = getImageByVendedor(vendedor.vendedor);
                      return (
                        <div className="highlight-card">
                          <span className="position">2º</span>
                          <div className="profile-img red">
                            {foto ? (
                              <img
                                src={foto}
                                alt={vendedor.vendedor}
                                className="profile-photo"
                              />
                            ) : (
                              <img
                                src={imgPerson}
                                alt="perfil"
                              />
                            )}
                          </div>
                          <div className="info">
                            <div className="name">{vendedor.vendedor}</div>
                            <div className="tag">Mensal</div>
                          </div>
                        </div>
                      );
                    })()}
                </div>
              </div>

              {/* Destaques Faturamento */}
              <div className="highlight-group">
                <h3>Destaques Faturamento</h3>
                <div className="highlight-row">
                  {/* 1º da Semana (por total_valor) */}
                  {[...topVendedoresSemana]
                    .filter((v) => v.tipo_pessoa === "pf")
                    .sort((a, b) => {
                      const valorA = parseFloat(
                        a.total_valor.replace(/[^\d,]/g, "").replace(",", ".")
                      );
                      const valorB = parseFloat(
                        b.total_valor.replace(/[^\d,]/g, "").replace(",", ".")
                      );
                      return valorB - valorA;
                    })
                    .slice(0, 1)
                    .map((vendedor, idx) => (
                      <div key={idx} className="highlight-card">
                        <span className="position">1º</span>
                        <div className="profile-img red">
                          {(() => {
                            const foto = getImageByVendedor(vendedor.vendedor);
                            return foto ? (
                              <img
                                src={foto}
                                alt={vendedor.vendedor}
                                className="profile-photo"
                              />
                            ) : (
                              <img
                                src={imgPerson}
                                alt="perfil"
                              />
                            );
                          })()}
                        </div>
                        <div className="info">
                          <div className="name">{vendedor.vendedor}</div>
                          <div className="tag">Semanal</div>
                        </div>
                      </div>
                    ))}

                  {/* 1º do Mês (por total_valor) */}
                  {[...topVendedores]
                    .filter((v) => v.tipo_pessoa === "pf")
                    .sort((a, b) => {
                      const valorA = parseFloat(
                        a.total_valor.replace(/[^\d,]/g, "").replace(",", ".")
                      );
                      const valorB = parseFloat(
                        b.total_valor.replace(/[^\d,]/g, "").replace(",", ".")
                      );
                      return valorB - valorA;
                    })
                    .slice(0, 1)
                    .map((vendedor, idx) => (
                      <div key={idx} className="highlight-card">
                        <span className="position">2º</span>
                        <div className="profile-img red">
                          {(() => {
                            const foto = getImageByVendedor(vendedor.vendedor);
                            return foto ? (
                              <img
                                src={foto}
                                alt={vendedor.vendedor}
                                className="profile-photo"
                              />
                            ) : (
                              <img
                                src={imgPerson}
                                alt="perfil"
                              />
                            );
                          })()}
                        </div>
                        <div className="info">
                          <div className="name">{vendedor.vendedor}</div>
                          <div className="tag">Mensal</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
    </div>
  );
}

export default DashboardPerformanceComercialB2C;
