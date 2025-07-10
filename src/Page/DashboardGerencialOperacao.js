import React, { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import "../CSS/DashboardGerencialOperacao.css";
import imgLogo from "../Images/logo-sim.png";
import imgFiltro from "../Images/filtro.png";
import imgSmileSim from "../Images/sim-smille.png";

function DashboardGerencialOperacao() {
  const [showFilter, setShowFilter] = useState(false);
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const filterRef = useRef();
  const gradients = ["url(#gradOrange)", "url(#gradBlack)", "url(#gradRed)"];
  const gradientIdPF = "colorPF";
  const gradientIdPJ = "colorPJ";

  const tipoOSOptions = [
    "Sem acesso (sem sinal GPON)",
    "Instalação GPON",
    "Recolhimento de equipamento",
    "Instalação GPON (prédio adaptado)",
    "Apoio técnico ordem de serviço",
    "Manutenção cliente",
    "Troca de endereço",
    "Desistência instalação",
    "Sem acesso (com sinal GPON)",
    "Troca de equipamento",
  ];

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const tipoPessoaData = [
    { name: "Pessoa Física", value: 805, fill: "#f47621" },
    { name: "Pessoa Jurídica", value: 922, fill: "#212121" },
  ];

  const trimestreData = [
    { name: "Mar 2025", value: 805 },
    { name: "Abr 2025", value: 962 },
    { name: "Mai 2025", value: 404 },
  ];

  const cidadeData = [
    { name: "Florianópolis", value: 238, color: "#212121" },
    { name: "Caxias do Sul", value: 189, color: "#f97316" },
    { name: "São José", value: 98, color: "#facc15" },
    { name: "Palhoça", value: 32, color: "#dc2626" },
  ];

  const totalCidade = cidadeData.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        !event.target.closest(".operacao-filter-button")
      ) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = tipoOSOptions.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="operacao-wrapper">
      <img src={imgSmileSim} alt="Smile Top Left" className="smile-top-left" />
      <div className="operacao-header">
        <div className="operacao-header-left">
          <h2>Dashboard Gerencial da Operação</h2>

          {/* Botão Add Filtro abaixo do título */}
          <div
            className="style-div"
            style={{ position: "relative", marginTop: "4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <button
              className="operacao-filter-button"
              onClick={() => {
                setShowFilter((prev) => !prev);
                setActiveSubFilter(null);
              }}
            >
              <img src={imgFiltro} className="img-filtro" />
              Add filtro
            </button>

             {selectedItems.length > 0 && (
    <div className="filtro-tag">
      Tipo de OS
      <button
        className="filtro-tag-close"
        onClick={() => setSelectedItems([])}
      >
        ×
      </button>
      <span className="filtro-tag-count">{selectedItems.length}</span>
    </div>
  )}

            {showFilter && (
              <div className="operacao-filter-dropdown" ref={filterRef}>
                {!activeSubFilter && (
                  <>
                    <h4>Filtrar por</h4>
                    <ul>
                      <li onClick={() => setActiveSubFilter("tipoOS")}>
    <span>Tipo de OS ➔</span>
    {selectedItems.length > 0 && (
      <span className="filtro-badge">{selectedItems.length} ×</span>
    )}
  </li>
                      <li>Usuário fechamento ➔</li>
                      <li>OS por localização ➔</li>
                      <li>Tipo de pessoa ➔</li>
                      <li>Média de produção ➔</li>
                      <li>Motivo fechamento ➔</li>
                    </ul>
                    <button
                      className="operacao-apply-filter-button"
                      onClick={() => setShowFilter(false)}
                    >
                      Aplicar filtros
                    </button>
                  </>
                )}

                {activeSubFilter === "tipoOS" && (
                  <div className="operacao-subfilter">
                    <h4>Tipo de OS</h4>
                    <input
                      type="text"
                      placeholder="🔍 Buscar"
                      className="operacao-subfilter-search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="operacao-subfilter-list">
                      {filteredOptions.map((item, idx) => (
                        <label key={idx} className="operacao-subfilter-item">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item)}
                            onChange={() => toggleItem(item)}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <button
                      className="operacao-apply-filter-button"
                      onClick={() => {
                        setActiveSubFilter(null);
                        setShowFilter(false);
                      }}
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Logo à direita */}
        <img
          src={imgLogo}
          alt="Logo Empresa"
          className="operacao-logo"
        />

        {/* LINHA DIVISÓRIA */}
        <div className="operacao-divider"></div>
      </div>

      <section className="operacao-section">
        <h3>Visão geral</h3>
        <div className="operacao-card-container">
          <div className="operacao-summary-cards">
            {/* Tipo de pessoa */}
            <div className="operacao-card-nobottom">
              <h4>Tipo de pessoa</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={tipoPessoaData}
                  barCategoryGap={20}
                  margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient
                      id={gradientIdPF}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f47621" />
                      <stop offset="100%" stopColor="#e15000" />
                    </linearGradient>
                    <linearGradient
                      id={gradientIdPJ}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#333333" />
                      <stop offset="100%" stopColor="#000000" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 250, 500, 750, 1000]}
                  />
                  <Tooltip
                    formatter={(value) => [value, "Total"]}
                    cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  />
                  <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={70}>
                    {tipoPessoaData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#${
                          index === 0 ? gradientIdPF : gradientIdPJ
                        })`}
                      />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="top"
                      style={{ fill: "#212121", fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Total de Ordens de Serviços */}
            <div className="operacao-card operacao-big-number-card">
              <h4>Total de Ordens de Serviços</h4>
              <div className="operacao-big-number">10.478</div>
            </div>

            {/* Último trimestre */}
            <div className="operacao-card-nobottom">
              <h4>Último trimestre</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={trimestreData}
                  barCategoryGap={2}
                  margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f47621" />
                      <stop offset="100%" stopColor="#e15000" />
                    </linearGradient>
                    <linearGradient id="gradBlack" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#333333" />
                      <stop offset="100%" stopColor="#000000" />
                    </linearGradient>
                    <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>
                      `${(value).toFixed(1)} mil`
                    }
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [value, "Total"]}
                    cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={70}>
                    {trimestreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={gradients[index]} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="top"
                      style={{ fill: "#212121", fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="operacao-section">
        <h3>Instalações</h3>
        <div className="operacao-card-container">
        <div className="operacao-summary-cards">
          <div className="operacao-card-nobottom">
            <h4>Instalações por estado</h4>
            <div className="operacao-state-installations">
              <div>
                <strong>SC</strong>
                <p>438</p>
              </div>
              <div>
                <strong>RS</strong>
                <p>269</p>
              </div>
            </div>
          </div>

          <div className="operacao-card operacao-big-number-card">
            <h4>Total de Instalações</h4>
            <div className="operacao-big-number">1.491</div>
          </div>

          <div className="operacao-card-nobottom operacao-big-number-card">
            <h4>% atingido da Meta</h4>
            <div className="operacao-big-number">48%</div>
          </div>
        </div>
        </div>
      </section>

      <section className="operacao-section">
        <h3>Manutenções</h3>
         <div className="operacao-card-container">
        <div className="operacao-summary-cards">
          <div className="operacao-card-nobottom">
            <h4>Manutenções por estado</h4>
            <div className="operacao-state-installations">
              <div>
                <strong>SC</strong>
                <p>350</p>
              </div>
              <div>
                <strong>RS</strong>
                <p>310</p>
              </div>
            </div>
          </div>

          <div className="operacao-card operacao-big-number-card">
            <h4>Total de Manutenções</h4>
            <div className="operacao-big-number">660</div>
          </div>

          <div className="operacao-card-nobottom operacao-big-number-card">
            <h4>% atingido da Meta</h4>
            <div className="operacao-big-number">36%</div>
          </div>
        </div>
        </div>
      </section>

      <section className="operacao-section operacao-table-section">
        <div className="operacao-table-card">
          <div className="operacao-table-wrapper">
            <table className="operacao-table">
              <thead>
              <tr>
                <th>Tipos de OS</th>
                <th></th>
                <th>Qtd.</th>
              </tr>
            </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>SEM ACESSO (SEM SINAL GPON)</td>
                  <td>
                    <strong>1.788</strong>
                  </td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>INSTALAÇÃO GPON</td>
                  <td>
                    <strong>1.491</strong>
                  </td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>RECOLHIMENTO DE EQUIPAMENTO POR CAN...</td>
                  <td>
                    <strong>887</strong>
                  </td>
                </tr>
                <tr>
                  <td>4.</td>
                  <td>INSTALAÇÃO GPON (PRÉDIO ADAPTADO)</td>
                  <td>
                    <strong>733</strong>
                  </td>
                </tr>
                <tr>
                  <td>5.</td>
                  <td>APOIO TÉCNICO ORDEM DE SERVIÇO</td>
                  <td>
                    <strong>690</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="operacao-table-card">
          <div className="operacao-table-wrapper">
            <table className="operacao-table">
              <thead>
              <tr>
                <th>Usuário de fechamento</th>
                <th></th>
                <th>Qtd.</th>
              </tr>
            </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>(RECOLHIMENTO) LUIS ALEXANDRE</td>
                  <td>
                    <strong>491</strong>
                  </td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>(RECOLHIMENTO) JOÃO DOS SANTOS</td>
                  <td>
                    <strong>363</strong>
                  </td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>(INST.)(TAPERA) ADRIANO DA SILVA</td>
                  <td>
                    <strong>318</strong>
                  </td>
                </tr>
                <tr>
                  <td>4.</td>
                  <td>(INST.)(SUL) RAFAEL DE SOUZA</td>
                  <td>
                    <strong>313</strong>
                  </td>
                </tr>
                <tr>
                  <td>5.</td>
                  <td>(MANUTENÇÃO/INST.)(INGLESES) MICHEL PAIVA</td>
                  <td>
                    <strong>306</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="operacao-section operacao-extra-section">
        {/* OS por cidade */}
        <div className="operacao-card-nobottom operacao-chart-donut">
          <h4>OS por cidade</h4>
          <div className="donut-chart-container">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={cidadeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {cidadeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="donut-legend">
              {cidadeData.map((entry, index) => {
                const percent = ((entry.value / totalCidade) * 100).toFixed(1);
                return (
                  <li key={index}>
                    <span
                      className="legend-dot"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    {entry.name} <strong>{entry.value}</strong> {percent}%
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* OS por bairro */}
        <div className="operacao-card-nobottom operacao-table-card">
          <div className="operacao-table-card-header">
            <h4>OS por bairro</h4>
            <span>Total</span>
          </div>
          <div className="operacao-table-wrapper">
            <table className="operacao-table">
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>INGLESES DO RIO VERMELHO</td>
                  <td>
                    <strong>48</strong>
                  </td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>SÃO JOÃO DO RIO VERMELHO</td>
                  <td>
                    <strong>43</strong>
                  </td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>CACHOEIRA DO BOM JESUS</td>
                  <td>
                    <strong>38</strong>
                  </td>
                </tr>
                <tr>
                  <td>4.</td>
                  <td>CANASVIEIRAS</td>
                  <td>
                    <strong>33</strong>
                  </td>
                </tr>
                <tr>
                  <td>5.</td>
                  <td>JURERÊ</td>
                  <td>
                    <strong>26</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="operacao-section operacao-extra-section">
        <div className="operacao-card-nobottom operacao-table-card">
          <table className="operacao-table">
            <thead>
              <tr>
                <th></th>
                <th>Qtd. média de produção</th>
                <th>Dias úteis</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>JOÃO SILVA DOS SANTOS</td>
                <td>34</td>
                <td>
                  <strong>87</strong>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>JOSÉ DE SOUZA SILVA</td>
                <td>32</td>
                <td>
                  <strong>83</strong>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>MARIANA SANTOS MEDEIROS</td>
                <td>28</td>
                <td>
                  <strong>78</strong>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>JORGE ARAGÃO DE OLIVEIRA</td>
                <td>21</td>
                <td>
                  <strong>77</strong>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>MARIA BRAGA DE JESUS</td>
                <td>19</td>
                <td>
                  <strong>69</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="operacao-card-nobottom operacao-table-card">
          <h4>Motivos de fechamento</h4>
          <table className="operacao-table">
            <thead>
              <tr>
                <th></th>
                <th>Motivo</th>
                <th>Qtd.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>INSTALAÇÃO - CONCLUÍDA NO PADRÃO</td>
                <td>
                  <strong>53</strong>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>SEM ACESSO/TROCA DE DROP - CAMINHÃO...</td>
                <td>
                  <strong>17</strong>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>TROCA DE ENDEREÇO - CABO NOVO</td>
                <td>
                  <strong>15</strong>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>UPGRADE REALIZADO COM SUCESSO</td>
                <td>
                  <strong>10</strong>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>MANUTENÇÃO - REALIZADA COM SUCESSO</td>
                <td>
                  <strong>7</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="operacao-section operacao-final-section">
        <div className="operacao-card-nobottom operacao-table-card">
          <h4>Últimas Ordens de Serviço</h4>
          <table className="operacao-table large">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome/Razão Social</th>
                <th>Tipo</th>
                <th>Descrição abertura</th>
                <th>Descrição fechamento</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>ÉBER ROSSI</td>
                <td>INSTALAÇÃO GPON (PREDIO ADAPTADO)</td>
                <td>ID CLIENTE SERVIÇO: 53689 PLANO...</td>
                <td>Cliente satisfeito com a instala...</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>ANGELO FARIA LIMA</td>
                <td>INSTALAÇÃO GPON</td>
                <td>ID CLIENTE SERVIÇO: 52796 PLANO...</td>
                <td>Finalizado via API</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>ZINGA MERCADO LTDA</td>
                <td>DESISTÊNCIA INSTALAÇÃO</td>
                <td>ID CLIENTE SERVIÇO: 54052 PLANO...</td>
                <td>Inviabilidade técnica</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>JOANA SILVEIRA</td>
                <td>MANUTENÇÃO CLIENTE</td>
                <td>Cliente deseja realocar equipam...</td>
                <td>Passado um cabo novo</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>MARIANA FERREIRA</td>
                <td>APOIO TÉCNICO ORDEM DE SERVIÇO</td>
                <td>Apoio ao técnico Adriano.</td>
                <td>Atividade de apoio realizado</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DashboardGerencialOperacao;
