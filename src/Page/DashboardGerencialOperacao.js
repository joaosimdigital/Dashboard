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
  const [tipoPessoaFiltro, setTipoPessoaFiltro] = useState("");
  const [tempDataFim, setTempDataFim] = useState("");
  const [tempBairrosFiltroSelecionados, setTempBairrosFiltroSelecionados] =
    useState([]);

  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [dataInicio, setDataInicio] = useState("");
  const [
    tempMotivosFechamentoFiltroSelecionados,
    setTempMotivosFechamentoFiltroSelecionados,
  ] = useState([]);
  const [dataFim, setDataFim] = useState("");
  const [tempDataInicio, setTempDataInicio] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  const [usuariosFechamento, setUsuariosFechamento] = useState([]);
  const [tempUsuariosFiltroSelecionados, setTempUsuariosFiltroSelecionados] =
    useState([]);

  const [tempSelectedItems, setTempSelectedItems] = useState(selectedItems);
  const [tempTipoPessoaFiltro, setTempTipoPessoaFiltro] =
    useState(tipoPessoaFiltro);

  const [bairroFiltro, setBairroFiltro] = useState("");
  const [mediaProducao, setMediaProducao] = useState([]);

  const [ultimasOS, setUltimasOS] = useState([]);

  const [totalOrdensServico, setTotalOrdensServico] = useState(null);
  const [osPorBairro, setOsPorBairro] = useState([]);
  const [tiposOS, setTiposOS] = useState([]);

  const [percentualMetaInstalacao, setPercentualMetaInstalacao] =
    useState(null);
  const [percentualMetaManutencao, setPercentualMetaManutencao] =
    useState(null);

  // Cópias locais dos dados brutos vindos da API
  const [allTiposOS, setAllTiposOS] = useState([]);

  const [activeFilters, setActiveFilters] = useState({
    tipoOS: false,
    usuarioFechamento: false,
    bairro: false,
    tipoPessoa: false,
    motivoFechamento: false,
  });

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
  const [isLoading, setIsLoading] = useState(false);

  const [bairrosFiltroSelecionados, setBairrosFiltroSelecionados] = useState(
    []
  );
  const [bairroSearchTerm, setBairroSearchTerm] = useState("");
  const [tituloGrafico, setTituloGrafico] = useState("Último trimestre");
  const [usuariosFiltroSelecionados, setUsuariosFiltroSelecionados] = useState(
    []
  );

  const [usuarioFiltro, setUsuarioFiltro] = useState("");
  const [usuarioFiltroTemp, setUsuarioFiltroTemp] = useState("");
  const [cidadeData, setCidadeData] = useState([]);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10; // ou 5, 20... depende do que fizer sentido

  const [showModal, setShowModal] = useState(false);
  const [selectedTipoPessoa, setSelectedTipoPessoa] = useState([]);
  const [
    motivosFechamentoFiltroSelecionados,
    setMotivosFechamentoFiltroSelecionados,
  ] = useState([]);

  const [modalContent, setModalContent] = useState("");

  const filterRef = useRef();
  const gradients = ["url(#gradOrange)", "url(#gradBlack)", "url(#gradRed)"];
  const gradientIdPF = "colorPF";
  const gradientIdPJ = "colorPJ";

  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const indiceFim = indiceInicio + itensPorPagina;
  const ultimasOSPaginadas = ultimasOS.slice(indiceInicio, indiceFim);
  const totalPaginas = Math.ceil(ultimasOS.length / itensPorPagina);

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

  const toggleTipoPessoa = (tipo) => {
    setSelectedTipoPessoa((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

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

  const usuariosFechamentoOptions = [
    "(RECOLHIMENTO) LUIS ALEXANDRE ALVES FROES",
    "(RECOLHIMENTO) ANDERSON DE CARVALHO",
    "(INST.)(SUL) RAFAEL ARAUJO FREE - 04 O.S sábado 100%",
    "(INST.)(INGLESES)MARCELO CALISTO 4 OS DIA sábado 50%",
    "(INST.)(TAPERA) ADRIANO FREE 4 OS - sábado 50%",
    "(INST.)(LESTE/ITACORUBI) HIAGO 4 OS DIA sábado 50%",
    "(INST.)(SÃO JOÃO) GUILHERME FREE 4 OS - sábado 50%",
    "(INST.)(INGLESES) LUCAS DALBERTO - 4 OS - sábado 50%",
    "JESSICA - EQUIPE COC",
    "(INST.)(SERRA/DESVIO RIZZO) MARCOS 4 OS (SYNC)",
    "(INST.)(INGLESES) ESTEVÃO 4 OS POR DIA sábado 50%",
    "(INST.)(VARGEM) PATRICK REIS SILVA - 4 OS POR DIA Sábado 50%",
    "(MANUTENÇÃO/inst.) (INGLESES/SÃO JOÃO) MARCO JULES - 4 OS sábado 50%",
    "(INST.)(CTN SUL) PABLO (FEX) 3 OS POR DIA (2 manhã/1 tarde)",
    "(INST.)(SÃO JOÃO) MARLON DE VARGAS 3 OS sábado 50%(1 manhã/2 tarde)",
    "(MANUTENÇÃO/inst.)(INGLESES) WILLIAM FERREIRA - 4 OS sábado 50%",
    "(INST.)BACKOFFICE - SERGIO 4 OS POR DIA (MACEDOS)",
    "(INST.)BACKOFFICE - ARIEL 4 OS POR DIA (MACEDOS)",
    "(INST.)(CTN NORTE) JOSEVAN (FEX) 3 OS POR DIA (2 manhã/1 tarde)",
    "GABRIELLI - EQUIPE COC",
    "KELY -EQUIPE COC",
    "(INST.)BACKOFFICE- CARLOS 4 OS POR DIA (MACEDO)",
    "(INST.)BACKOFFICE - RHUAN (MACEDOS)",
    "(INST.)(SERRA/ANA RECH) GUSTAVO 4 OS (SYNC)",
    "(INST.)(VARGEM) PAULO - 4 OS sábado 50%",
    "(INST.)(SERRA/PLANALTO) JEAN FREE 4 OS POR DIA) sábado 50%",
    "(INST.)BACKOFFICE- ADAO 4 OS POR DIA (MACEDOS)",
    "(MANUTENÇÃO/inst.)(NORTE)MARCELO WAGNER - 4 OS sábado 50%",
    "(INST.)BACKOFFICE - AUGUSTO 4 OS POR DIA (MACEDOS)",
    "(INST.)BACKOFFICE - RAYNNER 2 OS POR DIA (MACEDOS)",
    "(INST.)(LAGOA/ITACORUBI) ITALO THAIRON 4 OS POR DIA (SYNC)",
    "(INST.)(CTN NORTE)MAX BARROS 4 OS POR DIA sábado 50%",
    "SILVANO LÍDER DE CAMPO",
    "(INST.)(CTN NORTE)MAX GOMES 4 OS POR DIA sábado 50%",
    "(SERRA) SISTEMA PREDIAL - EZEQUIEL (FIBRA/ENGENHARIA)",
    "(FIBRA/NORTE) JACKSON - (ENGENHARIA)",
    "VICTOR - EQUIPE COC",
    "EDSON - TÉCNICO DE DADOS (CENTRO/SUL/CTN) sábado 50%",
    "(INST.)(SERRA/ANA RECH) CLAUDIO 3 OS DIA sábado 50%",
    "(FIBRA/NORTE) CAIO CASTRO - (ENGENHARIA)",
    "DENISON - TÉCNICO DE DADOS (CTN/NORTE) sábado 50%",
    "(MANUTENÇÃO/inst.)(VARGEM/NORTE) ARTHUR - 4 OS sábado 50%",
    "(INST.)(CTN SUL) WESLEY 4 OS POR DIA sábado 50%",
    "(INST.)(SERRA/DESVIO RIZZO) PAULO CORREA 3 OS DIA (SYNC)",
    "(INST.)FELIPE GONÇALVES 4 OS POR DIA (SYNC)",
    "PAULO SERGIO LÍDER DE CAMPO",
    "DIEGO - TÉCNICO DE DADOS (CENTRO/SUL/CTN) sábado 50%",
    "(FIBRA/CTN) DIOGO - (ENGENHARIA)",
    "ROGER FRANCISCO GALVINO",
    "(INST.)(SÃO JOÃO) LORHAN FREE 4 OS - sábado 50%",
    "ALESSANDRO LÍDER DE DADOS",
    "ALLAN XAVIER - TROCA DE POSTE (ENGENHARIA)",
    "(MANUTENÇÃO/inst.)(INGLESES) JULIO - 4 OS - Sábado 50%",
    "LEONARDO JOSÉ ASSUMPÇÃO PONTES",
    "(INST.)(SERRA/DESVIO RIZZO) DIEGO 4 OS sábado 50%",
    "(FIBRA/SERRA)RAFAEL(ENGENHARIA)",
    "(FIBRA/NORTE) IGOR - (ENGENHARIA)",
    "(FIBRA/SERRA)CASSIANO(ENGENHARIA)",
    "(INST.)(INGLESES) BRUNO DORNELLES 4 OS POR DIA (SYNC)",
    "(INST.)(CENTRO) TIAGO GOSSLER 4 OS POR DIA (SYNC)",
    "(FIBRA/NORTE) LEONEL (AUX FIBRA) (ENGENHARIA)",
    "NEI - EQUIPE COC",
    "JOÃO PEDRO SANTOS",
    "JENIFER QUIMIELI BORGES MARTINS",
    "GRACIELE - EQUIPE COC",
    "ALINE AZAMBUJA B2B",
    "SISTEMA PREDIAL - ALAN DARWINS (FIBRA/ENGENHARIA)",
    "JULIANA CLARK - EQUIPE COC",
    "NATASHA AMARAL ROSA",
    "MATEUS TEOTONIO DA SILVEIRA.",
    "ELISIANE DE ALMEIDA",
    "Matheus Padilha Batista",
    "SISTEMA PREDIAL - JOÃO J E ASSISTÊNCIA - (FIBRA/ENGENHARIA)",
    "(INST.)(JOÃO PAULO) MARCIO 4 OS POR DIA (SYNC)",
    "RODRIGO FERNANDO GEREMIAS - CGR",
    "RAFAELA PITALUGA JARDIM",
    "VANESSA DE LIMA RODRIGUES",
    "NATALIA DANIELE DA ROSA",
    "SISTEMA PREDIAL - RODRIGO (J E ASSISTÊNCIA) - (FIBRA/ENGENHARIA)",
    "(FIBRA/CTN) EDUARDO - (ENGENHARIA)",
    "PAMELA EDUARDA DOS SANTOS BATISTA",
    "VITORIA SANTOS DE SOUSA",
    "BAYER MARIANO",
    "MARCELO CAVALCANTI",
    "(FIBRA/CTN) MARCOS (AUX FIBRA)(ENGENHARIA)",
    "LANES MARQUES NAKANO - PROJETOS",
    "ROBERTO VILELA",
    "NATHANI SILVA SANTOS",
    "VINICIUS DE ASSIS MENDES",
    "Felipe Amaral Rosa",
    "GESSYCA QUINTEIRO RODRIGUES",
    "VIVIAN VIESSER FERREIRA",
    "ALESSANDRA MARIA SOUSA SILVA",
    "CRISTINA FONTANA PIMENTEL",
    "JAQUELINE BARRIQUELO RIOS",
    "ABRIL MORENO",
    "ROMULO WALLACE NASCIMENTO DE ARAUJO",
    "MATHEUS PEREIRA CABRAL TRINDADE - CGR",
    "BARBARA BONOTTO SANTOS",
    "EVELYN VARGAS RIBEIRO",
    "BRUNA PORTO B2B",
    "LUÍS FRANÇA (REDE SUL TELECOM) (ENGENHARIA)",
    "ELOÁ DANTAS PEREIRA",
    "DEIVSAN PATRICK ANDRADE DOS SANTOS",
    "GEOVANE GLAESER SEVERINO",
    "ICARO ALEXANDRE PARADA TEIXEIRA",
    "BRENO SOUZA DE MELO",
    "(SERRA)SISTEMA PREDIAL-JARDEL",
    "VANESSA MACHADO LEME",
    "PATRICK SILVA SOUZA PEREIRA",
  ];

  const motivosFechamentoOptions = [
    "INSTALAÇÃO - TUBULAÇÃO OBSTRUÍDA",
    "INSTALAÇÃO GPON - LINK DEDICADO (NÃO CONCLUÍDO)",
    "INSTALAÇÃO GPON - LINK DEDICADO (CONCLUÍDO)",
    "INSTALAÇÃO - DESISTÊNCIA DO ATENDIMENTO",
    "INSTALAÇÃO - METRAGEM EXCEDENTE",
    "INSTALAÇÃO - INVIABILIDADE",
    "INSTALAÇÃO - DESISTÊNCIA OUTRAS OPERADORAS",
    "INSTALAÇÃO - CTO LOTADA",
    "INSTALAÇÃO - CONCLUÍDA SEM PADRÃO",
    "INSTALAÇÃO - CONCLUÍDA NO PADRÃO",
    "INSTALAÇÃO - CABO EXISTENTE",
    "INSTALAÇÃO - AUSÊNCIA DE RETORNO CLIENTE",
    "INSTALAÇÃO - OS DUPLICADA",
    "TROCA DE EQUIPAMENTO - DANIFICADO PELO CLIENTE(QUEBRADO)",
    "TROCA DE EQUIPAMENTO - EQUIPAMENTO QUEIMADO",
    "TROCA DE EQUIPAMENTO - FONTE QUEIMADA",
    "TROCA DE EQUIPAMENTO - MOLHADO",
    "TROCA DE EQUIPAMENTO - ATUALIZAÇÃO TECNOLOGIA",
    "SEM ACESSO/TROCA DE CONECTOR - ATENUADO/SUJEIRA",
    "SEM ACESSO/TROCA DE DROP - VANDALISMO",
    "SEM ACESSO/TROCA DE DROP - TROCA DE POSTE",
    "SEM ACESSO/TROCA DE DROP - OUTRAS OPERADORAS",
    "SEM ACESSO/TROCA DE DROP - FOGO NA REDE",
    "SEM ACESSO/TROCA DE DROP - CAMINHÃO CARGA ALTA",
    "SEM ACESSO/TROCA DE DROP - CABO BAIXO",
    "SEM ACESSO/TROCA DE CONECTOR - QUEBRADO",
    "SEM ACESSO/TROCA DE CONECTOR - MAL CONECTADO",
    "SEM ACESSO/TROCA DE CONECTOR - DESCONECTADO NA CTO",
    "SEM ACESSO/TROCA DE CONECTOR - DANIFICADO PELO CLIENTE",
    "SEM ACESSO - OS DUPLICADA",
    "SEM ACESSO - NÃO REALIZADO",
    "SEM ACESSO - FONTE QUEIMADA",
    "SEM ACESSO - EQUIPAMENTO MOLHADO",
    "SEM ACESSO - DESISTÊNCIA DO ATENDIMENTO",
    "SEM ACESSO - TROCA DE EQUIPAMENTO",
    "SEM ACESSO - SEM CONTATO COM CLIENTE",
    "SEM ACESSO - CTO EM LOS",
    "INSTALAÇÃO - NECESSÁRIO EXPANSÃO",
    "TUBULAÇÃO OBSTRUÍDA",
    "TUBULAÇÃO CHEIA/SATURADA",
    "RETRABALHO MANUTENÇÃO REALIZADA COM SUCESSO",
    "RETRABALHO MANUTENÇÃO NÃO REALIZADA",
    "APOIO TÉCNICO - NÃO REALIZADO",
    "MANUTENÇÃO - DESISTÊNCIA CLIENTE",
    "APOIO TÉCNICO - REALIZADO",
    "MANUTENÇÃO - NÃO CONCLUÍDA",
    "MANUTENÇÃO - CONCLUÍDA",
    "MANUTENÇÃO - NÃO REALIZADA",
    "MANUTENÇÃO - REALIZAÇÃO COM SUCESSO",
    "MANUTENÇÃO - AUSÊNCIA DE RETORNO",
    "MANUTENÇÃO - NECESSÁRIA POR CULPA DO CLIENTE",
    "INSTALAÇÃO - NECESSÁRIO SISTEMA PREDIAL",
    "TROCA DE ENDEREÇO - CTO LOTADA",
    "TROCA DE ENDEREÇO - TUBULAÇÃO OBSTRUÍDA",
    "TROCA DE ENDEREÇO - DESISTÊNCIA DO CLIENTE",
    "TROCA DE ENDEREÇO - CABO NOVO",
    "TROCA DE ENDEREÇO - CABO JÁ EXISTENTE NO LOCAL",
    "TROCA DE ENDEREÇO - METRAGEM EXCEDENTE",
    "TROCA DE ENDEREÇO - AUSÊNCIA DE RETORNO CLIENTE",
    "DESISTÊNCIA DO CLIENTE",
    "RETRABALHO INSTALAÇÃO REALIZADA COM SUCESSO",
    "RETRABALHO INSTALAÇÃO NÃO REALIZADA",
    "UPGRADE NÃO REALIZADO",
    "UPGRADE REALIZADO COM SUCESSO",
    "TROCA DE EQUIPAMENTO - REALIZADA",
    "TROCA DE EQUIPAMENTO - NÃO REALIZADA",
    "UPGRADE - COM CABO DE REDE",
    "UPGRADE - SEM CABO DE REDE.",
    "AUDITORIA DE INSTALAÇÂO REALIZADA",
    "AUDITORIA DE INSTALAÇÂO NÃO REALIZADA",
    "CONFERÊNCIA - REALIZADA COM SUCESSO",
    "CONFERÊNCIA - NÃO REALIZADA",
    "SISTEMA PREDIAL - NÃO AUTORIZAD",
    "SISTEMA PREDIAL - DG SATURADO",
    "SISTEMA PREDIAL - REALIZADO",
    "SISTEMA PREDIAL - SEM PORTAS DISPONÍVEIS",
    "SISTEMA PREDIAL - TUBULAÇÃO OBSTRUÍDA",
    "SISTEMA PREDIAL - TUBULAÇÃO SATURADA",
    "SISTEMA PREDIAL - DESISTÊNCIA DO CLIENTE",
    "SISTEMA PREDIAL - DG SATURADO",
    "SISTEMA PREDIAL - NÃO AUTORIZADA",
    "SISTEMA PREDIAL - SEM RETORNO",
    "SISTEMA PREDIAL - SEM VIABILIDADE",
    "SISTEMA PREDIAL NÃO REALIZADA",
    "INSTALAÇÃO EQUIPAMENTO - NÃO CONCLUÍDA",
    "INSTALAÇÃO EQUIPAMENTO CONCLUÍDA",
    "EQUIPAMENTO RECOLHIDO",
    "EQUIPAMENTO NÃO RECOLHIDO",
    "SISTEMA PREDIAL - OS DUPLICADA",
    "SISTEMA PREDIAL - TUBULAÇÃO OBSTRUÍDA",
    "SISTEMA PREDIAL - TUBULAÇÃO SATURADA",
    "AUDITORIA SISTEMA PREDIAL (FIBRA) REALIZADA",
    "AUDITORIA SISTEMA PREDIAL (FIBRA) NÃO REALIZADA",
    "SISTEMA PREDIAL - ABERTO INDEVIDAMENTE",
    "EQUIPAMENTO PERDIDO",
    "INFRAESTRUTURA INTERNA (CLIENTE)",
    "TROCA DE CÔMODO - AUSÊNCIA DE RETORNO CLIENTE",
    "TROCA DE CÔMODO NÃO REALIZADA",
    "TROCA DE CÔMODO REALIZADA COM SUCESSO",
    "INFRAESTRUTURA EXTERNA (CLIENTE)",
    "FOLGA BANCO DE HORAS REALIZADA",
    "FOLGA BANCO DE HORAS NÃO REALIZADA",
    "AJUSTE DE COMODATO",
    "INSTALAÇÃO EQUIPAMENTO B2B - TUBULAÇÃO OBSTRUÍDA",
    "INSTALAÇÃO EQUIPAMENTO B2B - REALIZADO",
    "INSTALAÇÃO EQUIPAMENTO B2B - DESISTÊNCIA DO CLIENTE",
    "INSTALAÇÃO EQUIPAMENTO B2B - CLIENTE AUSENTE",
    "INSTALAÇÃO EQUIPAMENTO B2B - NÃO REALIZADA",
    "INSTALAÇÃO EQUIPAMENTO B2B - SEM CONTATO COM CLIENTE",
    "APOIO AO ALMOXARIFADO REALIZADO",
    "APOIO AO ALMOXARIFADO NÃO REALIZADO",
    "VIABILIDADE TÉCNICA (CLIENTES) NÃO REALIZADO",
    "VIABILIDADE TÉCNICA (CLIENTES) REALIZADO",
    "REUNIÃO NÃO REALIZADA",
    "REUNIÃO REALIZADA",
    "ACOMPANHAMENTO DE EVENTOS/FEIRAS REALIZADO",
    "ACOMPANHAMENTO DE EVENTOS/FEIRAS NÃO REALIZADO",
    "FOLGA PRÉ PLANTÃO REALIZADA",
    "FOLGA PRÉ PLANTÃO NÃO REALIZADA",
    "LANÇAMENTO CABO B2B - OS DUPLICADA",
    "LANÇAMENTO CABO B2B - DESISTÊNCIA DO ATENDIMENTO",
    "LANÇAMENTO CABO B2B - CONCLUÍDA",
    "SINAL GPON ATENUADO (CLIENTE) NÃO REALIZADO",
    "SINAL GPON ATENUADO (CLIENTE) REALIZADO",
    "BOLETOS NÃO ENTREGUES",
    "BOLETOS ENTREGUES",
    "LANÇAMENTO CABO B2B - NÃO CONCLUÍDA",
    "FOLGA PÓS PLANTÃO REALIZADA",
    "DOWGRADE REALIZADO",
    "REVERSÃO DE CANCELAMENTO REALIZADO",
    "REVERSÃO DE CANCELAMENTO NÃO REALIZADO",
    "FOLGA PÓS PLANTÃO NÃO REALIZADA",
    "DOWGRADE NÃO REALIZADO",
  ];

  const bairrosOptions = [
    "INGLESES DO RIO VERMELHO",
    "SÃO JOÃO DO RIO VERMELHO",
    "CANASVIEIRAS",
    "VARGEM GRANDE",
    "VARGEM DO BOM JESUS",
    "CACHOEIRA DO BOM JESUS",
    "CENTRO",
    "CAMPECHE",
    "SACO GRANDE",
    "SAO JOAO DO RIO VERMELHO",
    "TRINDADE",
    "ESPLANADA",
    "PLANALTO",
    "DESVIO RIZZO",
    "RIBEIRAO DA ILHA",
    "NOSSA SENHORA DAS GRAÇAS",
    "RATONES",
    "RIO BRANCO",
    "AREIAS",
    "BARREIROS",
    "INGLESES",
    "LAGOA DA CONCEICAO",
    "VARGEM PEQUENA",
    "CIDADE NOVA",
    "MONTE VERDE",
    "LAGOA DA CONCEIÇÃO",
    "RIBEIRÃO DA ILHA",
    "TAPERA DA BASE",
    "CAPOEIRAS",
    "CARVOEIRA",
    "CRUZEIRO",
    "IPIRANGA",
    "SERRANO",
    "CHARQUEADAS",
    "CORREGO GRANDE",
    "ITACORUBI",
    "JARDIM ATLÂNTICO",
    "JURERÊ INTERNACIONAL",
    "AGRONOMICA",
    "CÓRREGO GRANDE",
    "DIAMANTINO",
    "JARDIM CIDADE DE FLORIANÓPOLIS",
    "MORRO DAS PEDRAS",
    "NOSSA SENHORA DE LOURDES",
    "PANTANAL",
    "PONTA DAS CANAS",
    "SANTA MONICA",
    "SÃO CAETANO",
    "TAPERA",
    "AGRONÔMICA",
    "BELA VISTA",
    "ESTREITO",
    "JARDIM AMÉRICA",
    "JARDIM IRACEMA",
    "JURERE INTERNACIONAL",
    "PONTA DAS CANAS",
    "SALGADO FILHO",
    "SÃO CRISTÓVÃO",
    "SÃO VICTOR COHAB",
    "CAMPINAS",
    "CRISTO REDENTOR",
    "INGLESES NORTE",
    "KAYSER",
    "MONTE CRISTO",
    "NOSSA SENHORA DA SALETE",
    "NOSSA SENHORA DAS GRACAS",
    "PANAZZOLO",
    "REOLON",
    "SANTA CATARINA",
    "SAO CAETANO",
    "SAO PELEGRINO",
    "SERRARIA",
    "SÃO GIÁCOMO",
    "SÃO PELEGRINO",
    "CENTENÁRIO",
    "COQUEIROS",
    "INTERLAGOS",
    "JURERE",
    "MEDIANEIRA",
    "NOSSA SENHORA DA CONCEIÇÃO",
    "NOSSA SENHORA DE FÁTIMA",
    "ROÇADO",
    "SACO DOS LIMOES",
    "SACO DOS LIMÕES",
    "SÃO CIRO",
    "SÃO LUIZ",
    "SÃO VIRGÍLIO",
    "ABRAÃO",
    "ANA RECH",
    "BALNEARIO",
    "BALNEÁRIO",
    "CANTO",
    "CAPIVARI",
    "CAPIVARI INGLESES",
    "CINQÜENTENÁRIO",
    "COLONINHA",
    "CORREGO GRANDE",
    "DE ZORZI",
    "DISTRITO INDUSTRIAL",
    "EXPOSIÇÃO",
    "JOAO PAULO",
    "JOSÉ MENDES",
    "JURERÊ",
    "KOBRASOL",
    "MARECHAL FLORIANO",
    "NOSSA SRA. DAS GRACAS",
    "PIO X",
    "POTECAS",
    "PRESIDENTE VARGAS",
    "REAL PARQUE",
    "RIO TAVARES",
    "SAGRADA FAMÍLIA",
    "SANTA FE",
    "SANTA MÔNICA",
    "SANTINHO",
    "SANTO ANTÔNIO DE LISBOA",
    "UNIVERSITARIO",
  ];

  const [tipoPessoaData, setTipoPessoaData] = useState([]);
  const [loadingTipoPessoa, setLoadingTipoPessoa] = useState(true);

  const [trimestreData, setTrimestreData] = useState([]);

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

  const fetchTotais = async () => {
    setIsLoading(true); // começa o carregamento
    try {
      const params = new URLSearchParams();

      if (tipoPessoaFiltro) {
        params.append("tipoPessoa", tipoPessoaFiltro);
      }

      if (selectedItems.length > 0) {
        params.append("tiposOS", selectedItems.join(","));
      }

      if (bairrosFiltroSelecionados.length > 0) {
        bairrosFiltroSelecionados.forEach((bairro) => {
          params.append("bairro", bairro);
        });
      }

      if (usuariosFiltroSelecionados.length > 0) {
        params.append("usuarios", usuariosFiltroSelecionados.join(","));
      }

      if (motivosFechamentoFiltroSelecionados.length > 0) {
        params.append("motivos", motivosFechamentoFiltroSelecionados.join(","));
      }

      if (dataInicio) {
        params.append("dataInicio", dataInicio);
      }

      if (dataFim) {
        params.append("dataFim", dataFim);
      }

      const response = await fetch(
        `http://38.224.145.3:3003/ordens-servico?${params.toString()}`
      );
      const data = await response.json();

      setTotalOrdensServico(Number(data.total_os_mes));
      setTotalInstalacoes(0);
      setTotalManutencoes(0);
      setTipoPessoaData([]);
    } catch (error) {
      console.error("Erro ao buscar dados de totais:", error);
    } finally {
      setIsLoading(false); // finaliza o carregamento
    }
  };

  useEffect(() => {
    fetchTotais();
  }, [
    tipoPessoaFiltro,
    selectedItems,
    bairrosFiltroSelecionados,
    usuariosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio,
    dataFim,
  ]);

  const fetchTotalClientesPorTipo = async () => {
    setIsLoading(true);
    try {
      setLoadingTipoPessoa(true);

      const params = new URLSearchParams();

      if (selectedItems.length > 0) {
        params.append("tiposOS", selectedItems.join(","));
      }

      if (bairrosFiltroSelecionados.length > 0) {
        bairrosFiltroSelecionados.forEach((bairro) => {
          params.append("bairro", bairro);
        });
      }

      if (usuariosFiltroSelecionados.length > 0) {
        params.append("usuarios", usuariosFiltroSelecionados.join(","));
      }

      if (motivosFechamentoFiltroSelecionados.length > 0) {
        params.append("motivos", motivosFechamentoFiltroSelecionados.join(","));
      }

      // ✅ Novos filtros de data
      if (dataInicio) {
        params.append("dataInicio", dataInicio);
      }

      if (dataFim) {
        params.append("dataFim", dataFim);
      }

      const response = await fetch(
        `http://38.224.145.3:3003/total-clientes-os-por-tipo?${params.toString()}`
      );
      const data = await response.json();

      const pf = data.pf || 0;
      const pj = data.pj || 0;

      setTipoPessoaData([
        { name: "Pessoa Física", value: pf, fill: "#f47621" },
        { name: "Pessoa Jurídica", value: pj, fill: "#212121" },
      ]);
    } catch (error) {
      console.error("Erro ao buscar total de clientes PF/PJ:", error);
      setTipoPessoaData([]);
    } finally {
      setLoadingTipoPessoa(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalClientesPorTipo();
  }, [
    selectedItems,
    bairrosFiltroSelecionados,
    usuariosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio, // ✅
    dataFim, // ✅
  ]);

  const fetchTiposOS = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (tipoPessoaFiltro) {
        params.append("tipoPessoa", tipoPessoaFiltro);
      }

      if (selectedItems.length > 0) {
        params.append("tiposOS", selectedItems.join(","));
      }

      if (bairrosFiltroSelecionados.length > 0) {
        bairrosFiltroSelecionados.forEach((bairro) => {
          params.append("bairro", bairro);
        });
      }

      if (usuariosFiltroSelecionados.length > 0) {
        params.append("usuarios", usuariosFiltroSelecionados.join(","));
      }

      if (motivosFechamentoFiltroSelecionados.length > 0) {
        params.append("motivos", motivosFechamentoFiltroSelecionados.join(","));
      }

      if (dataInicio) {
        params.append("dataInicio", dataInicio);
      }

      if (dataFim) {
        params.append("dataFim", dataFim);
      }

      const response = await fetch(
        `http://38.224.145.3:3003/ordens-servico-por-tipo?${params.toString()}`
      );

      const data = await response.json();

      const formattedData = data.map((item) => ({
        nome: item.tipo_os,
        qtd: Number(item.quantidade),
      }));

      setTiposOS(formattedData);
      setAllTiposOS(formattedData);
    } catch (error) {
      console.error("Erro ao buscar tipos de OS do mês atual:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTiposOS();
  }, [
    tipoPessoaFiltro,
    selectedItems,
    bairrosFiltroSelecionados,
    usuariosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio,
    dataFim,
  ]);

  const fetchOrdensPorUsuario = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      // ✅ Filtro por usuários
      if (usuariosFiltroSelecionados.length > 0) {
        params.append("usuarios", usuariosFiltroSelecionados.join(","));
      }

      // ✅ Filtro por tipo de pessoa
      if (tipoPessoaFiltro) {
        params.append("tipoPessoa", tipoPessoaFiltro);
      }

      // ✅ Filtro por tipos de OS
      if (selectedItems.length > 0) {
        const tiposOSString = selectedItems.map(String).join(",");
        params.append("tiposOS", tiposOSString);
      }

      // ✅ Filtro por bairros
      if (bairrosFiltroSelecionados.length > 0) {
        bairrosFiltroSelecionados.forEach((bairro) => {
          params.append("bairro", bairro);
        });
      }

      // ✅ Filtro por motivos de fechamento
      if (motivosFechamentoFiltroSelecionados.length > 0) {
        const motivos = motivosFechamentoFiltroSelecionados.join(",");
        params.append("motivos", motivos);
      }

      // ✅ Filtro por data
      if (dataInicio) {
        params.append("dataInicio", dataInicio);
      }

      if (dataFim) {
        params.append("dataFim", dataFim);
      }

      const response = await fetch(
        `http://38.224.145.3:3003/ordens-por-usuario?${params.toString()}`
      );

      const data = await response.json();

      // ✅ Formata dados para gráfico de usuários
      const formattedDataUsuarios = data.map((item) => ({
        nome: item.usuario,
        qtd: parseInt(item.total_ordens, 10),
      }));
      setUsuariosFechamento(formattedDataUsuarios);

      // ✅ Formata dados para gráfico de média de produção
      const formattedDataMediaProducao = data.map((item) => ({
        nome: item.usuario,
        diasUteis: item.dias_uteis,
        total: parseFloat(item.media_producao),
      }));
      setMediaProducao(formattedDataMediaProducao);
    } catch (error) {
      console.error("❌ Erro ao buscar ordens por usuário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdensPorUsuario();
  }, [
    usuariosFiltroSelecionados,
    tipoPessoaFiltro,
    selectedItems,
    bairrosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio,
    dataFim,
  ]);

  const fetchMotivosFechamento = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (motivosFechamentoFiltroSelecionados.length > 0) {
        params.append("motivos", motivosFechamentoFiltroSelecionados.join(","));
      }

      if (tipoPessoaFiltro) {
        params.append("tipoPessoa", tipoPessoaFiltro);
      }

      if (selectedItems.length > 0) {
        const tiposOSString = selectedItems.map(String).join(",");
        params.append("tiposOS", tiposOSString);
      }

      if (bairrosFiltroSelecionados.length > 0) {
        bairrosFiltroSelecionados.forEach((bairro) =>
          params.append("bairro", bairro)
        );
      }

      if (usuariosFiltroSelecionados.length > 0) {
        usuariosFiltroSelecionados.forEach((usuario) =>
          params.append("usuarios", usuario)
        );
      }

      if (dataInicio && dataFim) {
        params.append("dataInicio", dataInicio);
        params.append("dataFim", dataFim);
      }

      const response = await fetch(
        `http://38.224.145.3:3003/motivos-fechamento-os?${params}`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        const formattedData = data.map((item) => ({
          motivo: item.motivo_fechamento,
          qtd: parseInt(item.quantidade, 10),
        }));

        setMotivosFechamento(formattedData);
      } else {
        console.error("Resposta inesperada, não é um array:", data);
        setMotivosFechamento([]);
      }
    } catch (error) {
      console.error("Erro ao buscar motivos de fechamento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMotivosFechamento();
  }, [
    motivosFechamentoFiltroSelecionados,
    tipoPessoaFiltro,
    selectedItems,
    bairrosFiltroSelecionados,
    usuariosFiltroSelecionados,
    dataInicio,
    dataFim,
  ]);

  useEffect(() => {
    setIsLoading(true);
    const fetchTotaisPorEstado = async () => {
      try {
        const params = new URLSearchParams();

        if (dataInicio && dataFim) {
          params.append("dataInicio", dataInicio);
          params.append("dataFim", dataFim);
        }

        const response = await fetch(
          `http://38.224.145.3:3003/ordens-servico-do-mes-por-estado?${params}`
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotaisPorEstado();
  }, [dataInicio, dataFim]);

  useEffect(() => {
    setIsLoading(true);
    const fetchClientesHabilitados = async () => {
      try {
        const params = new URLSearchParams();

        if (tipoPessoaFiltro) {
          params.append("tipoPessoa", tipoPessoaFiltro);
        }

        if (selectedItems.length > 0) {
          params.append("tiposOS", selectedItems.join(","));
        }

        if (bairrosFiltroSelecionados.length > 0) {
          bairrosFiltroSelecionados.forEach((bairro) =>
            params.append("bairro", bairro)
          );
        }

        if (usuariosFiltroSelecionados.length > 0) {
          params.append("usuarios", usuariosFiltroSelecionados.join(","));
        }

        if (motivosFechamentoFiltroSelecionados.length > 0) {
          params.append(
            "motivos",
            motivosFechamentoFiltroSelecionados.join(",")
          );
        }

        // Filtros de data
        if (dataInicio) {
          params.append("dataInicio", dataInicio);
        }

        if (dataFim) {
          params.append("dataFim", dataFim);
        }

        const queryString = params.toString();

        const [resHoje, resSC, resRS] = await Promise.all([
          fetch(
            `http://38.224.145.3:3003/total-clientes-habilitados-mes?${queryString}`
          ),
          fetch(
            `http://38.224.145.3:3003/total-clientes-habilitados-sc?${queryString}`
          ),
          fetch(
            `http://38.224.145.3:3003/total-clientes-habilitados-rs?${queryString}`
          ),
        ]);

        const dataHoje = await resHoje.json();
        const dataSC = await resSC.json();
        const dataRS = await resRS.json();

        setTotalClientesHabilitadosHoje(dataHoje.total_clientes_habilitados);
        setTotalClientesHabilitadosSC(dataSC.total_clientes_habilitados);
        setTotalClientesHabilitadosRS(dataRS.total_clientes_habilitados);
      } catch (error) {
        console.error("Erro ao buscar clientes habilitados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientesHabilitados();
  }, [
    tipoPessoaFiltro,
    selectedItems,
    bairrosFiltroSelecionados,
    usuariosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio,
    dataFim,
  ]);

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    if (selectedItems.length > 0) {
      params.append("tiposOS", selectedItems.join(","));
    }

    if (bairrosFiltroSelecionados.length > 0) {
      bairrosFiltroSelecionados.forEach((bairro) =>
        params.append("bairro", bairro)
      );
    }

    if (tipoPessoaFiltro) {
      params.append("tipoPessoa", tipoPessoaFiltro);
    }

    if (usuariosFiltroSelecionados.length > 0) {
      usuariosFiltroSelecionados.forEach((usuario) =>
        params.append("usuarios", usuario)
      );
    }

    if (motivosFechamentoFiltroSelecionados.length > 0) {
      params.append("motivos", motivosFechamentoFiltroSelecionados.join(","));
    }

    if (dataInicio) {
      params.append("dataInicio", dataInicio);
    }

    if (dataFim) {
      params.append("dataFim", dataFim);
    }

    return params.toString();
  };

  // UseEffect que busca os dados
  useEffect(() => {
    setIsLoading(true);
    const fetchTotalClientesHabilitadosSC = async () => {
      try {
        const params = buildQueryParams();
        const response = await fetch(
          `http://38.224.145.3:3003/total-clientes-habilitados-executado-sc?${params}`
        );
        const data = await response.json();
        setTotalManutencoesSC(Number(data.total_manutencoes));
      } catch (error) {
        console.error(
          "Erro ao buscar total de clientes habilitados SC:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTotalManutencoesRS = async () => {
      setIsLoading(true);
      try {
        const params = buildQueryParams();
        const response = await fetch(
          `http://38.224.145.3:3003/total-clientes-habilitados-executado-rs?${params}`
        );
        const data = await response.json();
        setTotalManutencoesRS(Number(data.total_manutencoes));
      } catch (error) {
        console.error("Erro ao buscar total de manutenções RS:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalClientesHabilitadosSC();
    fetchTotalManutencoesRS();
  }, [
    selectedItems,
    bairrosFiltroSelecionados,
    tipoPessoaFiltro,
    usuariosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio,
    dataFim,
  ]);

  const fetchOrdensServicoUltimos3Meses = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (tipoPessoaFiltro) {
        params.append("tipoPessoa", tipoPessoaFiltro);
      }

      if (selectedItems.length > 0) {
        params.append("tiposOS", selectedItems.join(","));
      }

      if (bairrosFiltroSelecionados.length > 0) {
        bairrosFiltroSelecionados.forEach((bairro) => {
          params.append("bairro", bairro);
        });
      }

      if (usuariosFiltroSelecionados.length > 0) {
        params.append("usuarios", usuariosFiltroSelecionados.join(","));
      }

      if (motivosFechamentoFiltroSelecionados.length > 0) {
        params.append("motivos", motivosFechamentoFiltroSelecionados.join(","));
      }

      if (dataInicio) {
        params.append("dataInicio", dataInicio);
      }

      if (dataFim) {
        params.append("dataFim", dataFim);
      }

      const response = await fetch(
        `http://38.224.145.3:3003/ordens-servico-ultimos-3-meses?${params}`
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

      // ✅ Define os dados e o título com base no número de meses retornados
      setTrimestreData(formattedData);

      if (formattedData.length <= 3) {
        setTituloGrafico("Último trimestre");
      } else {
        setTituloGrafico(`Últimos ${formattedData.length} meses`);
      }
    } catch (error) {
      console.error("❌ Erro ao buscar OS dos últimos 3 meses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdensServicoUltimos3Meses();
  }, [
    tipoPessoaFiltro,
    selectedItems,
    bairrosFiltroSelecionados,
    usuariosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio, // ✅
    dataFim, // ✅
  ]);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrdensDetalhadas = async () => {
      try {
        const params = new URLSearchParams();

        if (tipoPessoaFiltro) {
          params.append("tipoPessoa", tipoPessoaFiltro);
        }

        if (selectedItems.length > 0) {
          params.append("tiposOS", selectedItems.join(","));
        }

        if (bairrosFiltroSelecionados.length > 0) {
          bairrosFiltroSelecionados.forEach((bairro) =>
            params.append("bairro", bairro)
          );
        }

        if (usuariosFiltroSelecionados.length > 0) {
          params.append("usuarios", usuariosFiltroSelecionados.join(","));
        }

        if (motivosFechamentoFiltroSelecionados.length > 0) {
          params.append(
            "motivos",
            motivosFechamentoFiltroSelecionados.join(",")
          );
        }

        if (dataInicio && dataFim) {
          params.append("dataInicio", dataInicio);
          params.append("dataFim", dataFim);
        }

        const response = await fetch(
          `http://38.224.145.3:3003/ordens-detalhadas?${params}`
        );
        const data = await response.json();

        const formatted = data.map((item) => ({
          nome: item.nome_razaosocial,
          tipo: item.tipo_os,
          descricaoAbertura: item.descricao_abertura,
          descricaoFechamento: item.descricao_fechamento,
          link: `https://simfloripa.hubsoft.com.br/cliente/editar/${item.id_cliente}/ordem_servico`,
        }));

        setUltimasOS(formatted);
      } catch (error) {
        console.error("Erro ao buscar ordens detalhadas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrdensDetalhadas();
  }, [
    tipoPessoaFiltro,
    selectedItems,
    bairrosFiltroSelecionados,
    usuariosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio,
    dataFim,
  ]);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrdensServicoPorCidade = async () => {
      try {
        const params = new URLSearchParams();

        if (tipoPessoaFiltro) {
          params.append("tipoPessoa", tipoPessoaFiltro);
        }

        if (selectedItems.length > 0) {
          params.append("tiposOS", selectedItems.join(","));
        }

        if (bairrosFiltroSelecionados.length > 0) {
          params.append("bairro", bairrosFiltroSelecionados.join(","));
        }

        if (usuariosFiltroSelecionados.length > 0) {
          params.append("usuarios", usuariosFiltroSelecionados.join(","));
        }

        if (motivosFechamentoFiltroSelecionados.length > 0) {
          params.append(
            "motivos",
            motivosFechamentoFiltroSelecionados.join(",")
          );
        }

        if (dataInicio && dataFim) {
          params.append("dataInicio", dataInicio);
          params.append("dataFim", dataFim);
        }

        const response = await fetch(
          `http://38.224.145.3:3003/ordens-servico-do-mes-por-cidade?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrdensServicoPorCidade();
  }, [
    tipoPessoaFiltro,
    selectedItems,
    bairrosFiltroSelecionados,
    usuariosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio,
    dataFim,
  ]);

  const fetchOrdensServicoPorBairro = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      // Bairro
      if (bairrosFiltroSelecionados.length > 0) {
        bairrosFiltroSelecionados.forEach((bairro) =>
          params.append("bairro", bairro)
        );
      }

      // Tipos de OS
      if (selectedItems.length > 0) {
        params.append("tiposOS", selectedItems.join(","));
      }

      // Tipo de pessoa (ex: "Física", "Jurídica")
      if (tipoPessoaFiltro) {
        params.append("tipoPessoa", tipoPessoaFiltro);
      }

      // Usuários
      if (usuariosFiltroSelecionados.length > 0) {
        usuariosFiltroSelecionados.forEach((usuario) =>
          params.append("usuarios", usuario)
        );
      }

      // Motivos
      if (motivosFechamentoFiltroSelecionados.length > 0) {
        motivosFechamentoFiltroSelecionados.forEach((motivo) =>
          params.append("motivos", motivo)
        );
      }

      // Período
      if (dataInicio) {
        params.append("dataInicio", dataInicio);
      }
      if (dataFim) {
        params.append("dataFim", dataFim);
      }

      const response = await fetch(
        `http://38.224.145.3:3003/ordens-servico-do-mes-por-bairro?${params}`
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchOrdensServicoPorBairro();
  }, [
    tipoPessoaFiltro,
    selectedItems,
    bairrosFiltroSelecionados,
    usuariosFiltroSelecionados,
    motivosFechamentoFiltroSelecionados,
    dataInicio, // ✅ novo listener
    dataFim, // ✅ novo listener
  ]);

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
    <>
      {isLoading && <div className="loading-bar" style={{ width: "100%" }} />}
      <div className="operacao-wrapper">
        <img
          src={imgSmileSim}
          alt="Smile Top Left"
          className="smile-top-left"
        />
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

              {/* Botão Limpar filtros */}
              <button
                className="operacao-filter-button"
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  setSelectedItems([]);
                  setUsuariosFiltroSelecionados([]);
                  setBairrosFiltroSelecionados([]);
                  setTipoPessoaFiltro("");
                  setMotivosFechamentoFiltroSelecionados([]);
                  setDataInicio(""); // <- Limpa data início
                  setDataFim(""); // <- Limpa data fim
                  setActiveFilters({
                    tipoOS: false,
                    usuarioFechamento: false,
                    bairro: false,
                    tipoPessoa: false,
                    motivoFechamento: false,
                  });
                  setShowFilter(false);
                  setActiveSubFilter(null);

                  // Atualiza os dados da dashboard sem filtros
                  fetchTiposOS();
                  fetchOrdensPorUsuario();
                  fetchOrdensServicoPorBairro();
                  fetchOrdensServicoUltimos3Meses();
                  fetchTotais();
                  fetchTotalClientesPorTipo();
                  fetchMotivosFechamento();
                }}
              >
                Limpar filtros
              </button>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginRight: "2rem",
                }}
              >
                <button
                  className="operacao-filter-button"
                  onClick={() => setMostrarCalendario((prev) => !prev)}
                >
                  📅 Selecionar período
                </button>

                {mostrarCalendario && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      background: "#fff",
                      padding: "1rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      zIndex: 10,
                    }}
                  >
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                      Início:{" "}
                      <input
                        type="date"
                        value={tempDataInicio}
                        onChange={(e) => setTempDataInicio(e.target.value)}
                      />
                    </label>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                      Fim:{" "}
                      <input
                        type="date"
                        value={tempDataFim}
                        onChange={(e) => setTempDataFim(e.target.value)}
                      />
                    </label>
                    <button
                      className="operacao-apply-filter-button"
                      onClick={() => {
                        setDataInicio(tempDataInicio);
                        setDataFim(tempDataFim);
                        setMostrarCalendario(false);
                        fetchOrdensServicoUltimos3Meses(); // ou outra função
                      }}
                    >
                      Aplicar período
                    </button>
                  </div>
                )}
              </div>

              {activeFilters.tipoOS && selectedItems.length > 0 && (
                <div className="filtro-tag">
                  Tipo de OS
                  <button
                    className="filtro-tag-close"
                    onClick={() => {
                      setSelectedItems([]);
                      setActiveFilters((prev) => ({ ...prev, tipoOS: false }));
                      fetchTiposOS(); // refaz a busca sem filtros
                    }}
                  >
                    ×
                  </button>
                  <span className="filtro-tag-count">
                    {selectedItems.length}
                  </span>
                </div>
              )}

              {activeFilters.usuarioFechamento &&
                usuariosFiltroSelecionados.length > 0 && (
                  <div className="filtro-tag">
                    Usuário Fechamento
                    <button
                      className="filtro-tag-close"
                      onClick={() => {
                        setUsuariosFiltroSelecionados([]);
                        setActiveFilters((prev) => ({
                          ...prev,
                          usuarioFechamento: false,
                        }));
                        fetchOrdensPorUsuario();
                      }}
                    >
                      ×
                    </button>
                    <span className="filtro-tag-count">
                      {usuariosFiltroSelecionados.length}
                    </span>
                  </div>
                )}

              {activeFilters.bairro && bairrosFiltroSelecionados.length > 0 && (
                <div className="filtro-tag">
                  Bairro
                  <button
                    className="filtro-tag-close"
                    onClick={() => {
                      setBairrosFiltroSelecionados([]);
                      setActiveFilters((prev) => ({ ...prev, bairro: false }));
                      fetchOrdensServicoPorBairro(); // opcional para reset
                    }}
                  >
                    ×
                  </button>
                  <span className="filtro-tag-count">
                    {bairrosFiltroSelecionados.length}
                  </span>
                </div>
              )}

              {activeFilters.tipoPessoa && tipoPessoaFiltro && (
                <div className="filtro-tag">
                  Tipo:{" "}
                  {tipoPessoaFiltro === "pf"
                    ? "Pessoa Física"
                    : "Pessoa Jurídica"}
                  <button
                    className="filtro-tag-close"
                    onClick={() => {
                      setTipoPessoaFiltro("");
                      setActiveFilters((prev) => ({
                        ...prev,
                        tipoPessoa: false,
                      }));
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              {activeFilters.motivoFechamento &&
                motivosFechamentoFiltroSelecionados.length > 0 && (
                  <div className="filtro-tag">
                    Motivo Fechamento
                    <button
                      className="filtro-tag-close"
                      onClick={() => {
                        setMotivosFechamentoFiltroSelecionados([]);
                        setActiveFilters((prev) => ({
                          ...prev,
                          motivoFechamento: false,
                        }));
                      }}
                    >
                      ×
                    </button>
                    <span className="filtro-tag-count">
                      {motivosFechamentoFiltroSelecionados.length}
                    </span>
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
                        <li
                          onClick={() =>
                            setActiveSubFilter("usuarioFechamento")
                          }
                        >
                          <span>Usuário de fechamento ➔</span>
                          {usuariosFiltroSelecionados.length > 0 && (
                            <span className="filtro-badge">
                              {usuariosFiltroSelecionados.length} ×
                            </span>
                          )}
                        </li>
                        <li onClick={() => setActiveSubFilter("osLocalizacao")}>
                          <span>OS por localização ➔</span>
                          {bairrosFiltroSelecionados.length > 0 && (
                            <span className="filtro-badge">
                              {bairrosFiltroSelecionados.length} ×
                            </span>
                          )}
                        </li>
                        <li onClick={() => setActiveSubFilter("tipoPessoa")}>
                          <span>Tipo de pessoa ➔</span>
                          {tipoPessoaFiltro.length > 0 && (
                            <span className="filtro-badge">
                              {tipoPessoaFiltro.length} ×
                            </span>
                          )}
                        </li>

                        <li>Média de produção ➔</li>
                        <li
                          onClick={() => setActiveSubFilter("motivoFechamento")}
                        >
                          <span>Motivo fechamento ➔</span>
                          {motivosFechamentoFiltroSelecionados.length > 0 && (
                            <span className="filtro-badge">
                              {motivosFechamentoFiltroSelecionados.length} ×
                            </span>
                          )}
                        </li>
                      </ul>
                    </>
                  )}

                  {activeSubFilter === "tipoOS" && (
                    <div className="operacao-subfilter">
                      <h4>Tipo de OS</h4>
                      <input
                        type="text"
                        placeholder="Buscar OS"
                        className="operacao-subfilter-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="operacao-subfilter-list">
                        {filteredOptions.map((item, idx) => (
                          <label key={idx} className="operacao-subfilter-item">
                            <input
                              type="checkbox"
                              checked={tempSelectedItems.includes(item)}
                              onChange={() => {
                                setTempSelectedItems((prev) =>
                                  prev.includes(item)
                                    ? prev.filter((i) => i !== item)
                                    : [...prev, item]
                                );
                              }}
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                      <button
                        className="operacao-apply-filter-button"
                        onClick={() => {
                          setSelectedItems(tempSelectedItems); // <-- Aqui atualiza o estado que dispara o fetch
                          fetchTiposOS();
                          setActiveFilters((prev) => ({
                            ...prev,
                            tipoOS: true,
                          }));
                          setActiveSubFilter(null);
                          setShowFilter(false);
                        }}
                      >
                        Aplicar
                      </button>
                    </div>
                  )}

                  {activeSubFilter === "tipoPessoa" && (
                    <div className="operacao-subfilter">
                      <h4>Tipo de Pessoa</h4>
                      <div className="operacao-subfilter-list">
                        {["pf", "pj"].map((tipo, idx) => (
                          <label key={idx} className="operacao-subfilter-item">
                            <input
                              type="checkbox"
                              checked={tempTipoPessoaFiltro.includes(tipo)}
                              onChange={() => {
                                setTempTipoPessoaFiltro((prev) =>
                                  prev.includes(tipo)
                                    ? prev.filter((i) => i !== tipo)
                                    : [...prev, tipo]
                                );
                              }}
                            />
                            {tipo === "pf"
                              ? "Pessoa Física"
                              : "Pessoa Jurídica"}
                          </label>
                        ))}
                      </div>
                      <button
                        className="operacao-apply-filter-button"
                        onClick={() => {
                          setTipoPessoaFiltro(tempTipoPessoaFiltro);
                          fetchOrdensServicoUltimos3Meses();
                          fetchTotais();
                          fetchTotalClientesPorTipo();
                          setActiveFilters((prev) => ({
                            ...prev,
                            tipoPessoa: true,
                          }));
                          setActiveSubFilter(null);
                          setShowFilter(false);
                        }}
                      >
                        Aplicar
                      </button>
                    </div>
                  )}

                  {activeSubFilter === "osLocalizacao" && (
                    <div className="operacao-subfilter">
                      <h4>OS por Localização (Bairro)</h4>
                      <input
                        type="text"
                        placeholder="Buscar bairro"
                        className="operacao-subfilter-search"
                        value={bairroSearchTerm}
                        onChange={(e) => setBairroSearchTerm(e.target.value)}
                      />
                      <div className="operacao-subfilter-list">
                        {bairrosOptions
                          .filter((bairro) =>
                            bairro
                              .toLowerCase()
                              .includes(bairroSearchTerm.toLowerCase())
                          )
                          .map((bairro, idx) => (
                            <label
                              key={idx}
                              className="operacao-subfilter-item"
                            >
                              <input
                                type="checkbox"
                                checked={tempBairrosFiltroSelecionados.includes(
                                  bairro
                                )}
                                onChange={() => {
                                  setTempBairrosFiltroSelecionados((prev) =>
                                    prev.includes(bairro)
                                      ? prev.filter((b) => b !== bairro)
                                      : [...prev, bairro]
                                  );
                                }}
                              />
                              {bairro}
                            </label>
                          ))}
                      </div>
                      <button
                        className="operacao-apply-filter-button"
                        onClick={() => {
                          setBairrosFiltroSelecionados(
                            tempBairrosFiltroSelecionados
                          );
                          fetchOrdensServicoPorBairro();
                          setActiveFilters((prev) => ({
                            ...prev,
                            bairro: true,
                          }));
                          setActiveSubFilter(null);
                          setShowFilter(false);
                        }}
                      >
                        Aplicar
                      </button>
                    </div>
                  )}

                  {activeSubFilter === "usuarioFechamento" && (
                    <div className="operacao-subfilter">
                      <h4>Usuário de Fechamento</h4>
                      <input
                        type="text"
                        placeholder="Buscar usuário"
                        className="operacao-subfilter-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="operacao-subfilter-list">
                        {usuariosFechamentoOptions
                          .filter((user) =>
                            user
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((user, idx) => (
                            <label
                              key={idx}
                              className="operacao-subfilter-item"
                            >
                              <input
                                type="checkbox"
                                checked={tempUsuariosFiltroSelecionados.includes(
                                  user
                                )}
                                onChange={() => {
                                  setTempUsuariosFiltroSelecionados((prev) =>
                                    prev.includes(user)
                                      ? prev.filter((u) => u !== user)
                                      : [...prev, user]
                                  );
                                }}
                              />
                              {user}
                            </label>
                          ))}
                      </div>
                      <button
                        className="operacao-apply-filter-button"
                        onClick={() => {
                          setUsuariosFiltroSelecionados(
                            tempUsuariosFiltroSelecionados
                          );
                          fetchOrdensPorUsuario();
                          setActiveFilters((prev) => ({
                            ...prev,
                            usuarioFechamento: true,
                          }));
                          setActiveSubFilter(null);
                          setShowFilter(false);
                        }}
                      >
                        Aplicar
                      </button>
                    </div>
                  )}

                  {activeSubFilter === "motivoFechamento" && (
                    <div className="operacao-subfilter">
                      <h4>Motivo de Fechamento</h4>
                      <input
                        type="text"
                        placeholder="Buscar motivo"
                        className="operacao-subfilter-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="operacao-subfilter-list">
                        {motivosFechamentoOptions
                          .filter((item) =>
                            item
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((motivo, idx) => {
                            return (
                              <label
                                key={idx}
                                className="operacao-subfilter-item"
                              >
                                <input
                                  type="checkbox"
                                  checked={tempMotivosFechamentoFiltroSelecionados.includes(
                                    motivo
                                  )}
                                  onChange={() => {
                                    setTempMotivosFechamentoFiltroSelecionados(
                                      (prev) =>
                                        prev.includes(motivo)
                                          ? prev.filter((m) => m !== motivo)
                                          : [...prev, motivo]
                                    );
                                  }}
                                />
                                {motivo}
                              </label>
                            );
                          })}
                      </div>
                      <button
                        className="operacao-apply-filter-button"
                        onClick={() => {
                          setMotivosFechamentoFiltroSelecionados(
                            tempMotivosFechamentoFiltroSelecionados
                          );
                          setActiveFilters((prev) => ({
                            ...prev,
                            motivoFechamento: true,
                          }));
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
                  {tipoPessoaData.length >= 0 ? (
                    <BarChart
                      data={tipoPessoaData}
                      barCategoryGap={20}
                      margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                    >
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
                      />
                      <Tooltip
                        formatter={(value) => [value, "Total"]}
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[5, 5, 0, 0]}
                        maxBarSize={70}
                      >
                        {tipoPessoaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        <LabelList
                          dataKey="value"
                          position="top"
                          style={{ fill: "#212121", fontWeight: 600 }}
                        />
                      </Bar>
                    </BarChart>
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        paddingTop: "100px",
                        color: "#999",
                      }}
                    >
                      {loadingTipoPessoa
                        ? "Carregando..."
                        : "Sem dados para o período selecionado"}
                    </div>
                  )}
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
                <h4>{tituloGrafico}</h4>
                <ResponsiveContainer width="100%" height={250}>
                  {trimestreData.length > 0 ? (
                    <BarChart
                      data={trimestreData}
                      barCategoryGap={2}
                      margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
                    >
                      {/* Defs e elementos do gráfico */}
                      <defs>
                        <linearGradient
                          id="gradOrange"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#f47621" />
                          <stop offset="100%" stopColor="#e15000" />
                        </linearGradient>
                        <linearGradient
                          id="gradBlack"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#333333" />
                          <stop offset="100%" stopColor="#000000" />
                        </linearGradient>
                        <linearGradient
                          id="gradRed"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
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
                      <Bar
                        dataKey="value"
                        radius={[8, 8, 0, 0]}
                        maxBarSize={70}
                      >
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
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        paddingTop: "100px",
                        color: "#999",
                      }}
                    >
                      Sem dados para o período selecionado
                    </div>
                  )}
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
          {/* Tipos de OS */}
          <div className="operacao-table-card">
            <div className="operacao-table-wrapper">
              {tiposOS.length > 0 ? (
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
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#999",
                  }}
                >
                  Sem dados para o período selecionado
                </div>
              )}
            </div>
          </div>

          {/* Usuários de Fechamento */}
          <div className="operacao-table-card">
            <div className="operacao-table-wrapper">
              {usuariosFechamento.length > 0 ? (
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
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#999",
                  }}
                >
                  Sem dados para o período selecionado
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="operacao-section operacao-extra-section">
          {/* OS por cidade */}
          <div className="operacao-card-nobottom operacao-chart-donut">
            <h4>OS por cidade</h4>
            <div className="donut-chart-container">
              {cidadeData.length > 0 ? (
                <>
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
                </>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 0",
                    color: "#999",
                  }}
                >
                  {cidadeData === null
                    ? "Carregando..."
                    : "Sem dados para o período selecionado"}
                </div>
              )}
            </div>
          </div>

          {/* OS por bairro */}
          <div className="operacao-card-nobottom operacao-table-card">
            <div
              className="operacao-table-wrapper"
              style={{ maxHeight: "260px", overflowY: "auto" }}
            >
              {osPorBairro.length > 0 ? (
                <table className="operacao-table">
                  <thead>
                    <tr className="tr-space-between">
                      <th>OS por bairro</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {osPorBairro.slice(0, 5).map((bairro, index) => (
                      <tr key={index}>
                        <td>
                          {index + 1}. {bairro.nome}
                        </td>
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
                          <td>
                            <strong>{bairro.qtd.toLocaleString()}</strong>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 0",
                    color: "#999",
                  }}
                >
                  {osPorBairro === null
                    ? "Carregando..."
                    : "Sem dados para o período selecionado"}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="operacao-section operacao-extra-section">
          {/* Qtd. média de produção */}
          <div className="operacao-card-nobottom operacao-table-card operacao-table-wrapper">
            <div
              className="operacao-table-wrapper"
              style={{ maxHeight: "260px", overflowY: "auto" }}
            >
              {mediaProducao && mediaProducao.length > 0 ? (
                <table className="operacao-table">
                  <thead>
                    <tr className="tr-space-between">
                      <th>Qtd. média de produção</th>
                      <th>Dias úteis</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mediaProducao.slice(5).map((item, index) => (
                      <tr key={index + 5}>
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
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 0",
                    color: "#999",
                  }}
                >
                  {mediaProducao === null
                    ? "Carregando..."
                    : "Sem dados para o período selecionado"}
                </div>
              )}
            </div>
          </div>

          {/* Motivos de fechamento */}
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

            {ultimasOS && ultimasOS.length > 0 ? (
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
                  {ultimasOSPaginadas.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {indiceInicio + index + 1}. {item.nome}
                      </td>
                      <td>{item.tipo}</td>
                      <td>
                        <span
                          className="descricao-limitada"
                          onClick={() =>
                            openModal(item.descricaoAbertura || "")
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {(item.descricaoAbertura || "").length > 50
                            ? (item.descricaoAbertura || "").slice(0, 50) +
                              "..."
                            : item.descricaoAbertura || ""}
                        </span>
                      </td>
                      <td>
                        <span
                          className="descricao-limitada"
                          onClick={() =>
                            openModal(item.descricaoFechamento || "")
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {(item.descricaoFechamento || "").length > 50
                            ? (item.descricaoFechamento || "").slice(0, 50) +
                              "..."
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
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 0",
                  color: "#999",
                }}
              >
                {ultimasOS === null
                  ? "Carregando..."
                  : "Sem dados para o período selecionado"}
              </div>
            )}
          </div>
          {totalPaginas > 1 && (
            <div className="paginacao-tabela">
              <button
                onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaAtual === 1}
              >
                Anterior
              </button>

              <span>
                Página {paginaAtual} de {totalPaginas}
              </span>

              <button
                onClick={() =>
                  setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
                }
                disabled={paginaAtual === totalPaginas}
              >
                Próxima
              </button>
            </div>
          )}

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
    </>
  );
}

export default DashboardGerencialOperacao;
