import React, { useEffect, useState } from 'react'

import '../CSS/DashboardOperacionalFibraGerencial.css'
import logobranca from '../Images/logobrnaca.png'

function DashboardFibraGerencial() {
          const [totalManutencaoMes, setTotalManutencaoMes] = useState(0);
      const [totalInstalacaoMes, setTotalInstalacaoMes] = useState(0);
      const [totalRecolhimentoMes, setTotalRecolhimentoMes] = useState(0);
            const [totalTrocaEndMes, setTotalTrocaEndMes] = useState(0);
            const [totalOutrosMes, setTotalOutrosMes]  = useState(0);
               const [totalResumoMes, setTotalResumoMes]  = useState(0);
               const [totalInstalacaoHoje, setTotalInstalacaoHoje] = useState(0);
                const [totalRecolhimentoHoje, setTotalRecolhimentoHoje] = useState(0);
const [totalManutencaoHoje, setTotalManutencaoHoje] = useState(0);
const [totalTrocaEndHoje, setTotalTrocaEndHoje] = useState(0);
const [totalOutrosHoje, setTotalOutrosHoje] = useState(0);
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
                            // ---- HOJE ----
const [totalResumoHoje, setTotalResumoHoje] = useState(0);
const [totalAdaptacaoHoje, setTotalAdaptacaoHoje] = useState(0);
const [totalFibraExpHoje, setTotalFibraExpHoje] = useState(0);
const [totalFibraConstrHoje, setTotalFibraConstrHoje] = useState(0);
const [totalTrocaPosteHoje, setTotalTrocaPosteHoje] = useState(0);
const [totalRompHoje, setTotalRompHoje] = useState(0);
const [totalManutHoje, setTotalManutHoje] = useState(0);
const [totalAdaptacaoMes, setTotalAdaptacaoMes] = useState(0);
const [totalFibraExpMes, setTotalFibraExpMes] = useState(0);
const [totalFibraConstrMes, setTotalFibraConstrMes] = useState(0);
const [totalTrocaPosteMes, setTotalTrocaPosteMes] = useState(0);
const [totalRompMes, setTotalRompMes] = useState(0);
const [totalManutMes, setTotalManutMes] = useState(0);

// TOTAIS
const [totalFibraMes, setTotalFibraMes] = useState(0);


const [dadosBrutos, setDadosBrutos] = useState([]);
const [dadosOrdenados, setDadosOrdenados] = useState([]);
const [ordemColuna, setOrdemColuna] = useState({ coluna: null, direcao: 'asc' });


const ordenarTabela = (dados, coluna, direcaoAtual = 'asc') => {
  const novaDirecao = ordemColuna.coluna === coluna && ordemColuna.direcao === 'asc' ? 'desc' : 'asc';

  const ordenados = [...dados].sort((a, b) => {
    const valorA = a[coluna] ?? 0;
    const valorB = b[coluna] ?? 0;
    return novaDirecao === 'asc' ? valorA - valorB : valorB - valorA;
  });

  const comRanking = ordenados.map((item, index) => ({
    ...item,
    ranking: index + 1
  }));

  setDadosTabelaCidade(comRanking);
  setOrdemColuna({ coluna, direcao: novaDirecao });
};

     const [totais, setTotais] = useState({
  adaptacao_predio_condominio: 0,
  fibra_expansao: 0,
  fibra_construcao_rede_optica: 0,
  troca_de_poste: 0,
  fibra_rompimento_rede_optica: 0,
  fibra_manutencao_rede_optica: 0,
  fibra_total: 0,
  todos: 0,
});



    const [semAgenda, setSemAgenda] = useState({
  // novas chaves
  adaptacao_predio_condominio: 0,
  fibra_expansao: 0,
  fibra_construcao_rede_optica: 0,
  troca_de_poste: 0,
  fibra_rompimento_rede_optica: 0,
  fibra_manutencao_rede_optica: 0,
  fibra_total: 0,
  todos: 0,

  // compatibilidade (UI antiga)
  instalacoes: 0,
  manutencoes: 0,
  trocas: 0,
  outros: 0,
  total_geral: 0,
});



      const [sla, setSla] = useState({
    instalacoes: null,
    trocas_endereco: null,
    manutencoes: null,
    outros: null
  });

  const [dadosOriginais, setDadosOriginais] = useState([]);
const [ordemCrescente, setOrdemCrescente] = useState(true);



  useEffect(() => {
    const fetchSla = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/sla-os-categorias-30-dias1');
        const data = await res.json();

        if (data.sla_medio_dias) {
          setSla(data.sla_medio_dias);
        }
      } catch (error) {
        console.error('Erro ao buscar SLA médio:', error);
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
    const response = await fetch('/ordens-servico-pendente-total-mes', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    const adapt = Number(data.total_adaptacao_predio_condominio) || 0;
    const exp   = Number(data.total_fibra_expansao)               || 0;
    const cons  = Number(data.total_fibra_construcao_rede_optica) || 0;
    const poste = Number(data.total_troca_de_poste)               || 0;
    const romp  = Number(data.total_fibra_rompimento_rede_optica) || 0;
    const manut = Number(data.total_fibra_manutencao_rede_optica) || 0;

    const fibra_total = Number(data.total_fibra) || (exp + cons + romp + manut);
    const todos       = Number(data.total_geral) || (adapt + poste + fibra_total);

    setTotais({
      adaptacao_predio_condominio:  adapt,
      fibra_expansao:               exp,
      fibra_construcao_rede_optica: cons,
      troca_de_poste:               poste,
      fibra_rompimento_rede_optica: romp,
      fibra_manutencao_rede_optica: manut,
      fibra_total,
      todos,
    });
  } catch (error) {
    console.error('Erro ao buscar totais vencidos:', error);
  }
};


    buscarTotais();


    const interval = setInterval(buscarTotais, 60000); // Atualiza a cada 60s

    return () => clearInterval(interval); // Evita vazamento de memória
  }, []);

  const [dadosClientesCompleto, setDadosClientesCompleto] = useState([]);

