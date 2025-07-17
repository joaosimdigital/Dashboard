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
  const [motivosFechamento, setMotivosFechamento] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [usuariosFechamento, setUsuariosFechamento] = useState([]);
  const [ultimasOS, setUltimasOS] = useState([]);

  const [totalOrdensServico, setTotalOrdensServico] = useState(null);
  const [osPorBairro, setOsPorBairro] = useState([]);
  const [tiposOS, setTiposOS] = useState([]);

  const [percentualMetaInstalacao, setPercentualMetaInstalacao] =
    useState(null);
  const [percentualMetaManutencao, setPercentualMetaManutencao] =
    useState(null);

  const [totalManutencoes, setTotalManutencoes] = useState(null);
  const [totalInstalacoes, setTotalInstalacoes] = useState(null);
  const [instalacoesSC, setInstalacoesSC] = useState(null);
  const [instalacoesRS, setInstalacoesRS] = useState(null);
  const [manutencoesSC, setManutencoesSC] = useState(null);
  const [manutencoesRS, setManutencoesRS] = useState(null);
  const [
    clientesHabilitadosUltimos3Meses,
    setClientesHabilitadosUltimos3Meses,
  ] = useState([]);

  const [totalClientesHabilitadosHoje, setTotalClientesHabilitadosHoje] =
    useState(null);
  const [totalClientesHabilitadosSC, setTotalClientesHabilitadosSC] =
    useState(null);
  const [totalClientesHabilitadosRS, setTotalClientesHabilitadosRS] =
    useState(null);
  const [totalManutencoesSC, setTotalManutencoesSC] = useState(null);
  const [totalManutencoesRS, setTotalManutencoesRS] = useState(null);

  const [cidadeData, setCidadeData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

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

  const openModal = (text) => {
    setModalContent(text);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  // Meta de instalações por mês
  const metasInstalacaoPorMes = {
    6: 850, // Junho
    7: 860, // Julho
    8: 870, // Agosto
    9: 880, // Setembro
    10: 895, // Outubro
    11: 900, // Novembro
    12: 910, // Dezembro
  };

  const [tipoPessoaData, setTipoPessoaData] = useState([
    { name: "Pessoa Física", value: 0, fill: "#f47621" },
    { name: "Pessoa Jurídica", value: 0, fill: "#212121" },
  ]);

  const [trimestreData, setTrimestreData] = useState([]);

  const mediaProducao = [
    { nome: "JOÃO SILVA DOS SANTOS", diasUteis: 34, total: 87 },
    { nome: "JOSÉ DE SOUZA SILVA", diasUteis: 32, total: 83 },
    { nome: "MARIANA SANTOS MEDEIROS", diasUteis: 28, total: 78 },
    { nome: "JORGE ARAGÃO DE OLIVEIRA", diasUteis: 21, total: 77 },
    { nome: "MARIA BRAGA DE JESUS", diasUteis: 19, total: 69 },
  ];

  const [totalCidade, setTotalCidade] = useState(0);

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
        const response = await fetch("http://localhost:3011/ordens-servico");
        const data = await response.json();

        // Atualiza apenas o total de ordens de serviço no mês
        setTotalOrdensServico(Number(data.total_os_mes));

        // Zera ou ignora os demais, pois o endpoint não retorna mais estes dados
        setTotalInstalacoes(0);
        setTotalManutencoes(0);

        // Se estiver usando gráfico de tipo de pessoa, pode zerar ou esconder
        setTipoPessoaData([]);
      } catch (error) {
        console.error("Erro ao buscar dados de totais:", error);
      }
    };

    fetchTotais();
  }, []);

  useEffect(() => {
    const fetchTipoPessoaData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/total-clientes-os-por-tipo"
        );
        const data = await response.json();

        const formattedData = [
          {
            name: "Pessoa Física",
            value: data.pf || 0,
          },
          {
            name: "Pessoa Jurídica",
            value: data.pj || 0,
          },
        ];

        setTipoPessoaData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados de tipo de pessoa:", error);
      }
    };

    fetchTipoPessoaData();
  }, []);

  useEffect(() => {
    const fetchTiposOS = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/ordens-servico-por-tipo"
        );
        const data = await response.json();

        const formattedData = data.map((item) => ({
          nome: item.tipo_os,
          qtd: Number(item.quantidade),
        }));

        setTiposOS(formattedData);
      } catch (error) {
        console.error("Erro ao buscar tipos de OS do mês atual:", error);
      }
    };

    fetchTiposOS();
  }, []);

  useEffect(() => {
    const fetchOrdensPorUsuario = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/ordens-por-usuario"
        );
        const data = await response.json();

        const formattedData = data.map((item) => ({
          nome: item.usuario,
          qtd: parseInt(item.total_ordens, 10),
        }));

        setUsuariosFechamento(formattedData);
      } catch (error) {
        console.error("Erro ao buscar ordens por usuário:", error);
      }
    };

    fetchOrdensPorUsuario();
  }, []);

  useEffect(() => {
    const fetchMotivosFechamento = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/motivos-fechamento-os"
        );
        const data = await response.json();

        const formattedData = data.map((item) => ({
          motivo: item.motivo_fechamento,
          qtd: parseInt(item.quantidade, 10),
        }));

        setMotivosFechamento(formattedData);
      } catch (error) {
        console.error("Erro ao buscar motivos de fechamento:", error);
      }
    };

    fetchMotivosFechamento();
  }, []);

  useEffect(() => {
    const fetchTotaisPorEstado = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/ordens-servico-do-mes-por-estado"
        );
        const data = await response.json();

        const estados = data.total_por_estado;

        const sc = estados.find((e) => e.estado === "Santa Catarina");
        const rs = estados.find((e) => e.estado === "Rio Grande do Sul");

        setInstalacoesSC(sc ? sc.total_instalacoes : 0);
        setInstalacoesRS(rs ? rs.total_instalacoes : 0);
        setManutencoesSC(sc ? sc.total_manutencoes : 0);
        setManutencoesRS(rs ? rs.total_manutencoes : 0);
      } catch (error) {
        console.error("Erro ao buscar totais por estado:", error);
      }
    };

    fetchTotaisPorEstado();
  }, []);

  useEffect(() => {
    const fetchClientesHabilitados = async () => {
      try {
        const [resHoje, resSC, resRS] = await Promise.all([
          fetch("http://localhost:3011/total-clientes-habilitados-mes"),
          fetch("http://localhost:3011/total-clientes-habilitados-sc"),
          fetch("http://localhost:3011/total-clientes-habilitados-rs"),
        ]);

        const dataHoje = await resHoje.json();
        const dataSC = await resSC.json();
        const dataRS = await resRS.json();

        setTotalClientesHabilitadosHoje(dataHoje.total_clientes_habilitados);
        setTotalClientesHabilitadosSC(dataSC.total_clientes_habilitados);
        setTotalClientesHabilitadosRS(dataRS.total_clientes_habilitados);
      } catch (error) {
        console.error("Erro ao buscar clientes habilitados:", error);
      }
    };

    fetchClientesHabilitados();
  }, []);

  useEffect(() => {
    const fetchTotalClientesHabilitadosSC = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/total-clientes-habilitados-executado-sc"
        );
        const data = await response.json();
        setTotalManutencoesSC(Number(data.total_manutencoes));
      } catch (error) {
        console.error(
          "Erro ao buscar total de clientes habilitados SC:",
          error
        );
      }
    };

    const fetchTotalManutencoesRS = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/total-clientes-habilitados-executado-rs"
        );
        const data = await response.json();
        setTotalManutencoesRS(Number(data.total_manutencoes));
      } catch (error) {
        console.error("Erro ao buscar total de manutenções RS:", error);
      }
    };

    fetchTotalClientesHabilitadosSC();
    fetchTotalManutencoesRS();
  }, []);

  useEffect(() => {
    const fetchOrdensServicoUltimos3Meses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/ordens-servico-ultimos-3-meses"
        );
        const data = await response.json();

        const mesesNomes = [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ];

        const formattedData = data.map((item) => ({
          name: `${mesesNomes[item.mes - 1]} ${item.ano}`,
          value: parseInt(item.total_os),
        }));

        setTrimestreData(formattedData);
      } catch (error) {
        console.error("❌ Erro ao buscar OS dos últimos 3 meses:", error);
      }
    };

    fetchOrdensServicoUltimos3Meses();
  }, []);

  useEffect(() => {
    const fetchOrdensDetalhadas = async () => {
      try {
        const response = await fetch("http://localhost:3011/ordens-detalhadas");
        const data = await response.json();

        // Mapear os dados para o formato usado no JSX
        const formatted = data.map((item) => ({
          nome: item.nome_razaosocial,
          tipo: item.tipo_os,
          descricaoAbertura: item.descricao_abertura,
          descricaoFechamento: item.descricao_fechamento,
          // Se quiser um link real, adapte aqui. Por enquanto deixo '#' vazio.
          link: "#",
        }));

        setUltimasOS(formatted);
      } catch (error) {
        console.error("Erro ao buscar ordens detalhadas:", error);
      }
    };

    fetchOrdensDetalhadas();
  }, []);

  useEffect(() => {
    const fetchOrdensServicoPorCidade = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/ordens-servico-do-mes-por-cidade"
        );
        const data = await response.json();

        // Mapeamento de cores fixas por cidade
        const coresPorCidade = {
          Florianópolis: "#000000",
          "Caxias do Sul": "#FB7424",
          "São José": "#F4DF1E",
          Palhoça: "#E4482D",
        };

        const formattedData = data.total_por_cidade
          .filter((item) =>
            ["Florianópolis", "Caxias do Sul", "São José", "Palhoça"].includes(
              item.cidade
            )
          )
          .map((item) => ({
            name: item.cidade,
            value: item.total_geral,
            color: coresPorCidade[item.cidade] || "#999999",
          }));

        const total = formattedData.reduce((sum, item) => sum + item.value, 0);

        setCidadeData(formattedData);
        setTotalCidade(total);
      } catch (error) {
        console.error("Erro ao buscar ordens de serviço por cidade:", error);
      }
    };

    fetchOrdensServicoPorCidade();
  }, []);

  useEffect(() => {
    const fetchOrdensServicoPorBairro = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/ordens-servico-do-mes-por-bairro"
        );
        const data = await response.json();

        const bairrosComOS = data.total_por_bairro
          .filter((bairro) => bairro.total_geral >= 1)
          .sort((a, b) => b.total_geral - a.total_geral)
          .map((bairro) => ({
            nome: bairro.bairro || "Sem bairro",
            qtd: bairro.total_geral,
          }));

        setOsPorBairro(bairrosComOS);
      } catch (error) {
        console.error("Erro ao buscar ordens de serviço por bairro:", error);
      }
    };

    fetchOrdensServicoPorBairro();
  }, []);

  useEffect(() => {
    if (
      totalClientesHabilitadosSC !== null &&
      totalClientesHabilitadosRS !== null
    ) {
      const totalInstalacoes =
        Number(totalClientesHabilitadosSC) + Number(totalClientesHabilitadosRS);

      const mesAtual = new Date().getMonth() + 1; // Mês atual (1-12)
      const metaMes = metasInstalacaoPorMes[mesAtual] || 1; // Previne divisão por zero

      const percentual = ((totalInstalacoes / metaMes) * 100).toFixed(1);
      setPercentualMetaInstalacao(percentual);
    }
  }, [totalClientesHabilitadosSC, totalClientesHabilitadosRS]);

  useEffect(() => {
    if (totalManutencoesSC !== null && totalManutencoesRS !== null) {
      const totalManutencoes =
        Number(totalManutencoesSC) + Number(totalManutencoesRS);
      const metaMensalManutencao = 1200;

      const percentual = (
        (totalManutencoes / metaMensalManutencao) *
        100
      ).toFixed(1);
      setPercentualMetaManutencao(percentual);
    }
  }, [totalManutencoesSC, totalManutencoesRS]);

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
                {totalOrdensServico !== null
                  ? totalOrdensServico.toLocaleString()
                  : "Carregando..."}
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
                    tickFormatter={(value) => value.toLocaleString()}
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
            <div className="operacao-card-nobottom-center">
              <h4>Instalações por estado</h4>
              <div className="operacao-state-installations">
                <div>
                  <strong>SC</strong>
                  <p>
                    {totalClientesHabilitadosSC !== null
                      ? totalClientesHabilitadosSC.toLocaleString()
                      : "Carregando..."}
                  </p>
                </div>
                <div>
                  <strong>RS</strong>
                  <p>
                    {totalClientesHabilitadosRS !== null
                      ? totalClientesHabilitadosRS.toLocaleString()
                      : "Carregando..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="operacao-card operacao-big-number-card">
              <h4>Total de Instalações</h4>
              <div className="operacao-big-number-nomargin">
                {totalClientesHabilitadosSC !== null &&
                totalClientesHabilitadosRS !== null
                  ? (
                      Number(totalClientesHabilitadosSC) +
                      Number(totalClientesHabilitadosRS)
                    ).toLocaleString()
                  : "Carregando..."}
              </div>
            </div>

            <div className="operacao-card-nobottom-center operacao-big-number-card">
              <h4>% atingido da Meta</h4>
              <div className="operacao-big-number-nomargin">
                {percentualMetaInstalacao !== null
                  ? `${percentualMetaInstalacao}%`
                  : "Carregando..."}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="operacao-section">
        <h3>Manutenções</h3>
        <div className="operacao-card-container">
          <div className="operacao-summary-cards">
            <div className="operacao-card-nobottom-center">
              <h4>Manutenções por estado</h4>
              <div className="operacao-state-installations">
                <div>
                  <strong>SC</strong>
                  <p>
                    {totalManutencoesSC !== null
                      ? totalManutencoesSC.toLocaleString()
                      : "Carregando..."}
                  </p>
                </div>
                <div>
                  <strong>RS</strong>
                  <p>
                    {totalManutencoesRS !== null
                      ? totalManutencoesRS.toLocaleString()
                      : "Carregando..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="operacao-card operacao-big-number-card">
              <h4>Total de Manutenções</h4>
              <div className="operacao-big-number-nomargin">
                {totalManutencoesSC !== null && totalManutencoesRS !== null
                  ? (
                      Number(totalManutencoesSC) + Number(totalManutencoesRS)
                    ).toLocaleString()
                  : "Carregando..."}
              </div>
            </div>

            <div className="operacao-card-nobottom-center operacao-big-number-card">
              <h4>% atingido da Meta</h4>
              <div className="operacao-big-number-nomargin">
                {percentualMetaManutencao !== null
                  ? `${percentualMetaManutencao}%`
                  : "Carregando..."}
              </div>
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
                const percent =
                  totalCidade > 0
                    ? ((entry.value / totalCidade) * 100).toFixed(1)
                    : 0;
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
          <div
            className="operacao-table-wrapper"
            style={{ maxHeight: "260px", overflowY: "auto" }} // Scroll vertical
          >
            <table className="operacao-table">
              <thead>
                <tr className="tr-space-between">
                  <th>OS por bairro</th>
                  <th></th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {osPorBairro.slice(0, 5).map((bairro, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}. {bairro.nome}
                    </td>
                    <td></td>
                    <td>
                      <strong>{bairro.qtd.toLocaleString()}</strong>
                    </td>
                  </tr>
                ))}
                {osPorBairro.length > 5 &&
                  osPorBairro.slice(5).map((bairro, index) => (
                    <tr key={index + 5}>
                      <td>
                        {index + 6}. {bairro.nome}
                      </td>
                      <td></td>
                      <td>
                        <strong>{bairro.qtd.toLocaleString()}</strong>
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

        <div className="operacao-card-nobottom operacao-table-card operacao-table-wrapper">
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
        <div className="operacao-card-nobottom operacao-table-card operacao-table-wrapper">
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
                  <td>
                    <span
                      className="descricao-limitada"
                      onClick={() => openModal(item.descricaoAbertura || "")}
                      style={{ cursor: "pointer" }}
                    >
                      {(item.descricaoAbertura || "").length > 50
                        ? (item.descricaoAbertura || "").slice(0, 50) + "..."
                        : item.descricaoAbertura || ""}
                    </span>
                  </td>
                  <td>
                    <span
                      className="descricao-limitada"
                      onClick={() => openModal(item.descricaoFechamento || "")}
                      style={{ cursor: "pointer" }}
                    >
                      {(item.descricaoFechamento || "").length > 50
                        ? (item.descricaoFechamento || "").slice(0, 50) + "..."
                        : item.descricaoFechamento || ""}
                    </span>
                  </td>
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

        {/* ✅ MODAL */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={closeModal} className="close-button">
                x
              </button>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardGerencialOperacao;
