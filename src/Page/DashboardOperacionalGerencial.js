import React, { useEffect, useState } from "react";

import "../CSS/DashboardOperacionalGerencial.css";
import logobranca from "../Images/logobrnaca.png";

function DashboardOperacionalGerencial() {
  const [totalManutencaoMes, setTotalManutencaoMes] = useState(0);
  const [totalInstalacaoMes, setTotalInstalacaoMes] = useState(0);
  const [dadosOrdensAbertas, setDadosOrdensAbertas] = useState([]);
  const [loadingOrdensAbertas, setLoadingOrdensAbertas] = useState(false);
  const [totalRecolhimentoMes, setTotalRecolhimentoMes] = useState(0);
  const [totalTrocaEndMes, setTotalTrocaEndMes] = useState(0);
  const [totalOutrosMes, setTotalOutrosMes] = useState(0);
  const [totalResumoMes, setTotalResumoMes] = useState(0);
  const [totalInstalacaoHoje, setTotalInstalacaoHoje] = useState(0);
  const [totalRecolhimentoHoje, setTotalRecolhimentoHoje] = useState(0);
  const [totalManutencaoHoje, setTotalManutencaoHoje] = useState(0);
  const [totalTrocaEndHoje, setTotalTrocaEndHoje] = useState(0);
  const [totalOutrosHoje, setTotalOutrosHoje] = useState(0);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [totalResumoHoje, setTotalResumoHoje] = useState(0);
  const [dadosTabelaCidade, setDadosTabelaCidade] = useState([]);
  const [dadosbairros, setDadosBairros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState([]);
  const [dados2, setDados2] = useState([]);
  const [dados3, setDados3] = useState([]);
  const [dados4, setDados4] = useState([]);
  const [dados5, setDados5] = useState([]);
  const [dados6, setDados6] = useState([]);
  const [loadingTabela, setLoadingTabela] = useState(false);

  const [dadosBrutos, setDadosBrutos] = useState([]);
  const [dadosOrdenados, setDadosOrdenados] = useState([]);
  const [ordemColuna, setOrdemColuna] = useState({
    coluna: null,
    direcao: "asc",
  });

  const ITENS_POR_PAGINA = 30;

  const [paginaAtual, setPaginaAtual] = useState(1);

  // Cálculo de itens a mostrar na página atual
  const indexUltimo = paginaAtual * ITENS_POR_PAGINA;
  const indexPrimeiro = indexUltimo - ITENS_POR_PAGINA;
  const itensPagina = dadosOrdensAbertas
    .filter((cliente) => cliente.data_cadastro && !cliente.data_finalizado)
    .slice(indexPrimeiro, indexUltimo);

  const totalPaginas = Math.ceil(dadosOrdensAbertas.length / ITENS_POR_PAGINA);

  const irParaPagina = (num) => {
    if (num < 1 || num > totalPaginas) return;
    setPaginaAtual(num);
  };

  const ordenarTabela = (dados, coluna, direcaoAtual = "asc") => {
    const novaDirecao =
      ordemColuna.coluna === coluna && ordemColuna.direcao === "asc"
        ? "desc"
        : "asc";

    const ordenados = [...dados].sort((a, b) => {
      const valorA = a[coluna] ?? 0;
      const valorB = b[coluna] ?? 0;
      return novaDirecao === "asc" ? valorA - valorB : valorB - valorA;
    });

    const comRanking = ordenados.map((item, index) => ({
      ...item,
      ranking: index + 1,
    }));

    setDadosTabelaCidade(comRanking);
    setOrdemColuna({ coluna, direcao: novaDirecao });
  };

  const [totais, setTotais] = useState({
    total_instalacoes: 0,
    total_trocas: 0,
    total_manutencoes: 0,
    total_outros: 0,
    total_geral: 0,
  });

  const [semAgenda, setSemAgenda] = useState({
    total_instalacoes: 0,
    total_trocas: 0,
    total_manutencoes: 0,
    total_outros: 0,
    total_geral: 0,
  });

  const [sla, setSla] = useState({
    instalacoes: null,
    trocas_endereco: null,
    manutencoes: null,
    outros: null,
  });

  const [dadosOriginais, setDadosOriginais] = useState([]);
  const [ordemCrescente, setOrdemCrescente] = useState(true);

  useEffect(() => {
    const buscarOrdensServicoAbertasCompleto = async () => {
      try {
        setLoadingOrdensAbertas(true);

        const params = new URLSearchParams();
        if (tipoSelecionado) params.append("tipo", tipoSelecionado);

        const response = await fetch(
          `https://dashboard-backend.onrender.com/ordens-servico-abertas-completo-mes?${params.toString()}`
        );

        if (!response.ok) throw new Error("Erro ao buscar ordens de serviço");

        const data = await response.json();
        setDadosOrdensAbertas(data.ordens_servico || []);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoadingOrdensAbertas(false);
      }
    };

    buscarOrdensServicoAbertasCompleto(); // chama a função
  }, [tipoSelecionado]); // roda de novo quando o filtro mudar

  useEffect(() => {
    const fetchSla = async () => {
      try {
        const res = await fetch(
          "https://dashboard-backend.onrender.com/sla-os-categorias-30-dias"
        );
        const data = await res.json();

        if (data.sla_medio_dias) {
          setSla(data.sla_medio_dias);
        }
      } catch (error) {
        console.error("Erro ao buscar SLA médio:", error);
      }
    };

    fetchSla();

    // Atualiza a cada 60 segundos (opcional)
    const interval = setInterval(fetchSla, 60000);
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  useEffect(() => {
    const buscarTotais = async () => {
      try {
        const response = await fetch(
          "https://dashboard-backend.onrender.com/ordens-servico-pendente-total-mes"
        );
        const data = await response.json();

        setTotais({
          instalacoes: data.total_instalacoes || 0,
          trocas: data.total_trocas || 0,
          manutencoes: data.total_manutencoes || 0,
          outros: data.total_outros || 0,
          todos: data.total_geral || 0,
          recolhimentos: data.total_recolhimentos,
        });
      } catch (error) {
        console.error("Erro ao buscar totais vencidos:", error);
      }
    };

    buscarTotais();

    const interval = setInterval(buscarTotais, 60000); // Atualiza a cada 60s

    return () => clearInterval(interval); // Evita vazamento de memória
  }, []);

  const [dadosClientesCompleto, setDadosClientesCompleto] = useState([]);

  const buscarOrdens = async (
    tipo = "",
    escopo = "",
    cidade = "",
    bairro = ""
  ) => {
    setLoadingTabela(true);
    const params = new URLSearchParams();

    if (tipo) params.append("tipo", tipo);
    if (cidade) params.append("cidade", cidade);
    if (bairro) params.append("bairro", bairro);

    // Dia = ontem e hoje
    if (escopo === "dia") {
      const hoje = new Date();
      const ontem = new Date(hoje);
      ontem.setDate(hoje.getDate() - 1);

      // Início: ontem às 00:01
      const inicio = new Date(
        ontem.getFullYear(),
        ontem.getMonth(),
        ontem.getDate(),
        0,
        1,
        0 // 00:01:00
      );

      // Fim: hoje às 23:59
      const fim = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        hoje.getDate(),
        23,
        59,
        59 // 23:59:59
      );

      // Para uso em URLs ou body de requisição
      const format = (date) =>
        date.toISOString().slice(0, 19).replace("T", " ");

      params.append("inicio", format(inicio)); // Ex: 2025-09-08 00:01:00
      params.append("fim", format(fim)); // Ex: 2025-09-09 23:59:59
    }

    if (escopo === "d1") {
      const data = new Date();
      data.setDate(data.getDate() + 1); // amanhã

      params.append("inicio", data.toISOString().split("T")[0]);
      params.append("fim", data.toISOString().split("T")[0]);
    }

    if (escopo === "d2") {
      const data = new Date();
      data.setDate(data.getDate() + 2); // amanhã

      params.append("inicio", data.toISOString().split("T")[0]);
      params.append("fim", data.toISOString().split("T")[0]);
    }

    if (escopo === "d3") {
      const data = new Date();
      data.setDate(data.getDate() + 3); // amanhã

      params.append("inicio", data.toISOString().split("T")[0]);
      params.append("fim", data.toISOString().split("T")[0]);
    }

    if (escopo === "d4") {
      const data = new Date();
      data.setDate(data.getDate() + 4); // amanhã

      params.append("inicio", data.toISOString().split("T")[0]);
      params.append("fim", data.toISOString().split("T")[0]);
    }

    if (escopo === "d5") {
      const data = new Date();
      data.setDate(data.getDate() + 5); // amanhã

      params.append("inicio", data.toISOString().split("T")[0]);
      params.append("fim", data.toISOString().split("T")[0]);
    }

    if (escopo === "d6") {
      const dataInicio = new Date();
      dataInicio.setDate(dataInicio.getDate() + 6); // data daqui a 6 dias

      const dataFim = new Date("2030-12-31"); // data fim arbitrária no futuro

      params.append("inicio", dataInicio.toISOString().split("T")[0]);
      params.append("fim", dataFim.toISOString().split("T")[0]);
    }

    if (escopo === "d7") {
      params.append("status", "aguardando_agendamento");
    }

    const url = `https://dashboard-backend.onrender.com/ordens-servico-categorias-completo-mes?${params.toString()}`;
    console.log("➡️ Requisição para backend:", url);

    try {
      const resposta = await fetch(url);
      const json = await resposta.json();
      setDadosClientesCompleto(json.ordens_servico);
    } catch (error) {
      console.error("❌ Erro ao buscar ordens de serviço:", error);
    } finally {
      setLoadingTabela(false); // <-- Fim do loading
    }
  };

  useEffect(() => {
    const fetchDadosCidades = async () => {
      try {
        const res = await fetch(
          "https://dashboard-backend.onrender.com/ordens-servico-do-mes-por-cidade"
        );
        if (!res.ok) throw new Error("Erro ao buscar dados por cidade");
        const data = await res.json();

        const transformado = data.total_por_cidade
          .map((cidade) => {
            const instalacoes = cidade.total_instalacoes || 0;
            const manutencao = cidade.total_manutencoes || 0;
            const trocaEndereco = cidade.total_trocas || 0;
            const recolhimentos = cidade.total_recolhimentos || 0;
            const outros = cidade.total_outros || 0;
            const total =
              instalacoes + manutencao + trocaEndereco + outros + recolhimentos;

            console.log(recolhimentos);
            return {
              cidade: cidade.cidade || "Não informado",
              instalacoes,
              manutencao,
              trocaEndereco,
              recolhimentos,
              outros,
              total,
            };
          })
          .sort((a, b) => b.total - a.total); // Ordena do maior para o menor TOTAL

        setDadosOriginais(transformado); // Salva os dados ordenados
        setDadosTabelaCidade(transformado); // Já aparece ordenado no render
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      }
    };

    const ordensservico3 = async () => {
      try {
        fetch("https://dashboard-backend.onrender.com/ordens-servico-aguardando-agendamento")
          .then((res) => res.json())
          .then((data) => {
            setSemAgenda(data.totais);
          })
          .catch((err) => {
            console.error("Erro ao buscar ordens sem agendamento:", err);
          });
      } catch (error) {
        console.error("Erro ao carregar dados D+1:", error);
      }
    };

    const fetchDadosAmanha1 = async () => {
      try {
        const res = await fetch(
          "https://dashboard-backend.onrender.com/ordens-servico-total-amanha1"
        );
        if (!res.ok)
          throw new Error(
            "Erro ao buscar dados de ordens de serviço de amanhã"
          );

        const data = await res.json();
        setDados(data);
      } catch (error) {
        console.error("Erro ao carregar dados D+1:", error);
      }
    };

    const fetchDadosAmanha2 = async () => {
      try {
        const res = await fetch(
          "https://dashboard-backend.onrender.com/ordens-servico-total-amanha2"
        );
        if (!res.ok)
          throw new Error(
            "Erro ao buscar dados de ordens de serviço de amanhã"
          );

        const data = await res.json();
        setDados2(data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao carregar dados D+1:", error);
      }
    };

    const fetchDadosAmanha3 = async () => {
      try {
        const res = await fetch(
          "https://dashboard-backend.onrender.com/ordens-servico-total-amanha3"
        );
        if (!res.ok)
          throw new Error(
            "Erro ao buscar dados de ordens de serviço de amanhã"
          );

        const data = await res.json();
        setDados3(data);
      } catch (error) {
        console.error("Erro ao carregar dados D+1:", error);
      }
    };

    const fetchDadosAmanha4 = async () => {
      try {
        const res = await fetch(
          "https://dashboard-backend.onrender.com/ordens-servico-total-amanha4"
        );
        if (!res.ok)
          throw new Error(
            "Erro ao buscar dados de ordens de serviço de amanhã"
          );

        const data = await res.json();
        setDados4(data);
      } catch (error) {
        console.error("Erro ao carregar dados D+1:", error);
      }
    };

    const fetchDadosAmanha5 = async () => {
      try {
        const res = await fetch(
          "https://dashboard-backend.onrender.com/ordens-servico-total-amanha5"
        );
        if (!res.ok)
          throw new Error(
            "Erro ao buscar dados de ordens de serviço de amanhã"
          );

        const data = await res.json();
        setDados5(data);
      } catch (error) {
        console.error("Erro ao carregar dados D+1:", error);
      }
    };

    const fetchDadosAmanha6 = async () => {
      try {
        const res = await fetch(
          "https://dashboard-backend.onrender.com/ordens-servico-total-amanha6"
        );
        if (!res.ok)
          throw new Error(
            "Erro ao buscar dados de ordens de serviço de amanhã"
          );

        const data = await res.json();
        setDados6(data);
      } catch (error) {
        console.error("Erro ao carregar dados D+1:", error);
      }
    };

    const fetchInstalacoes = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-instalacoes-do-mes"
      );
      if (!res.ok) throw new Error("Erro ao buscar instalações");
      const data = await res.json();
      setTotalInstalacaoMes(
        data.total_ordens_pendentes_aguardando_instalacao || 0
      );
    };

    const fetchRecolhimento = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-recolhimento-do-mes"
      );
      if (!res.ok) throw new Error("Erro ao buscar instalações");
      const data = await res.json();
      setTotalRecolhimentoMes(
        data.total_ordens_pendentes_aguardando_recolhimento || 0
      );
    };

    const fetchRecolhimentoHoje = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-recolhimento-hoje"
      );
      if (!res.ok) throw new Error("Erro ao buscar instalações");
      const data = await res.json();
      setTotalRecolhimentoHoje(
        data.total_ordens_pendentes_aguardando_instalacao || 0
      );
    };

    const fetchManutencoes = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-manutencao-do-mes"
      );
      if (!res.ok) throw new Error("Erro ao buscar manutenções");
      const data = await res.json();
      setTotalManutencaoMes(
        data.total_ordens_pendentes_aguardando_manutencao || 0
      );
    };

    const fetchTrocas = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-trocas-do-mes"
      );
      if (!res.ok) throw new Error("Erro ao buscar trocas");
      const data = await res.json();
      setTotalTrocaEndMes(
        data.total_ordens_pendentes_aguardando_troca_endereco || 0
      );
    };

    const fetchOutros = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-outros-do-mes"
      );
      if (!res.ok) throw new Error("Erro ao buscar outros motivos");
      const data = await res.json();
      setTotalOutrosMes(data.total_ordens_pendentes_aguardando_outros || 0);
    };

    const fetchResumo = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-total-do-mes"
      );
      if (!res.ok) throw new Error("Erro ao buscar resumo mensal");
      const data = await res.json();
      setTotalResumoMes(data.total_geral || 0);
    };

    const fetchInstalacoesHoje = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-instalacoes-hoje"
      );
      if (!res.ok) throw new Error("Erro ao buscar instalações de hoje");
      const data = await res.json();

      // Correção aqui:
      const total = data.total_ordens_pendentes_aguardando_instalacao || 0;
      setTotalInstalacaoHoje(Number(total));
    };

    const fetchManutencoesHoje = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-manutencao-hoje"
      );
      if (!res.ok) throw new Error("Erro ao buscar manutenções de hoje");
      const data = await res.json();
      setTotalManutencaoHoje(
        data.total_ordens_pendentes_aguardando_manutencao || 0
      );
    };

    const fetchTrocasHoje = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-trocas-hoje"
      );
      if (!res.ok) throw new Error("Erro ao buscar trocas de endereço de hoje");
      const data = await res.json();
      setTotalTrocaEndHoje(
        data.total_ordens_pendentes_aguardando_troca_endereco || 0
      );
    };

    const fetchOutrosHoje = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-outros-hoje"
      );
      if (!res.ok)
        throw new Error("Erro ao buscar ordens de outros motivos de hoje");
      const data = await res.json();
      setTotalOutrosHoje(data.total_ordens_pendentes_aguardando_outros || 0);
    };

    const fetchResumoHoje = async () => {
      const res = await fetch(
        "https://dashboard-backend.onrender.com/ordens-servico-total-hoje"
      );
      if (!res.ok) throw new Error("Erro ao buscar resumo de hoje");
      const data = await res.json();
      setTotalResumoHoje(data.total_geral || 0);
    };

    const fetchDadosBairros = async () => {
      try {
        const res = await fetch(
          "https://dashboard-backend.onrender.com/ordens-servico-do-mes-por-bairro"
        );
        if (!res.ok) throw new Error("Erro ao buscar dados por bairro");

        const data = await res.json();

        const transformado = data.total_por_bairro
          .map((bairro) => {
            const instalacoes = bairro.total_instalacoes || 0;
            const manutencao = bairro.total_manutencoes || 0;
            const trocaEndereco = bairro.total_trocas || 0;
            const recolhimentos = bairro.total_recolhimentos || 0;
            const outros = bairro.total_outros || 0;
            const total = instalacoes + manutencao + trocaEndereco + outros;

            return {
              bairros: bairro.bairro || "Não informado",
              instalacoes,
              manutencao,
              trocaEndereco,
              recolhimentos,
              outros,
              total,
            };
          })
          .sort((a, b) => b.total - a.total); // ordena do maior para o menor

        setDadosBairros(transformado);
      } catch (error) {
        console.error("Erro ao carregar bairros:", error);
      }
    };

    const buscarTodos = async () => {
      try {
        await Promise.all([
          fetchRecolhimento(),
          fetchInstalacoes(),
          fetchManutencoes(),
          fetchTrocas(),
          fetchOutros(),
          fetchResumo(),
          fetchInstalacoesHoje(),
          fetchManutencoesHoje(),
          fetchTrocasHoje(),
          fetchOutrosHoje(),
          fetchResumoHoje(),
          fetchDadosBairros(),
          ordensservico3(),
          fetchDadosAmanha1(),
          fetchDadosAmanha2(),
          fetchDadosAmanha3(),
          fetchDadosAmanha4(),
          fetchDadosAmanha5(),
          fetchDadosAmanha6(),
          fetchRecolhimentoHoje(),
          fetchDadosCidades(),
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados mensais:", error);
      }
    };

    // Executa imediatamente ao montar
    buscarTodos();
    buscarOrdens();

    // Atualiza a cada 1 segundo
    const intervalId = setInterval(buscarTodos, 1000);

    // Cleanup no desmontar
    return () => clearInterval(intervalId);
  }, []);

  const exportarCSV = () => {
    if (!dadosClientesCompleto.length) return;

    const headers = [
      "ID OS",
      "ID CLIENTE",
      "NOME DO CLIENTE",
      "SERVIÇO",
      "VALOR PLANO",
      "CPF / CNPJ",
      "BAIRRO",
      "CIDADE",
      "CEP", // 👈 NOVO
      "RUA", // 👈 NOVO
      "NÚMERO", // 👈 NOVO
      "DATA CADASTRO",
      "STATUS",
    ];

    const csvRows = [
      headers.join(";"),
      ...dadosClientesCompleto.map((cliente) => {
        const row = [
          cliente.id_ordem_servico,
          cliente.id_cliente_servico,
          cliente.cliente_nome,
          cliente.descricao_servico,
          cliente.valor,
          cliente.tipo_pessoa === "pf" ? "CPF" : "CNPJ",
          cliente.bairro_cliente,
          cliente.cidade_nome,
          cliente.cep_cliente || "-", // 👈 NOVO
          cliente.rua_cliente || "-", // 👈 NOVO
          cliente.numero_cliente || "-", // 👈 NOVO
          new Date(cliente.data_cadastro).toLocaleDateString(),
          cliente.status,
        ];
        return row.map((item) => `"${item}"`).join(";");
      }),
    ];

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "dados_clientes_completo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFiltro = (value) => {
    setTipoSelecionado(value);
  };

  return (
    <div>
      <div className="head-gerencial-body-geral">
        <div className="div-logo-operacional">
          <img
            className="logo-head-gerencial-body-operacional"
            src={logobranca}
          />
        </div>

        <h1 className="h2-head-gerencial-body-operacional">
          <h1 className="amarelo-h2-head-gerencial-body">C</h1>ENTRO DE{" "}
          <h1 className="amarelo-h2-head-gerencial-body"> C</h1>ONTROLE DE{" "}
          <h1 className="amarelo-h2-head-gerencial-body"> O</h1>PERAÇÃO
        </h1>

        <h1 className="h2-head-gerencial-body-invisivel">Geral</h1>
      </div>

      <div style={{ width: "100%", backgroundColor: "black", height: 40 }}>
        .
      </div>

      <div className="row-div-gerencial-geral">
        <div className="div-card1-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">BACKLOG TOTAL</h1>
          <h1 className="h2-card1-gerencial-geral">{totalResumoMes}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">{totalInstalacaoMes}</h1>
            </div>

            <div className="row-card1-gerencial-geral">
              <h1
                className="h3-card1-gerencial-geral"
                onClick={() => buscarOrdens("troca")}
              >
                TROCAS END.
              </h1>
              <h1 className="h4-card1-gerencial-geral">{totalTrocaEndMes}</h1>
            </div>

            <div className="row-card1-gerencial-geral">
              <h1
                className="h3-card1-gerencial-geral"
                onClick={() => buscarOrdens("manutencao")}
              >
                MANUTENÇÕES
              </h1>
              <h1 className="h4-card1-gerencial-geral">{totalManutencaoMes}</h1>
            </div>

            <div className="row-card1-gerencial-geral">
              <h1
                className="h3-card1-gerencial-geral"
                onClick={() => buscarOrdens("outros")}
              >
                OUTROS
              </h1>
              <h1 className="h4-card1-gerencial-geral">{totalOutrosMes}</h1>
            </div>

            <div className="row-card1-gerencial-geral">
              <h1
                className="h3-card1-gerencial-geral"
                onClick={() => buscarOrdens("recolhimento")}
              >
                RECOLHIMENTO
              </h1>
              <h1 className="h4-card1-gerencial-geral">
                {totalRecolhimentoMes}
              </h1>
            </div>
          </div>
        </div>

        <div className="div-card1-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">AGENDA DIA</h1>
          <h1 className="h2-card1-gerencial-geral">{totalResumoHoje}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao", "dia")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {totalInstalacaoHoje} |{" "}
                {totalInstalacaoMes > 0
                  ? `${Math.round(
                      (totalInstalacaoHoje / totalInstalacaoMes) * 100
                    )}%`
                  : "0%"}
              </h1>
            </div>

            <div className="row-card1-gerencial-geral">
              <h1
                className="h3-card1-gerencial-geral"
                onClick={() => buscarOrdens("troca", "dia")}
              >
                TROCAS END.
              </h1>
              <h1 className="h4-card1-gerencial-geral">
                {totalTrocaEndHoje} |{" "}
                {totalTrocaEndMes > 0
                  ? `${Math.round(
                      (totalTrocaEndHoje / totalTrocaEndMes) * 100
                    )}%`
                  : "0%"}
              </h1>
            </div>

            <div className="row-card1-gerencial-geral">
              <h1
                className="h3-card1-gerencial-geral"
                onClick={() => buscarOrdens("manutencao", "dia")}
              >
                MANUTENÇÕES
              </h1>
              <h1 className="h4-card1-gerencial-geral">
                {totalManutencaoHoje} |{" "}
                {totalManutencaoMes > 0
                  ? `${Math.round(
                      (totalManutencaoHoje / totalManutencaoMes) * 100
                    )}%`
                  : "0%"}
              </h1>
            </div>

            <div className="row-card1-gerencial-geral">
              <h1
                className="h3-card1-gerencial-geral"
                onClick={() => buscarOrdens("outros", "dia")}
              >
                OUTROS
              </h1>
              <h1 className="h4-card1-gerencial-geral">
                {totalOutrosHoje} |{" "}
                {totalOutrosMes > 0
                  ? `${Math.round((totalOutrosHoje / totalOutrosMes) * 100)}%`
                  : "0%"}
              </h1>
            </div>

            <div className="row-card1-gerencial-geral">
              <h1
                className="h3-card1-gerencial-geral"
                onClick={() => buscarOrdens("recolhimento", "dia")}
              >
                RECOLHIMENTO
              </h1>
              <h1 className="h4-card1-gerencial-geral">
                {totalRecolhimentoHoje} |{" "}
                {totalRecolhimentoMes > 0
                  ? `${Math.round(
                      (totalRecolhimentoHoje / totalRecolhimentoMes) * 100
                    )}%`
                  : "0%"}
              </h1>
            </div>
          </div>
        </div>

        <div className="div-card2-gerencial-geral">
          <h2 className="h1-card1-gerencial-geral">BACKLOG POR CIDADE</h2>
          <table style={{ marginTop: 20, width: "95%" }}>
            <thead style={{ width: "100%" }}>
              <tr className="row-card2-gerencial-geral">
                <th className="h5-card1-gerencial-geral">CIDADE</th>
                <th
                  className="h6-card1-gerencial-geral"
                  onClick={() =>
                    ordenarTabela(dadosTabelaCidade, "instalacoes")
                  }
                >
                  INSTALAÇÕES
                </th>
                <th
                  className="h6-card1-gerencial-geral"
                  onClick={() => ordenarTabela(dadosTabelaCidade, "manutencao")}
                >
                  MANUT.
                </th>
                <th
                  className="h6-card1-gerencial-geral"
                  onClick={() =>
                    ordenarTabela(dadosTabelaCidade, "trocaEndereco")
                  }
                >
                  TROCA END.
                </th>
                <th
                  className="h6-card1-gerencial-geral"
                  onClick={() => ordenarTabela(dadosTabelaCidade, "outros")}
                >
                  OUTROS
                </th>
                <th
                  className="h6-card1-gerencial-geral"
                  onClick={() =>
                    ordenarTabela(dadosTabelaCidade, "trocaEndereco")
                  }
                >
                  RECOLHIMENTO
                </th>
              </tr>
            </thead>
            <tbody>
              {dadosTabelaCidade.map((item, index) => (
                <tr
                  key={item.cidade}
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    height: 30,
                    borderTop: "1px solid white",
                    borderBottom: "1px solid white",
                  }}
                  className={index % 2 === 1 ? "bg-gray-800" : "bg-gray-600"}
                >
                  <td className="h7-card1-gerencial-geral">{item.cidade}</td>
                  <td
                    onClick={() => buscarOrdens("instalacao", "", item.cidade)}
                    className="h8-card1-gerencial-geral"
                  >
                    {item.instalacoes}
                  </td>
                  <td
                    onClick={() => buscarOrdens("manutencao", "", item.cidade)}
                    className="h8-card1-gerencial-geral"
                  >
                    {item.manutencao}
                  </td>
                  <td
                    onClick={() => buscarOrdens("troca", "", item.cidade)}
                    className="h8-card1-gerencial-geral"
                  >
                    {item.trocaEndereco}
                  </td>
                  <td
                    onClick={() => buscarOrdens("outro", "", item.cidade)}
                    className="h8-card1-gerencial-geral"
                  >
                    {item.outros}
                  </td>
                  <td
                    onClick={() =>
                      buscarOrdens("recolhimento", "", item.cidade)
                    }
                    className="h8-card1-gerencial-geral"
                  >
                    {item.recolhimentos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="div-card2-gerencial-geral">
          <h2 className="h1-card1-gerencial-geral">BACKLOG POR BAIRROS</h2>
          {/* Div com rolagem vertical */}
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              width: "95%",
              height: 260,
            }}
          >
            <table style={{ marginTop: 20, width: "95%" }}>
              <thead style={{ width: "100%" }}>
                <tr className="row-card2-gerencial-geral">
                  <th className="h5-card1-gerencial-geral">BAIRRO</th>
                  <th className="h6-card1-gerencial-geral">INSTALAÇÕES</th>
                  <th className="h6-card1-gerencial-geral">MANUT.</th>
                  <th className="h6-card1-gerencial-geral">TROCA END.</th>
                  <th className="h6-card1-gerencial-geral">OUTROS</th>
                  <th className="h6-card1-gerencial-geral">RECOLHIMENTO</th>
                </tr>
              </thead>
              <tbody>
                {dadosbairros.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderTop: "1px solid white",
                      borderBottom: "1px solid white",
                      height: 30,
                    }}
                    className={index % 2 === 1 ? "bg-gray-800" : "bg-gray-600"}
                  >
                    <td className="h7-card1-gerencial-geral">{item.bairros}</td>
                    <td
                      onClick={() =>
                        buscarOrdens("instalacao", "", "", item.bairros)
                      }
                      className="h8-card1-gerencial-geral"
                    >
                      {item.instalacoes}
                    </td>
                    <td
                      onClick={() =>
                        buscarOrdens("manutencao", "", "", item.bairros)
                      }
                      className="h8-card1-gerencial-geral"
                    >
                      {item.manutencao}
                    </td>
                    <td
                      onClick={() =>
                        buscarOrdens("troca", "", "", item.bairros)
                      }
                      className="h8-card1-gerencial-geral"
                    >
                      {item.trocaEndereco}
                    </td>
                    <td
                      onClick={() =>
                        buscarOrdens("outro", "", "", item.bairros)
                      }
                      className="h8-card1-gerencial-geral"
                    >
                      {item.outros}
                    </td>
                    <td
                      onClick={() =>
                        buscarOrdens("recolhimento", "", "", item.bairros)
                      }
                      className="h8-card1-gerencial-geral"
                    >
                      {item.recolhimentos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: 20,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div className="div-card4-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">D + 1</h1>
          <h1 className="h2-card1-gerencial-geral">{dados.total_geral}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao", "d1")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados.total_instalacoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("troca", "d1")}
            >
              <h1 className="h3-card1-gerencial-geral">TROCAS END.</h1>
              <h1 className="h4-card1-gerencial-geral">{dados.total_trocas}</h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("manutencao", "d1")}
            >
              <h1 className="h3-card1-gerencial-geral">MANUTENÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados.total_manutencoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("outro", "d1")}
            >
              <h1 className="h3-card1-gerencial-geral">OUTROS</h1>
              <h1 className="h4-card1-gerencial-geral">{dados.total_outros}</h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("recolhimento", "d1")}
            >
              <h1 className="h3-card1-gerencial-geral">RECOLHIMENTO</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados.total_recolhimentos}
              </h1>
            </div>
          </div>
        </div>

        <div className="div-card5-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">D + 2</h1>
          <h1 className="h2-card1-gerencial-geral">{dados2.total_geral}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao", "d2")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados2.total_instalacoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("troca", "d2")}
            >
              <h1 className="h3-card1-gerencial-geral">TROCAS END.</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados2.total_trocas}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("manutencao", "d2")}
            >
              <h1 className="h3-card1-gerencial-geral">MANUTENÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados2.total_manutencoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("outro", "d2")}
            >
              <h1 className="h3-card1-gerencial-geral">OUTROS</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados2.total_outros}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("recolhimento", "d2")}
            >
              <h1 className="h3-card1-gerencial-geral">RECOLHIMENTO</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados2.total_recolhimentos}
              </h1>
            </div>
          </div>
        </div>

        <div className="div-card6-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">D + 3</h1>
          <h1 className="h2-card1-gerencial-geral">{dados3.total_geral}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao", "d3")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados3.total_instalacoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("troca", "d3")}
            >
              <h1 className="h3-card1-gerencial-geral">TROCAS END.</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados3.total_trocas}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("manutencao", "d3")}
            >
              <h1 className="h3-card1-gerencial-geral">MANUTENÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados3.total_manutencoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("outro", "d3")}
            >
              <h1 className="h3-card1-gerencial-geral">OUTROS</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados3.total_outros}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("recolhimento", "d3")}
            >
              <h1 className="h3-card1-gerencial-geral">RECOLHIMENTO</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados3.total_recolhimentos}
              </h1>
            </div>
          </div>
        </div>

        <div className="div-card7-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">D + 4</h1>
          <h1 className="h2-card1-gerencial-geral">{dados4.total_geral}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao", "d4")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados4.total_instalacoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("troca", "d4")}
            >
              <h1 className="h3-card1-gerencial-geral">TROCAS END.</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados4.total_trocas}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("manutencao", "d4")}
            >
              <h1 className="h3-card1-gerencial-geral">MANUTENÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados4.total_manutencoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("outro", "d4")}
            >
              <h1 className="h3-card1-gerencial-geral">OUTROS</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados4.total_outros}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("recolhimento", "d4")}
            >
              <h1 className="h3-card1-gerencial-geral">RECOLHIMENTO</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados4.total_recolhimentos}
              </h1>
            </div>
          </div>
        </div>

        <div className="div-card8-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">D + 5</h1>
          <h1 className="h2-card1-gerencial-geral">{dados5.total_geral}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao", "d5")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados5.total_instalacoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("troca", "d5")}
            >
              <h1 className="h3-card1-gerencial-geral">TROCAS END.</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados5.total_trocas}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("manutencao", "d5")}
            >
              <h1 className="h3-card1-gerencial-geral">MANUTENÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados5.total_manutencoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("outro", "d5")}
            >
              <h1 className="h3-card1-gerencial-geral">OUTROS</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados5.total_outros}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("recolhimento", "d5")}
            >
              <h1 className="h3-card1-gerencial-geral">RECOLHIMENTO</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados5.total_recolhimentos}
              </h1>
            </div>
          </div>
        </div>

        <div className="div-card9-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">D + 6</h1>
          <h1 className="h2-card1-gerencial-geral">{dados6.total_geral}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao", "d6")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados6.total_instalacoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("troca", "d6")}
            >
              <h1 className="h3-card1-gerencial-geral">TROCAS END.</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados6.total_trocas}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("manutencao", "d6")}
            >
              <h1 className="h3-card1-gerencial-geral">MANUTENÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados6.total_manutencoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("outro", "d6")}
            >
              <h1 className="h3-card1-gerencial-geral">OUTROS</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados6.total_outros}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("recolhimento", "d6")}
            >
              <h1 className="h3-card1-gerencial-geral">RECOLHIMENTO</h1>
              <h1 className="h4-card1-gerencial-geral">
                {dados6.total_recolhimentos}
              </h1>
            </div>
          </div>
        </div>

        <div className="div-card10-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">SEM AGENDA</h1>
          <h1 className="h2-card1-gerencial-geral">{semAgenda.todos}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao", "d7")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {semAgenda.instalacoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("troca", "d7")}
            >
              <h1 className="h3-card1-gerencial-geral">TROCAS END.</h1>
              <h1 className="h4-card1-gerencial-geral">{semAgenda.trocas}</h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("manutencao", "d7")}
            >
              <h1 className="h3-card1-gerencial-geral">MANUTENÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">
                {semAgenda.manutencoes}
              </h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("outro", "d7")}
            >
              <h1 className="h3-card1-gerencial-geral">OUTROS</h1>
              <h1 className="h4-card1-gerencial-geral">{semAgenda.outros}</h1>
            </div>
          </div>
        </div>

        <div className="div-card3-gerencial-geral">
          <h1 className="h1-card1-gerencial-geral">VENCIDOS</h1>
          <h1 className="h2-card1-gerencial-geral">{totais.todos}</h1>

          <div className="div-card1-gerencial-geral1">
            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("instalacao", "inicio2017")}
            >
              <h1 className="h3-card1-gerencial-geral">INSTALAÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">{totais.instalacoes}</h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("troca", "inicio2017")}
            >
              <h1 className="h3-card1-gerencial-geral">TROCAS END.</h1>
              <h1 className="h4-card1-gerencial-geral">{totais.trocas}</h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("manutencao", "inicio2017")}
            >
              <h1 className="h3-card1-gerencial-geral">MANUTENÇÕES</h1>
              <h1 className="h4-card1-gerencial-geral">{totais.manutencoes}</h1>
            </div>

            <div
              className="row-card1-gerencial-geral"
              onClick={() => buscarOrdens("outros", "inicio2017")}
            >
              <h1 className="h3-card1-gerencial-geral">OUTROS</h1>
              <h1 className="h4-card1-gerencial-geral">{totais.outros}</h1>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "99%",
          justifyItems: "start",
          display: "flex",
          justifySelf: "center",
          marginTop: 20,
        }}
      >
        <div className="div-slas">
          <div className="sla-titulo">
            <div className="sla-titulo-texto">SLA MÉDIO</div>
            <div className="sla-titulo-subtexto">DIAS</div>
          </div>

          <div className="sla-categorias">
            <div className="sla-categoria">INSTALAÇÕES</div>
            <div className="sla-categoria">TROCAS END.</div>
            <div className="sla-categoria">MANUTENÇÕES</div>
            <div className="sla-categoria">OUTROS</div>
            <div className="sla-categoria">RECOLHIMENTO</div>
          </div>

          <div className="sla-valores">
            <div className="sla-valor">{sla.instalacoes}</div>
            <div className="sla-valor">{sla.trocas_endereco}</div>
            <div className="sla-valor">{sla.manutencoes}</div>
            <div className="sla-valor">{sla.outros}</div>
            <div className="sla-valor">{sla.recolhimentos}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: 20,
          display: "flex",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <button
          onClick={exportarCSV}
          style={{
            width: 150,
            marginRight: 10,
            backgroundColor: "#0B8634",
            borderRadius: 5,
            color: "white",
            fontWeight: "bold",
            border: "transparent",
            height: 35,
            cursor: "pointer",
          }}
        >
          EXPORTAR .CSV
        </button>
      </div>

      <div className="div-tabela-scroll">
        {loadingTabela ? (
          <div className="loader"></div>
        ) : (
          <table className="tabela-clientes">
            <thead>
              <tr>
                <th>ID OS</th>
                <th>ID CLIENTE</th>
                <th>NOME DO CLIENTE</th>
                <th>SERVIÇO</th>
                <th>VALOR PLANO</th>
                <th>CPF / CNPJ</th>
                <th>BAIRRO</th>
                <th>CIDADE</th>
                <th>CEP</th> {/* 👈 */}
                <th>RUA</th> {/* 👈 NOVA COLUNA */}
                <th>NÚMERO</th> {/* 👈 NOVA COLUNA */}
                <th>DATA CADASTRO</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {dadosClientesCompleto.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.id_ordem_servico}</td>
                  <td>{cliente.id_cliente_servico}</td>
                  <td>{cliente.cliente_nome}</td>
                  <td>{cliente.descricao_servico}</td>
                  <td>{cliente.valor}</td>
                  <td>{cliente.tipo_pessoa === "pf" ? "CPF" : "CNPJ"}</td>
                  <td>{cliente.bairro_cliente}</td>
                  <td>{cliente.cidade_nome}</td>
                  <td>{cliente.cep_cliente || "-"}</td> {/* 👈 */}
                  <td>{cliente.rua_cliente || "-"}</td> {/* 👈 NOVO CAMPO */}
                  <td>{cliente.numero_cliente || "-"}</td> {/* 👈 NOVO CAMPO */}
                  <td>
                    {new Date(cliente.data_cadastro).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="div-tabela-scroll">
        {loadingTabela ? (
          <div className="loader"></div>
        ) : (
          <table className="tabela-clientes">
            <thead>
              <tr>
                <th>ID OS</th>
                <th>NOME DO CLIENTE</th>
                <th>CIDADE</th>
                <th>
                  <select
                    value={tipoSelecionado}
                    onChange={(e) => handleFiltro(e.target.value)}
                    style={{
                      padding: "4px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">TIPO DE O.S</option>
                    <option value="instalacao">Instalação</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="troca">Troca</option>
                    <option value="recolhimento">Recolhimento</option>
                    <option value="outro">Outros</option>
                  </select>
                  <div style={{ marginBottom: "10px" }}>
                    <button
                      onClick={() => handleFiltro("")}
                      style={{
                        padding: "6px 12px",
                        background: "#cd7f32",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        marginTop: "2px",
                      }}
                    >
                      Limpar filtro
                    </button>
                  </div>
                </th>
                <th>VALOR DO PLANO</th>
                <th>AGING (dias)</th>
              </tr>
            </thead>
            <tbody>
              {itensPagina.map((cliente, index) => {
                const valorFormatado = new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(cliente.valor) || 0);

                return (
                  <tr key={index}>
                    <td>{cliente.id_ordem_servico}</td>
                    <td>{cliente.cliente_nome}</td>
                    <td>{cliente.cidade_nome}</td>
                    <td>{cliente.tipo_ordem}</td>
                    <td>{valorFormatado}</td>
                    <td>{cliente.dias_aberto ?? "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button onClick={() => irParaPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
            {"<"} Anterior
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => irParaPagina(i + 1)}
              style={{
                fontWeight: paginaAtual === i + 1 ? "bold" : "normal",
                margin: "0 2px",
              }}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => irParaPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
            Próximo {">"}
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardOperacionalGerencial;