const buscarOrdens = async (tipo = "", escopo = "", cidade = "", bairro = "") => {
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
    0, 1, 0 // 00:01:00
  );

  // Fim: hoje às 23:59
  const fim = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
    23, 59, 59 // 23:59:59
  );

  // Para uso em URLs ou body de requisição
  const format = (date) => date.toISOString().slice(0, 19).replace('T', ' ');

  params.append("inicio", format(inicio)); // Ex: 2025-09-08 00:01:00
  params.append("fim", format(fim));       // Ex: 2025-09-09 23:59:59
}


if (escopo === "d1") {
  const data = new Date();
  data.setDate(data.getDate() + 1); // amanhã

  params.append("inicio", data.toISOString().split("T")[0]);
  params.append("fim", data.toISOString().split("T")[0]);
}


if (escopo === "d2") {
  const data = new Date();
  data.setDate(data.getDate() + 2); // D+2

  params.append("inicio", data.toISOString().split("T")[0]);
  params.append("fim", data.toISOString().split("T")[0]);
}


if (escopo === "d3") {
  const data = new Date();
  data.setDate(data.getDate() + 3); // D+3

  params.append("inicio", data.toISOString().split("T")[0]);
  params.append("fim", data.toISOString().split("T")[0]);
}


if (escopo === "d4") {
  const data = new Date();
  data.setDate(data.getDate() + 4); // D+4

  params.append("inicio", data.toISOString().split("T")[0]);
  params.append("fim", data.toISOString().split("T")[0]);
}


if (escopo === "d5") {
  const data = new Date();
  data.setDate(data.getDate() + 5); // D+5

  params.append("inicio", data.toISOString().split("T")[0]);
  params.append("fim", data.toISOString().split("T")[0]);
}


