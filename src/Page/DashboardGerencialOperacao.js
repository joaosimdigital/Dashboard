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
  const [totalOrdensServico, setTotalOrdensServico] = useState(null);
  const [totalManutencoes, setTotalManutencoes] = useState(null);
  const [totalInstalacoes, setTotalInstalacoes] = useState(null);
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

 const [tipoPessoaData, setTipoPessoaData] = useState([
  { name: "Pessoa Física", value: 0, fill: "#f47621" },
  { name: "Pessoa Jurídica", value: 0, fill: "#212121" },
 ]);

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

  const usuariosFechamento = [
    { nome: "(RECOLHIMENTO) LUIS ALEXANDRE", qtd: 491 },
    { nome: "(RECOLHIMENTO) JOÃO DOS SANTOS", qtd: 363 },
    { nome: "(INST.)(TAPERA) ADRIANO DA SILVA", qtd: 318 },
    { nome: "(INST.)(SUL) RAFAEL DE SOUZA", qtd: 313 },
    { nome: "(MANUTENÇÃO/INST.)(INGLESES) MICHEL PAIVA", qtd: 306 },
  ];

  const tiposOS = [
    { nome: "SEM ACESSO (SEM SINAL GPON)", qtd: 1788 },
    { nome: "INSTALAÇÃO GPON", qtd: 1491 },
    { nome: "RECOLHIMENTO DE EQUIPAMENTO POR CAN...", qtd: 887 },
    { nome: "INSTALAÇÃO GPON (PRÉDIO ADAPTADO)", qtd: 733 },
    { nome: "APOIO TÉCNICO ORDEM DE SERVIÇO", qtd: 690 },
  ];

  const osPorBairro = [
    { nome: "INGLESES DO RIO VERMELHO", qtd: 48 },
    { nome: "SÃO JOÃO DO RIO VERMELHO", qtd: 43 },
    { nome: "CACHOEIRA DO BOM JESUS", qtd: 38 },
    { nome: "CANASVIEIRAS", qtd: 33 },
    { nome: "JURERÊ", qtd: 26 },
  ];

  const mediaProducao = [
    { nome: "JOÃO SILVA DOS SANTOS", diasUteis: 34, total: 87 },
    { nome: "JOSÉ DE SOUZA SILVA", diasUteis: 32, total: 83 },
    { nome: "MARIANA SANTOS MEDEIROS", diasUteis: 28, total: 78 },
    { nome: "JORGE ARAGÃO DE OLIVEIRA", diasUteis: 21, total: 77 },
    { nome: "MARIA BRAGA DE JESUS", diasUteis: 19, total: 69 },
  ];

  const motivosFechamento = [
    { motivo: "INSTALAÇÃO - CONCLUÍDA NO PADRÃO", qtd: 53 },
    { motivo: "SEM ACESSO/TROCA DE DROP - CAMINHÃO...", qtd: 17 },
    { motivo: "TROCA DE ENDEREÇO - CABO NOVO", qtd: 15 },
    { motivo: "UPGRADE REALIZADO COM SUCESSO", qtd: 10 },
    { motivo: "MANUTENÇÃO - REALIZADA COM SUCESSO", qtd: 7 },
  ];

  const ultimasOS = [
    {
      nome: "ÉBER ROSSI",
      tipo: "INSTALAÇÃO GPON (PREDIO ADAPTADO)",
      descricaoAbertura: "ID CLIENTE SERVIÇO: 53689 PLANO...",
      descricaoFechamento: "Cliente satisfeito com a instala...",
      link: "#",
    },
    {
      nome: "ANGELO FARIA LIMA",
      tipo: "INSTALAÇÃO GPON",
      descricaoAbertura: "ID CLIENTE SERVIÇO: 52796 PLANO...",
      descricaoFechamento: "Finalizado via API",
      link: "#",
    },
    {
      nome: "ZINGA MERCADO LTDA",
      tipo: "DESISTÊNCIA INSTALAÇÃO",
      descricaoAbertura: "ID CLIENTE SERVIÇO: 54052 PLANO...",
      descricaoFechamento: "Inviabilidade técnica",
      link: "#",
    },
    {
      nome: "JOANA SILVEIRA",
      tipo: "MANUTENÇÃO CLIENTE",
      descricaoAbertura: "Cliente deseja realocar equipam...",
      descricaoFechamento: "Passado um cabo novo",
      link: "#",
    },
    {
      nome: "MARIANA FERREIRA",
      tipo: "APOIO TÉCNICO ORDEM DE SERVIÇO",
      descricaoAbertura: "Apoio ao técnico Adriano.",
      descricaoFechamento: "Atividade de apoio realizado",
      link: "#",
    },
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

 useEffect(() => {
  const fetchTotais = async () => {
    try {
      const response = await fetch("http://localhost:3011/totais-os-mes-e-geral");
      const data = await response.json();

      // Atualiza Totais Gerais
      setTotalOrdensServico(data.totais_mes.total_ordens_servico_mes);
      setTotalInstalacoes(data.totais_mes.total_instalacoes_mes);
      setTotalManutencoes(data.totais_mes.total_manutencoes_mes);

      // Atualiza gráfico de Tipo de Pessoa
      const pfTotal = data.totais_por_tipo_pessoa.pf?.totais_mes.total_ordens_servico_mes || 0;
      const pjTotal = data.totais_por_tipo_pessoa.pj?.totais_mes.total_ordens_servico_mes || 0;

      setTipoPessoaData([
        { name: "Pessoa Física", value: pfTotal, fill: "#f47621" },
        { name: "Pessoa Jurídica", value: pjTotal, fill: "#212121" },
      ]);

    } catch (error) {
      console.error("Erro ao buscar dados de totais:", error);
    }
  };

  fetchTotais();
}, []);


  return (
    <div className="operacao-wrapper">
      <img src={imgSmileSim} alt="Smile Top Left" className="smile-top-left" />
      <div className="operacao-header">
        <div className="operacao-header-left">
          <h2>Dashboard Gerencial da Operação</h2>
          <div
            className="style-div"
            style={{
              position: "relative",
              marginTop: "4rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
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
                          <span className="filtro-badge">
                            {selectedItems.length} ×
                          </span>
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
        <img src={imgLogo} alt="Logo Empresa" className="operacao-logo" />

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
              <div className="operacao-big-number">
                {totalOrdensServico !== null ? totalOrdensServico.toLocaleString() : "Carregando..."}
              </div>
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
                    tickFormatter={(value) => `${value.toFixed(1)} mil`}
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
              <div className="operacao-big-number">
                {totalInstalacoes !== null ? totalInstalacoes.toLocaleString() : "Carregando..."}
              </div>
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
              <div className="operacao-big-number">
                {totalManutencoes !== null ? totalManutencoes.toLocaleString() : "Carregando..."}
              </div>
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
                <tr className="tr-space-between">
                  <th>Tipos de OS</th>
                  <th>Qtd.</th>
                </tr>
              </thead>
              <tbody>
                {tiposOS.map((tipo, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}. {tipo.nome}
                    </td>
                    <td>
                      <strong>{tipo.qtd.toLocaleString("pt-BR")}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="operacao-table-card">
          <div className="operacao-table-wrapper">
            <table className="operacao-table">
              <thead>
                <tr className="tr-space-between">
                  <th>Usuário de fechamento</th>
                  <th>Qtd.</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFechamento.map((usuario, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}. {usuario.nome}
                    </td>
                    <td>
                      <strong>{usuario.qtd.toLocaleString("pt-BR")}</strong>
                    </td>
                  </tr>
                ))}
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
            <ResponsiveContainer width={250} height={180}>
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
          <div className="operacao-table-wrapper">
            <table className="operacao-table">
              <thead>
                <tr className="tr-space-between">
                  <th>OS por bairro</th>
                  <th></th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {osPorBairro.map((bairro, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}. {bairro.nome}
                    </td>
                    <td>
                      <strong>{bairro.qtd}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="operacao-section operacao-extra-section">
        <div className="operacao-card-nobottom operacao-table-card">
          <table className="operacao-table">
            <thead>
              <tr className="tr-space-between">
                <th>Qtd. média de produção</th>
                <th>Dias úteis</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {mediaProducao.map((item, index) => (
                <tr key={index}>
                  <td>
                    {index + 1}. {item.nome}
                  </td>
                  <td>{item.diasUteis}</td>
                  <td>
                    <strong>{item.total}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="operacao-card-nobottom operacao-table-card">
          <table className="operacao-table">
            <thead>
              <tr className="tr-space-between">
                <th>Motivos de fechamento</th>
                <th>Qtd.</th>
              </tr>
            </thead>
            <tbody>
              {motivosFechamento.map((item, index) => (
                <tr key={index}>
                  <td>
                    {index + 1}. {item.motivo}
                  </td>
                  <td>
                    <strong>{item.qtd}</strong>
                  </td>
                </tr>
              ))}
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
                <th>Nome/Razão Social</th>
                <th>Tipo</th>
                <th>Descrição abertura</th>
                <th>Descrição fechamento</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {ultimasOS.map((item, index) => (
                <tr key={index}>
                  <td>
                    {index + 1}. {item.nome}
                  </td>
                  <td>{item.tipo}</td>
                  <td>{item.descricaoAbertura}</td>
                  <td>{item.descricaoFechamento}</td>
                  <td>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🔗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DashboardGerencialOperacao;