if (escopo === "d6") {
  const dataInicio = new Date();
  dataInicio.setDate(dataInicio.getDate() + 6); // D+6

  const dataFim = new Date("2030-12-31"); // data fim arbitrária no futuro

  params.append("inicio", dataInicio.toISOString().split("T")[0]);
  params.append("fim", dataFim.toISOString().split("T")[0]);
}

  if (escopo === "d7") {
 
  params.append("status", "aguardando_agendamento");
}


  const url = `http://38.224.145.3:3010/ordens-servico-categorias-completo-mes1?${params.toString()}`;
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
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-do-mes-por-cidade1', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ao buscar dados por cidade`);

    const data = await res.json();

    const transformado = (data?.total_por_cidade ?? [])
      .map((row) => {
        const tot_adapt = Number(row.total_adaptacao_predio_condominio) || 0;
        const tot_exp   = Number(row.total_fibra_expansao)               || 0;
        const tot_cons  = Number(row.total_fibra_construcao_rede_optica) || 0;
        const tot_poste = Number(row.total_troca_de_poste)               || 0;
        const tot_romp  = Number(row.total_fibra_rompimento_rede_optica) || 0;
        const tot_manut = Number(row.total_fibra_manutencao_rede_optica) || 0;

        const total_fibra = Number(row.total_fibra) || (tot_exp + tot_cons + tot_romp + tot_manut);
        const total_geral = Number(row.total_geral) || (tot_adapt + total_fibra + tot_poste);

        return {
          cidade: row.cidade || 'Não informado',

          // campos novos (usados na UI atualizada)
          total_adaptacao_predio_condominio:  tot_adapt,
          total_fibra_expansao:               tot_exp,
          total_fibra_construcao_rede_optica: tot_cons,
          total_troca_de_poste:               tot_poste,
          total_fibra_rompimento_rede_optica: tot_romp,
          total_fibra_manutencao_rede_optica: tot_manut,
          total_fibra,
          total_geral,

          // compat com UI antiga (fallbacks)
          instalacoes:   tot_adapt,
          manutencao:    tot_manut,
          trocaEndereco: tot_poste,
          recolhimentos: 0, // não existe nas novas siglas
          outros:        0, // não existe nas novas siglas
          total:         total_geral,
        };
      })
      .sort((a, b) => b.total_geral - a.total_geral); // maior → menor

    setDadosOriginais(transformado);
    setDadosTabelaCidade(transformado);
  } catch (error) {
    console.error('Erro ao carregar cidades:', error);
  }
};



   const ordensservico3 = async () => {
    try {
      fetch('http://38.224.145.3:3010/ordens-servico-aguardando-agendamento1')
      .then(res => res.json())
      .then(data => {
        setSemAgenda(data.totais);
      })
      .catch(err => {
        console.error('Erro ao buscar ordens sem agendamento:', err);
      });
    }catch (error) {
        console.error('Erro ao carregar dados D+1:', error);

  }}


     const fetchDadosAmanha1 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha11');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


      const fetchDadosAmanha2 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha21');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados2(data);
        console.log(data)
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };

      const fetchDadosAmanha3 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha31');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados3(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


         const fetchDadosAmanha4 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha41');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados4(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


    const fetchDadosAmanha5 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha51');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados5(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


       const fetchDadosAmanha6 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha61');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados6(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


  const fetchInstalacoes = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-adaptacao-do-mes1');
    if (!res.ok) throw new Error('Erro ao buscar instalações');
    const data = await res.json();
    setTotalAdaptacaoMes(data.total_ordens_pendentes_aguardando_recolhimento || 0);
  };

    const fetchRecolhimento = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-expansao-do-mes1');
    if (!res.ok) throw new Error('Erro ao buscar instalações');
    const data = await res.json();
    setTotalFibraExpMes(data.total_ordens_pendentes_aguardando_recolhimento || 0);
  };

    const fetchRecolhimentoHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-recolhimento-hoje1');
    if (!res.ok) throw new Error('Erro ao buscar instalações');
    const data = await res.json();
    setTotalRecolhimentoHoje(data.total_ordens_pendentes_aguardando_recolhimento || 0);
  };


  const fetchManutencoes = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-construcao-do-mes1');
    if (!res.ok) throw new Error('Erro ao buscar manutenções');
    const data = await res.json();
    setTotalFibraConstrMes(data.total_ordens_pendentes_aguardando_recolhimento || 0);
  };

  const fetchTrocas = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-rompimento-do-mes1');
    if (!res.ok) throw new Error('Erro ao buscar trocas');
    const data = await res.json();
    setTotalRompMes(data.total_ordens_pendentes_aguardando_recolhimento || 0);
  };

  const fetchOutros = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-trocadeposte-do-mes1');
    if (!res.ok) throw new Error('Erro ao buscar outros motivos');
    const data = await res.json();
    setTotalTrocaPosteMes(data.total_ordens_pendentes_aguardando_recolhimento || 0);
  };

 const fetchManutencao = async () => {
  const res = await fetch('http://38.224.145.3:3010/ordens-servico-manutencao-do-mes1');
  if (!res.ok) throw new Error('Erro');
  const data = await res.json();
  setTotalManutMes(data.total_ordens_pendentes_aguardando_recolhimento)
 }

  const fetchResumo = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-do-mes1');
    if (!res.ok) throw new Error('Erro ao buscar resumo mensal');
    const data = await res.json();
    setTotalResumoMes(data);
  };


const fetchAdaptacaoHoje = async () => {
  const res = await fetch('http://38.224.145.3:3010/ordens-servico-adaptacao-hoje1');
  if (!res.ok) throw new Error('Erro ao buscar instalações de hoje');
  const data = await res.json();

  // Correção aqui:
  const total = data.total_ordens_pendentes_aguardando_instalacao || 0;
  setTotalAdaptacaoHoje(Number(total));
};

  const fetchManutencoesHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-manutencao-hoje1');
    if (!res.ok) throw new Error('Erro ao buscar manutenções de hoje');
    const data = await res.json();
    setTotalManutencaoHoje(data.total_ordens_pendentes_aguardando_manutencao || 0);
  };

  const fetchTrocasHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-trocadeposte-hoje1');
    if (!res.ok) throw new Error('Erro ao buscar trocas de endereço de hoje');
    const data = await res.json();
    setTotalTrocaEndHoje(data.total_ordens_pendentes_aguardando_troca_endereco || 0);
  };

    const fetchRompHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-rompimento-hoje1');
    if (!res.ok) throw new Error('Erro ao buscar trocas de endereço de hoje');
    const data = await res.json();
    setTotalRompHoje(data.total_rompimento_hoje || 0);
  };

  const fetchOutrosHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-construcao-hoje1');
    if (!res.ok) throw new Error('Erro ao buscar ordens de outros motivos de hoje');
    const data = await res.json();
    setTotalFibraConstrHoje(data.total_construcao_hoje || 0);
  };

   const fetchExpHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-expansao-hoje1');
    if (!res.ok) throw new Error('Erro ao buscar ordens de outros motivos de hoje');
    const data = await res.json();
    setTotalFibraExpHoje(data.total_ordens_pendentes_aguardando_outros || 0);
  };


  const fetchResumoHoje = async () => {
  const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-hoje1');
  if (!res.ok) throw new Error('Erro ao buscar resumo de hoje');
  const data = await res.json();
  setTotalResumoHoje(data);
};




 const fetchDadosBairros = async () => {
  try {
    // use URL relativa para bater no mesmo host/porta do front
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-do-mes-por-bairro1', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ao buscar dados por bairro`);

    const data = await res.json();

    const transformado = (data?.total_por_bairro ?? [])
      .map(row => {
        const tot_adapt = Number(row.total_adaptacao_predio_condominio) || 0;
        const tot_exp   = Number(row.total_fibra_expansao)               || 0;
        const tot_cons  = Number(row.total_fibra_construcao_rede_optica) || 0;
        const tot_poste = Number(row.total_troca_de_poste)               || 0;
        const tot_romp  = Number(row.total_fibra_rompimento_rede_optica) || 0;
        const tot_manut = Number(row.total_fibra_manutencao_rede_optica) || 0;

        const total_fibra = Number(row.total_fibra) || (tot_exp + tot_cons + tot_romp + tot_manut);
        const total_geral = Number(row.total_geral) || (tot_adapt + total_fibra + tot_poste);

        return {
          // manter ambos para compat com telas antigas
          bairro: row.bairro || 'Não informado',
          bairros: row.bairro || 'Não informado',

          total_adaptacao_predio_condominio:  tot_adapt,
          total_fibra_expansao:               tot_exp,
          total_fibra_construcao_rede_optica: tot_cons,
          total_troca_de_poste:               tot_poste,
          total_fibra_rompimento_rede_optica: tot_romp,
          total_fibra_manutencao_rede_optica: tot_manut,

          total_fibra,
          total_geral,
        };
      })
      .sort((a, b) => b.total_geral - a.total_geral); // maior → menor

    setDadosBairros(transformado);
  } catch (error) {
    console.error('Erro ao carregar bairros:', error);
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
        fetchAdaptacaoHoje(),
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
        fetchManutencao(),
        fetchRompHoje(),
        fetchExpHoje()
      
      ]);
    } catch (error) {
      console.error('Erro ao buscar dados mensais:', error);
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
    "ID OS", "ID CLIENTE", "NOME DO CLIENTE", "SERVIÇO", "VALOR PLANO",
    "CPF / CNPJ", "BAIRRO", "CIDADE", "DATA CADASTRO",
    "DATA PEDIDO PROVISIONADO", "HORA PEDIDO PROVISIONADO",
    "JOTAS", "MAC/ONU", "TIPO CDO", "STATUS", "LOCALIZAÇÃO INSTALADOR"
  ];

  const csvRows = [
    headers.join(";"),
    ...dadosClientesCompleto.map(cliente => {
      const row = [
        cliente.id_ordem_servico,
        cliente.id_cliente_servico,
        cliente.cliente_nome,
        cliente.descricao_servico,
        cliente.valor,
        cliente.tipo_pessoa === "pf" ? "CPF" : "CNPJ",
        cliente.bairro_cliente,
        cliente.cidade_nome,
        new Date(cliente.data_cadastro).toLocaleDateString(),
        new Date(cliente.data_inicio_programado).toLocaleDateString(),
        new Date(cliente.data_inicio_programado).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cliente.jotas || "-",
        cliente.macOnu || "-",
        cliente.tipoCdo || "-",
        cliente.status,
        cliente.tipo_ordem || "-",
        cliente.instalador || "-"
      ];
      return row.map(item => `"${item}"`).join(";");
    })
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "dados_clientes_completo.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  return (
    <div>

              <div className='head-gerencial-body-geral'>

                <div className='div-logo-operacional1'>
                           <img  className='logo-head-gerencial-body-operacional' src={logobranca}/>

                    </div>

                    <h1  className='h2-head-gerencial-body-operacional1'>Dashboard Fibra</h1>

                   <h1 style={{color: 'black', width: '30%'}}>.</h1>
                   
                </div>

                <div style={{width: '100%', backgroundColor: 'black', height: 40}}>
                    .
                </div>

            <div className='row-div-gerencial-geral'>

                  <div className='div-card1-gerencial-geral'>
  <h1 className='h1-card1-gerencial-geral'>BACKLOG TOTAL</h1>
  <h1 className='h2-card1-gerencial-geral'>{totalResumoMes.total_geral}</h1>

  <div className='div-card1-gerencial-geral1'>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao')}>
      <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
      <h1 className='h4-card1-gerencial-geral'>{totalResumoMes.total_adaptacao_predio_condominio}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
      <h1 className='h4-card1-gerencial-geral'>{totalResumoMes.total_fibra_expansao}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
      <h1 className='h4-card1-gerencial-geral'>{totalResumoMes.total_fibra_construcao_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste')}>
      <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
      <h1 className='h4-card1-gerencial-geral'>{totalResumoMes.total_troca_de_poste}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento')}>
      <h1 className='h3-card1-gerencial-geral'>ROMPIMENTO</h1>
      <h1 className='h4-card1-gerencial-geral'>{totalResumoMes.total_fibra_rompimento_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao')}>
      <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
      <h1 className='h4-card1-gerencial-geral'>{totalResumoMes.total_fibra_manutencao_rede_optica}</h1>
    </div>

  </div>
</div>



                               <div className='div-card1-gerencial-geral'>
  <h1 className='h1-card1-gerencial-geral'>AGENDA DIA</h1>
  <h1 className='h2-card1-gerencial-geral'>{totalResumoHoje.total_geral}</h1>

  <div className='div-card1-gerencial-geral1'>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao', 'dia')}>
      <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
      <h1 className='h4-card1-gerencial-geral'>
        {totalResumoHoje.total_adaptacao_predio_condominio} | {totalResumoMes.total_adaptacao_predio_condominio > 0 ? `${Math.round((totalResumoHoje.total_adaptacao_predio_condominio / totalResumoMes.total_adaptacao_predio_condominio) * 100)}%` : '0%'}
      </h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao', 'dia')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
      <h1 className='h4-card1-gerencial-geral'>
        {totalResumoHoje.total_fibra_expansao} | {totalResumoMes.total_fibra_expansao > 0 ? `${Math.round((totalResumoHoje.total_fibra_expansao / totalResumoMes.total_fibra_expansao) * 100)}%` : '0%'}
      </h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao', 'dia')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
      <h1 className='h4-card1-gerencial-geral'>
        {totalResumoHoje.total_fibra_construcao_rede_optica} | {totalResumoMes.total_fibra_construcao_rede_optica > 0 ? `${Math.round((totalResumoHoje.total_fibra_construcao_rede_optica / totalResumoMes.total_fibra_construcao_rede_optica) * 100)}%` : '0%'}
      </h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste', 'dia')}>
      <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
      <h1 className='h4-card1-gerencial-geral'>
        {totalResumoHoje.total_troca_de_poste} | {totalResumoMes.total_troca_de_poste > 0 ? `${Math.round((totalResumoHoje.total_troca_de_poste / totalResumoMes.total_troca_de_poste) * 100)}%` : '0%'}
      </h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento', 'dia')}>
      <h1 className='h3-card1-gerencial-geral'>ROMPIMENTO</h1>
      <h1 className='h4-card1-gerencial-geral'>
        {totalResumoHoje.total_fibra_rompimento_rede_optica} | {totalResumoMes.total_fibra_rompimento_rede_optica > 0 ? `${Math.round((totalResumoHoje.total_fibra_rompimento_rede_optica / totalResumoMes.total_fibra_rompimento_rede_optica) * 100)}%` : '0%'}
      </h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao', 'dia')}>
      <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
      <h1 className='h4-card1-gerencial-geral'>
        {totalResumoHoje.total_fibra_manutencao_rede_optica} | {totalResumoMes.total_fibra_manutencao_rede_optica > 0 ? `${Math.round((totalResumoHoje.total_fibra_manutencao_rede_optica / totalResumoMes.total_fibra_manutencao_rede_optica) * 100)}%` : '0%'}
      </h1>
    </div>

  </div>
</div>



           <div className="div-card2-gerencial-geral">
  <h2 className="h1-card1-gerencial-geral">BACKLOG POR CIDADE</h2>
  <table style={{ marginTop: 20, width: '95%' }}>
    <thead style={{ width: '100%' }}>
      <tr className="row-card2-gerencial-geral">
        <th className="h5-card1-gerencial-geral">CIDADE</th>

        <th
          className="h6-card1-gerencial-geral"
          onClick={() => ordenarTabela(dadosTabelaCidade, 'total_adaptacao_predio_condominio')}
        >
          ADAP.
        </th>

        <th
          className="h6-card1-gerencial-geral"
          onClick={() => ordenarTabela(dadosTabelaCidade, 'total_fibra_expansao')}
        >
          FIBRA EXP.
        </th>

        <th
          className="h6-card1-gerencial-geral"
          onClick={() => ordenarTabela(dadosTabelaCidade, 'total_fibra_construcao_rede_optica')}
        >
          FIBRA CONST.
        </th>

        <th
          className="h6-card1-gerencial-geral"
          onClick={() => ordenarTabela(dadosTabelaCidade, 'total_troca_de_poste')}
        >
          TROCA POSTE
        </th>

        <th
          className="h6-card1-gerencial-geral"
          onClick={() => ordenarTabela(dadosTabelaCidade, 'total_fibra_rompimento_rede_optica')}
        >
          ROMP.
        </th>

        <th
          className="h6-card1-gerencial-geral"
          onClick={() => ordenarTabela(dadosTabelaCidade, 'total_fibra_manutencao_rede_optica')}
        >
          MANUT.
        </th>
      </tr>
    </thead>

    <tbody>
      {dadosTabelaCidade.map((item, index) => (
        <tr
          key={item.cidade ?? index}
          style={{
            flexDirection: 'row',
            display: 'flex',
            height: 30,
            borderTop: '1px solid white',
            borderBottom: '1px solid white'
          }}
          className={index % 2 === 1 ? 'bg-gray-800' : 'bg-gray-600'}
        >
          <td className="h7-card1-gerencial-geral">{item.cidade}</td>

          <td
            onClick={() => buscarOrdens('adaptacao', '', item.cidade)}
            className="h8-card1-gerencial-geral"
          >
            {item.total_adaptacao_predio_condominio ?? item.instalacoes ?? 0}
          </td>

          <td
            onClick={() => buscarOrdens('fibra_expansao', '', item.cidade)}
            className="h8-card1-gerencial-geral"
          >
            {item.total_fibra_expansao ?? 0}
          </td>

          <td
            onClick={() => buscarOrdens('fibra_construcao', '', item.cidade)}
            className="h8-card1-gerencial-geral"
          >
            {item.total_fibra_construcao_rede_optica ?? 0}
          </td>

          <td
            onClick={() => buscarOrdens('troca_de_poste', '', item.cidade)}
            className="h8-card1-gerencial-geral"
          >
            {item.total_troca_de_poste ?? item.trocaEndereco ?? 0}
          </td>

          <td
            onClick={() => buscarOrdens('fibra_rompimento', '', item.cidade)}
            className="h8-card1-gerencial-geral"
          >
            {item.total_fibra_rompimento_rede_optica ?? 0}
          </td>

          <td
            onClick={() => buscarOrdens('fibra_manutencao', '', item.cidade)}
            className="h8-card1-gerencial-geral"
          >
            {item.total_fibra_manutencao_rede_optica ?? item.manutencao ?? 0}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



<div className="div-card2-gerencial-geral">


 <h2 className="h1-card1-gerencial-geral">BACKLOG POR BAIRROS</h2>
<div style={{ maxHeight: '400px', overflowY: 'auto', width: '95%', height: 260 }}>
     
  <table style={{ marginTop: 20, width: '95%' }}>
    <thead style={{ width: '100%' }}>
      <tr className="row-card2-gerencial-geral">
        <th className="h5-card1-gerencial-geral">BAIRRO</th>
        <th className="h6-card1-gerencial-geral">ADAP.</th>
        <th className="h6-card1-gerencial-geral">FIBRA EXP.</th>
        <th className="h6-card1-gerencial-geral">FIBRA CONST.</th>
        <th className="h6-card1-gerencial-geral">TROCA POSTE</th>
        <th className="h6-card1-gerencial-geral">ROMP.</th>
        <th className="h6-card1-gerencial-geral">MANUT.</th>
      </tr>
    </thead>
    <tbody>
      {dadosbairros.map((item, index) => {
        const bairro = item.bairro ?? item.bairros; // compat
        return (
          <tr
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderTop: '1px solid white',
              borderBottom: '1px solid white',
              height: 30
            }}
            className={index % 2 === 1 ? 'bg-gray-800' : 'bg-gray-600'}
          >
            <td className="h7-card1-gerencial-geral">{bairro}</td>

            <td
              onClick={() => buscarOrdens('adaptacao', '', '', bairro)}
              className="h8-card1-gerencial-geral"
            >
              {item.total_adaptacao_predio_condominio ?? 0}
            </td>

            <td
              onClick={() => buscarOrdens('fibra_expansao', '', '', bairro)}
              className="h8-card1-gerencial-geral"
            >
              {item.total_fibra_expansao ?? 0}
            </td>

            <td
              onClick={() => buscarOrdens('fibra_construcao', '', '', bairro)}
              className="h8-card1-gerencial-geral"
            >
              {item.total_fibra_construcao_rede_optica ?? 0}
            </td>

            <td
              onClick={() => buscarOrdens('troca_de_poste', '', '', bairro)}
              className="h8-card1-gerencial-geral"
            >
              {item.total_troca_de_poste ?? 0}
            </td>

            <td
              onClick={() => buscarOrdens('fibra_rompimento', '', '', bairro)}
              className="h8-card1-gerencial-geral"
            >
              {item.total_fibra_rompimento_rede_optica ?? 0}
            </td>

            <td
              onClick={() => buscarOrdens('fibra_manutencao', '', '', bairro)}
              className="h8-card1-gerencial-geral"
            >
              {item.total_fibra_manutencao_rede_optica ?? 0}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

</div>



           

            </div>    


            <div style={{ width: '100%', marginTop: 20, display: 'flex', justifyContent: 'space-around'}}>


                    <div className='div-card4-gerencial-geral'>
      <h1 className='h1-card1-gerencial-geral'>D + 1</h1>
      <h1 className='h2-card1-gerencial-geral'>{dados.total_geral}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao', 'd1')}>
          <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_adaptacao_predio_condominio}</h1>
        </div>

        <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao', 'd1')}>
          <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_fibra_expansao}</h1>
        </div>  

            <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao', 'd1')}>
          <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_fibra_construcao_rede_optica}</h1>
        </div>

        <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste', 'd1')}>
          <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_troca_de_poste}</h1>
        </div>  

         <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento', 'd1')}>
          <h1 className='h3-card1-gerencial-geral' >ROMPIMENTO</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_fibra_rompimento_rede_optica}</h1>
        </div>

         <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao', 'd1')}>
          <h1 className='h3-card1-gerencial-geral' >MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_fibra_manutencao_rede_optica}</h1>
        </div>

      </div>
    </div>


                  <div className='div-card5-gerencial-geral'>
  <h1 className='h1-card1-gerencial-geral'>D + 2</h1>
  <h1 className='h2-card1-gerencial-geral'>{dados2.total_geral}</h1>

  <div className='div-card1-gerencial-geral1'>
    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao', 'd2')}>
      <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_adaptacao_predio_condominio}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao', 'd2')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_expansao}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao', 'd2')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_construcao_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste', 'd2')}>
      <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_troca_de_poste}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento', 'd2')}>
      <h1 className='h3-card1-gerencial-geral'>ROMPIMENTO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_rompimento_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao', 'd2')}>
      <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_manutencao_rede_optica}</h1>
    </div>
  </div>
</div>




 <div className='div-card6-gerencial-geral'>
  <h1 className='h1-card1-gerencial-geral'>D + 3</h1>
  <h1 className='h2-card1-gerencial-geral'>{dados2.total_geral}</h1>

  <div className='div-card1-gerencial-geral1'>
    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao', 'd3')}>
      <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_adaptacao_predio_condominio}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao', 'd3')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_expansao}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao', 'd3')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_construcao_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste', 'd3')}>
      <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_troca_de_poste}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento', 'd3')}>
      <h1 className='h3-card1-gerencial-geral'>ROMPIMENTO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_rompimento_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao', 'd3')}>
      <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_manutencao_rede_optica}</h1>
    </div>
  </div>
</div>

                  


 <div className='div-card7-gerencial-geral'>
  <h1 className='h1-card1-gerencial-geral'>D + 4</h1>
  <h1 className='h2-card1-gerencial-geral'>{dados2.total_geral}</h1>

  <div className='div-card1-gerencial-geral1'>
    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao', 'd4')}>
      <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_adaptacao_predio_condominio}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao', 'd4')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_expansao}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao', 'd4')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_construcao_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste', 'd4')}>
      <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_troca_de_poste}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento', 'd4')}>
      <h1 className='h3-card1-gerencial-geral'>ROMPIMENTO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_rompimento_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao', 'd4')}>
      <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_manutencao_rede_optica}</h1>
    </div>
  </div>
</div>




 <div className='div-card8-gerencial-geral'>
  <h1 className='h1-card1-gerencial-geral'>D + 5</h1>
  <h1 className='h2-card1-gerencial-geral'>{dados2.total_geral}</h1>

  <div className='div-card1-gerencial-geral1'>
    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao', 'd5')}>
      <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_adaptacao_predio_condominio}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao', 'd5')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_expansao}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao', 'd5')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_construcao_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste', 'd5')}>
      <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_troca_de_poste}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento', 'd5')}>
      <h1 className='h3-card1-gerencial-geral'>ROMPIMENTO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_rompimento_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao', 'd5')}>
      <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_manutencao_rede_optica}</h1>
    </div>
  </div>
</div>




                   <div className='div-card8-gerencial-geral'>
  <h1 className='h1-card1-gerencial-geral'>D + 6</h1>
  <h1 className='h2-card1-gerencial-geral'>{dados2.total_geral}</h1>

  <div className='div-card1-gerencial-geral1'>
    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao', 'd6')}>
      <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_adaptacao_predio_condominio}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao', 'd6')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_expansao}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao', 'd6')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_construcao_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste', 'd6')}>
      <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_troca_de_poste}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento', 'd6')}>
      <h1 className='h3-card1-gerencial-geral'>ROMPIMENTO</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_rompimento_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao', 'd6')}>
      <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
      <h1 className='h4-card1-gerencial-geral'>{dados2.total_fibra_manutencao_rede_optica}</h1>
    </div>
  </div>
</div>


<div className='div-card10-gerencial-geral'>
  <h1 className='h1-card1-gerencial-geral'>SEM AGENDA</h1>
  <h1 className='h2-card1-gerencial-geral'>{semAgenda.todos}</h1>

  <div className='div-card1-gerencial-geral1'>
    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao', 'd7')}>
      <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
      <h1 className='h4-card1-gerencial-geral'>{semAgenda.adaptacao_predio_condominio}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao', 'd7')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
      <h1 className='h4-card1-gerencial-geral'>{semAgenda.fibra_expansao}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao', 'd7')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
      <h1 className='h4-card1-gerencial-geral'>{semAgenda.fibra_construcao_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste', 'd7')}>
      <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
      <h1 className='h4-card1-gerencial-geral'>{semAgenda.troca_de_poste}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento', 'd7')}>
      <h1 className='h3-card1-gerencial-geral'>ROMPIMENTO</h1>
      <h1 className='h4-card1-gerencial-geral'>{semAgenda.fibra_rompimento_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao', 'd7')}>
      <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
      <h1 className='h4-card1-gerencial-geral'>{semAgenda.fibra_manutencao_rede_optica}</h1>
    </div>
  </div>
</div>


<div className='div-card10-gerencial-geral'>
  <h1 className='h1-card1-gerencial-geral'>VENCIDOS</h1>
  <h1 className='h2-card1-gerencial-geral'>{totais.todos}</h1>

  <div className='div-card1-gerencial-geral1'>
    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('adaptacao', 'inicio2017')}>
      <h1 className='h3-card1-gerencial-geral'>ADAPTAÇÃO</h1>
      <h1 className='h4-card1-gerencial-geral'>{totais.adaptacao_predio_condominio}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_expansao', 'inicio2017')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA EXP.</h1>
      <h1 className='h4-card1-gerencial-geral'>{totais.fibra_expansao}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_construcao', 'inicio2017')}>
      <h1 className='h3-card1-gerencial-geral'>FIBRA CONSTR.</h1>
      <h1 className='h4-card1-gerencial-geral'>{totais.fibra_construcao_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('troca_de_poste', 'inicio2017')}>
      <h1 className='h3-card1-gerencial-geral'>TROCA DE POSTE</h1>
      <h1 className='h4-card1-gerencial-geral'>{totais.troca_de_poste}</h1>
    </div>  

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_rompimento', 'inicio2017')}>
      <h1 className='h3-card1-gerencial-geral'>ROMPIMENTO</h1>
      <h1 className='h4-card1-gerencial-geral'>{totais.fibra_rompimento_rede_optica}</h1>
    </div>

    <div className='row-card1-gerencial-geral' onClick={() => buscarOrdens('fibra_manutencao', 'inicio2017')}>
      <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
      <h1 className='h4-card1-gerencial-geral'>{totais.fibra_manutencao_rede_optica}</h1>
    </div>
  </div>
</div>



            </div>

   <div style={{ width: '99%', justifyItems: 'start', display: 'flex', justifySelf: 'center', marginTop: 20 }}>
  <div className="div-slas">
    <div className="sla-titulo">
      <div className="sla-titulo-texto">SLA MÉDIO</div>
      <div className="sla-titulo-subtexto">DIAS</div>
    </div>

    <div className="sla-categorias">
      <div className="sla-categoria">ADAPTAÇÃO</div>
      <div className="sla-categoria">FIBRA EXP.</div>
      <div className="sla-categoria">FIBRA CONST.</div>
      <div className="sla-categoria">TROCA POSTE</div>
      <div className="sla-categoria">ROMP.</div>
      <div className="sla-categoria">MANUT.</div>
      {/* opcional:
      <div className="sla-categoria">FIBRA (GERAL)</div>
      */}
    </div>

    <div className="sla-valores">
      <div className="sla-valor">{sla?.adaptacao_predio_condominio ?? 0}</div>
      <div className="sla-valor">{sla?.fibra_expansao ?? 0}</div>
      <div className="sla-valor">{sla?.fibra_construcao_rede_optica ?? 0}</div>
      <div className="sla-valor">{sla?.troca_de_poste ?? 0}</div>
      <div className="sla-valor">{sla?.fibra_rompimento_rede_optica ?? 0}</div>
      <div className="sla-valor">{sla?.fibra_manutencao_rede_optica ?? 0}</div>
      {/* opcional:
      <div className="sla-valor">{sla?.fibra_total ?? 0}</div>
      */}
    </div>
  </div>
</div>



            <div style={{width: '100%', marginTop: 20, display: 'flex', justifyContent:'flex-end', alignSelf: 'center'}}>
              <button   onClick={exportarCSV} style={{ width: 150, marginRight: 10, backgroundColor: '#0B8634', borderRadius: 5, color: 'white', fontWeight: 'bold', border: 'transparent', height: 35, cursor: 'pointer'}}>EXPORTAR .CSV</button>
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
          <th>DATA CADASTRO</th>
          <th>DATA PEDIDO PROVISIONADO</th>
          <th>HORA PEDIDO PROVISIONADO</th>
          <th>JOTAS</th>
          <th>MAC/ONU</th>
          <th>TIPO CDO</th>
          <th>STATUS</th>
          <th>TIPO</th>
          <th>LOCALIZAÇÃO INSTALADOR</th>
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
            <td>{new Date(cliente.data_cadastro).toLocaleDateString()}</td>
            <td>{new Date(cliente.data_inicio_programado).toLocaleDateString()}</td>
            <td>{new Date(cliente.data_inicio_programado).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td>{cliente.jotas || "-"}</td>
            <td>{cliente.macOnu || "-"}</td>
            <td>{cliente.tipoCdo || "-"}</td>
            <td>{cliente.status}</td>
            <td>{cliente.tipo_ordem || "-"}</td>
            <td>{cliente.instalador || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

  



    </div>
  )
}

export default DashboardFibraGerencial