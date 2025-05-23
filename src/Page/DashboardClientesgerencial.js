import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, PieChart, Pie, Cell } from 'recharts';
import {datageral} from '../Data/geralDashboard'


import logobranca from '../Images/logobrnaca.png'
import '../CSS/DashboardChurnGerencial.css'
import '../CSS/DashboardClientesgerencial.css'


const formatValorCompacto = (valor) => {
  if (valor >= 1_000_000_000) return `${(valor / 1_000_000_000).toFixed(1)}B`;
  if (valor >= 1_000_000) return `${(valor / 1_000_000).toFixed(1)}M`;
  if (valor >= 1_000) return `${(valor / 1_000).toFixed(1)}K`;
  return valor.toFixed(0);
};

const nomesMeses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function getMesAtual() {
  const hoje = new Date();
  const mes = nomesMeses[hoje.getMonth()];
  return `${mes}/25`;
}


console.log(datageral)

function DashboardClientesgerencial() {
      const [vendasUltimosMeses, setVendasUltimosMeses] = useState([]);
       const [totalClientes, setTotalClientes] = useState(null);
        const [dados, setDados] = useState([]);
         const [crescimento, setCrescimento] = useState(null);
          const [valorFormatado, setValorFormatado] = useState('');
            const [dadosReal, setDadosReal] = useState([]);
            const [valorAbreviado, setValorAbreviado] = useState('');
              const [clientesAtivosMeses, setClientesAtivosMeses] = useState([]);
  const [totalClientesUltimoMes, setTotalClientesUltimoMes] = useState(0);
  const [dadosNovosClientes,  setDadosNovosClientes] = useState([])
    const [totalclientesnovos, setTotal] = useState(null);
     const [ticketMedio, setTicketMedio] = useState(null);
     const [dataReferencia, setDataReferencia] = useState(null);
    const [dadosTicketMedio, setDadosTicketMedio] = useState([]);
     const [totalCadastros, setTotalCadastros] = useState(null);
     const [cadastrosNovo, sethCadastrosNovo] = useState([])
      const [totalPF, setTotalPF] = useState(null);
       const [totalPJ, setTotalPJ] = useState(null);
       const [cadastrosNovoPF, setCadastrosNovoPF] = useState([]);
       const [cadastrosNovoPJ, setCadastrosNovoPJ] = useState([]);  
    const [totalCancelamentoMes, setTotalCancelamentoMes] = useState(0);
      const [cancelamentosMes, setCancelamentosMes] = useState([]);
          const [totalCancelamentoMesPorcentos, setTotalCancelamentoMesPorcentos] = useState(0);
      const [cancelamentosMesPorcentos, setCancelamentosMesPorcentos] = useState([]);
       const [cancelamentosPedido, setCancelamentosPedido] = useState(0);
             const [cancelamentosMesPedidos, setCancelamentosMesPedidos] = useState([]);
                    const [cancelamentosAutomatico, setCancelamentosAutomatico] = useState(0);
             const [cancelamentosMesAutomatico, setCancelamentosMesAutomatico] = useState([]);
             const [totalAtendimentos, setTotalAtendimentos] = useState(0);
            const [totalAtendimentosUltimos, setTotalAtendimentosUltimos] = useState([]);
            const [metaChurn, setMetaChurn] = useState(null);
const [superMetaChurn, setSuperMetaChurn] = useState(null);
const [estadoSelecionado, setEstadoSelecionado] = useState('Todos');
const [clientesAtivosSelecionado, setClientesAtivosSelecionado] = useState(null);
const [metaSelecionada, setMetaSelecionada] = useState(null);
const [metaChurnSelecionada, setMetaChurnSelecionada] = useState(null);
const [incrementoSelecionado, setIncrementoSelecionado] = useState(null);
const [crescimentoSelecionado, setCrescimentoSelecionado] = useState(null);
const [faturamentoSelecionado, setFaturamentoSelecionado] = useState(null);
const [ticketSelecionado, setTicketSelecionado] = useState(null);
const [novosClientesSelecionado, setNovosClientesSelecionado] = useState(null);
const [novasVendasSelecionado, setNovasVendasSelecionado] = useState(null);
const [novasVendasB2CSelecionado, setNovasVendasB2CSelecionado] = useState(null);
const [novasVendasB2BSelecionado, setNovasVendasB2BSelecionado] = useState(null);
const [cancelamentosBaseSelecionado, setCancelamentosBaseSelecionado] = useState(null);
const [cancelamentosSolicitacaoSelecionado, setCancelamentosSolicitacaoSelecionado] = useState(null);
const [cancelamentosInadimplenciaSelecionado, setCancelamentosInadimplenciaSelecionado] = useState(null);
const [retencaoCSSelecionado, setRetencaoCSSelecionado] = useState(null);
const estadoParam = estadoSelecionado !== 'Todos' ? `&estado=${estadoSelecionado}` : '';
const [loading, setLoading] = useState(false);




const [mesSelecionado, setMesSelecionado] = useState(() => {
  const hoje = new Date();
  const nomesMeses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  return `${nomesMeses[hoje.getMonth()]}/25`;
});


function extrairMesAno(mesSelecionado) {
  const [mesAbrev, anoStr] = mesSelecionado.split('/');
  const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const mes = nomesMeses.findIndex(m => m.toLowerCase() === mesAbrev.toLowerCase()) + 1;
  const ano = parseInt(`20${anoStr}`);
  return { mes, ano };
}


     const mesAtual = getMesAtual();

useEffect(() => {
  if (!mesSelecionado || !datageral.length) return;

  const [mesStr, anoStr] = mesSelecionado.split('/');
  const chave = `${mesStr.toLowerCase()}/${anoStr}`;

  const meta = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'meta de número clientes ativos'
  );

  const metaChurn = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'meta de churn (base final do mês)'
  );

  const incremento = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'incremento de clientes na base'
  );

  const crescimento = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === '% de crescimento ao mês passado'
  );

  const faturamento = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'faturamento mensal'
  );

  const ticket = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'ticket médio geral'
  );

  const novosClientes = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'meta de novos clientes (ativação)'
  );

  const novasVendas = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'meta de novas vendas geral'
  );

  const novasVendasB2C = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'meta de novas vendas b2c'
  );

  const novasVendasB2B = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'meta de novas vendas b2b'
  );

  const cancelamentosBase = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'número de cancelamentos (base)'
  );

  const cancelamentosSolicitacao = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'cancelamentos (por solicitação)'
  );

  const cancelamentosInadimplencia = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'cancelamentos (inadimplencia)'
  );

  const retencaoCS = datageral.find(item =>
    item.data?.trim().toLowerCase() === chave &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'meta de taxa de retenção cs'
  );

  setMetaChurnSelecionada(metaChurn || null);
  setIncrementoSelecionado(incremento || null);
  setCrescimentoSelecionado(crescimento || null);
  setFaturamentoSelecionado(faturamento || null);
  setTicketSelecionado(ticket || null);
  setNovosClientesSelecionado(novosClientes || null);
  setNovasVendasSelecionado(novasVendas || null);
  setNovasVendasB2CSelecionado(novasVendasB2C || null);
  setNovasVendasB2BSelecionado(novasVendasB2B || null);
  setCancelamentosBaseSelecionado(cancelamentosBase || null);
  setCancelamentosSolicitacaoSelecionado(cancelamentosSolicitacao || null);
  setCancelamentosInadimplenciaSelecionado(cancelamentosInadimplencia || null);
  setRetencaoCSSelecionado(retencaoCS || null);
   setMetaSelecionada(meta || null);
}, [mesSelecionado, datageral]);


            // Gera automaticamente os meses até o mês atual de 2025
const mesesDisponiveis = (() => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  if (ano !== 2025) return [];
  const mesAtualIndex = hoje.getMonth();
  return nomesMeses.slice(0, mesAtualIndex + 1).map(m => `${m}/25`);
})();


  useEffect(() => {
     const { mes, ano } = extrairMesAno(mesSelecionado);
  
    const fetchClientesAtivos = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/clientestotal-ultimos4meses?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();

    const mesFormatado = `${String(mes).padStart(2, '0')}/${ano}`;
    let valorMesAtual = 0;

    console.log('Mes selecionado:', mesFormatado);
    console.log('Dados recebidos:', data.dados);

    const dadosFiltrados = data.dados.filter(item => {
      if (item.mes === mesFormatado) {
        valorMesAtual = item.total_contratos_ate_primeira_data;
        return false;
      }
      return true;
    }).map(item => ({
      mes: item.mes,
      total: item.total_contratos_ate_primeira_data,
    }));

    setClientesAtivosMeses(dadosFiltrados);
    setTotalClientesUltimoMes(valorMesAtual);

  } catch (error) {
    console.error('Erro ao buscar clientes ativos dos últimos 4 meses:', error);
  }
};

    const fetchClientesAtivosMesSelecionado = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/clientestotal-mes?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do mês');

    const data = await response.json();
    setClientesAtivosSelecionado(data.total_contratos_ate_primeira_data);
  } catch (error) {
    console.error('Erro ao buscar total de clientes ativos do mês selecionado:', error);
  }
};


    const fetchClientesVendas = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/clientes-entrantes-reais-ultimos4meses?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();

    const formatado = data.dados.map(item => ({
      mes: `${String(item.mes).padStart(2, '0')}/${item.ano}`,
      total_clientes: item.clientes_reais
    }));

    setVendasUltimosMeses(formatado);
  } catch (error) {
    console.error('Erro ao buscar clientes dos últimos 4 meses:', error);
  }
};


   const fetchTotal = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/clientes-entrantes-reais?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();
    setTotalClientes(data.clientes_reais);
  } catch (error) {
    console.error('Erro ao buscar total de clientes do mês atual:', error);
  }
};


 const fetchCrescimento = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/clientestotal-crescimento?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();

    const dadosFiltrados = data.dados.slice(0).map(item => ({
      mes: item.mes,
      crescimento: item.crescimento_percentual
    }));

    setDados(dadosFiltrados);
  } catch (error) {
    console.error('Erro ao buscar dados de crescimento:', error);
  }
};



const fetchCrescimentoMesAtual = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/clientestotal-crescimento-mesatual?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();

    // Pega o último mês da lista (mais recente)
    const ultimoMes = data.dados[data.dados.length - 1];

    setCrescimento(ultimoMes?.crescimento_percentual ?? null);
  } catch (error) {
    console.error('Erro ao buscar crescimento do mês selecionado:', error);
  }
};



const fetchValorPago = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/valortotalpago-mespassado?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();

    const valorNumerico = data.total_pago_mes || 0;
    setValorAbreviado(formatValorCompacto(valorNumerico));
  } catch (error) {
    console.error('Erro ao buscar valor total pago do mês selecionado:', error);
  }
};



 const fetchFaturamento = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/valortotalpago-ultimos4meses?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();
    setDadosReal(data.ultimos_4_meses || []);
  } catch (error) {
    console.error('Erro ao buscar dados de faturamento selecionado:', error);
  }
};



const fetchNovosClientes = async (mes, ano) => {
  try {
    const response = await fetch(`http://38.224.145.3:3009/total-clientes-habilitados-ultimos4meses?mes=${mes}&ano=${ano}${estadoParam}`);
    const data = await response.json();

    const dadosFormatados = data.dados.map((item) => ({
      mes: `${String(item.mes).padStart(2, '0')}/${item.ano}`,
      total_clientes: parseInt(item.total_clientes_habilitados)
    }));

    setDadosNovosClientes(dadosFormatados);
  } catch (error) {
    console.error('Erro ao buscar dados de novos clientes dos últimos meses:', error);
  }
};



 const fetchTotalClientesNovos = async (mes, ano) => {
  try {
    const response = await fetch(`http://38.224.145.3:3009/total-clientes-habilitados-mespassado?mes=${mes}&ano=${ano}${estadoParam}`);
    const data = await response.json();

    setTotal(parseInt(data.total_clientes_habilitados));
  } catch (error) {
    console.error('Erro ao buscar total de clientes habilitados do mês anterior:', error);
  }
};


    const fetchTicketMedio = async (mes, ano) => {
  try {
    const response = await fetch(`http://38.224.145.3:3009/ticket-medio-mesatual?mes=${mes}&ano=${ano}${estadoParam}`);
    const data = await response.json();

    setTicketMedio(parseFloat(data.ticket_medio));
  } catch (error) {
    console.error('Erro ao buscar ticket médio do mês:', error);
  }
};

    
const fetchTicketMedioUltimos = async (mes, ano) => {
  try {
    const response = await fetch(`http://38.224.145.3:3009/ticket-medio-ultimos4meses?mes=${mes}&ano=${ano}${estadoParam}`);
    const data = await response.json();

    const formatado = data.ticket_medio_ultimos_4_meses.map(item => ({
      mes: item.mes,
      ticket_medio: parseFloat(item.ticket_medio)
    }));

    setDadosTicketMedio(formatado);
  } catch (error) {
    console.error('Erro ao buscar ticket médio dos últimos meses:', error);
  }
};


    const fetchCadastros = async (mes, ano) => {
  try {
    const response = await fetch(`http://38.224.145.3:3009/cadastrostotal-mespassado?mes=${mes}&ano=${ano}${estadoParam}`);
    const data = await response.json();

    setTotalCadastros(parseInt(data.total_cadastros));
  } catch (error) {
    console.error('Erro ao buscar total de cadastros do mês anterior:', error);
  }
};


  const fetchCadastrosNovo = async (mes, ano) => {
  try {
    const response = await fetch(`http://38.224.145.3:3009/cadastrostotal-ultimos4meses?mes=${mes}&ano=${ano}${estadoParam}`);
    const data = await response.json();

    const adaptado = data.cadastros_ultimos_4_meses.map(item => ({
      mes: item.mes,
      total_clientes: parseInt(item.total_cadastros)
    }));

    sethCadastrosNovo(adaptado);
  } catch (error) {
    console.error('Erro ao buscar cadastros dos últimos 4 meses:', error);
  }
};


const fetchCadastrosPFUltimos = async (mes, ano) => {
  try {
    const response = await fetch(`http://38.224.145.3:3009/cadastrospf-ultimos4meses?mes=${mes}&ano=${ano}${estadoParam}`);
    const data = await response.json();

    const formatado = data.cadastros_pf_ultimos_4_meses?.map(item => ({
      mes: item.mes,
      total_clientes: parseInt(item.total_cadastros_pf || 0)
    })) || [];

    setCadastrosNovoPF(formatado);
  } catch (error) {
    console.error('Erro ao buscar cadastros PF:', error);
  }
};



const fetchCadastrosPJUltimos = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/cadastrospj-ultimos4meses?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();

    const formatado = data.cadastros_pj_ultimos_4_meses?.map(item => ({
      mes: item.mes,
      total_clientes: parseInt(item.total_cadastros_pj || 0)
    })) || [];

    setCadastrosNovoPJ(formatado);
  } catch (error) {
    console.error('Erro ao buscar cadastros PJ:', error);
  }
};




     const fetchCadastrosPJ = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/cadastrospj-mespassado?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();
    setTotalPJ(parseInt(data.total_cadastros_pj));
  } catch (error) {
    console.error('Erro ao buscar cadastros de PJ do mês passado:', error);
  }
};



     const fetchCadastrosPF = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1;
    const ano = parseInt(`20${anoStr}`);

    const response = await fetch(`http://38.224.145.3:3009/cadastrospf-mespassado?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();
    setTotalPF(parseInt(data.total_cadastros_pf));
  } catch (error) {
    console.error('Erro ao buscar cadastros de PF do mês passado:', error);
  }
};




   const fetchChurnData = async (mes, ano) => {
  try {
    const response = await fetch(`http://38.224.145.3:3009/churn-mensal?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }
    const data = await response.json();
    setTotalCancelamentoMes(data.total_cancelamentos_mes);
  } catch (error) {
    console.error('Erro ao buscar churn mensal:', error);
  }
};

const buscarCancelamentos = async (mes, ano) => {
  try {
    const resposta = await fetch(`http://38.224.145.3:3009/churn-mensal-ultimos?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!resposta.ok) throw new Error('Erro na requisição');

    const dados = await resposta.json();

    const nomesMeses = [
      '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const dadosFormatados = dados.map(item => ({
      mes: `${nomesMeses[item.mes]}/${item.ano.toString().slice(-2)}`,
      total_cancelamentos_mes: item.total_cancelamentos_mes,
      churn_mensal: item.churn_mensal,
      total_ativos_mes: item.total_ativos_mes
    }));

    setCancelamentosMes(dadosFormatados);
  } catch (erro) {
    console.error('Erro ao buscar churn mensal:', erro);
  }
};



   const fetchChurnDataporcentos = async (mes, ano) => {
  try {
    const response = await fetch(`http://38.224.145.3:3009/churn-mensal?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }
    const data = await response.json();
    setTotalCancelamentoMesPorcentos(data.churn_mensal);
  } catch (error) {
    console.error('Erro ao buscar churn mensal (%):', error);
  }
};


const buscarCancelamentosporcentos = async (mes, ano) => {
  try {
    const resposta = await fetch(`http://38.224.145.3:3009/churn-mensal-ultimos?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!resposta.ok) throw new Error('Erro na requisição');

    const dados = await resposta.json();

    const nomesMeses = [
      '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const dadosFormatados = dados.map(item => ({
      mes: `${nomesMeses[item.mes]}/${item.ano.toString().slice(-2)}`,
      churn_mensal: item.churn_mensal
    }));

    setCancelamentosMesPorcentos(dadosFormatados);
  } catch (erro) {
    console.error('Erro ao buscar churn mensal (%):', erro);
  }
};


 const buscarCancelamentosPedido = async (mes, ano) => {
  try {
    const resposta = await fetch(`http://38.224.145.3:3009/cancelamentos-por-pedido-mes-passado?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!resposta.ok) throw new Error('Erro ao buscar dados');

    const dados = await resposta.json();
    setCancelamentosPedido(dados.total_cancelamentos_pedido);
  } catch (erro) {
    console.error('Erro ao buscar cancelamentos por pedido do cliente:', erro);
  }
};

  
    
  const buscarCancelamentosautomatico = async (mes, ano) => {
  try {
    const resposta = await fetch(`http://38.224.145.3:3009/cancelamentos-por-automatico-mes-passado?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!resposta.ok) throw new Error('Erro ao buscar dados');
    const dados = await resposta.json();

    setCancelamentosAutomatico(dados.total_cancelamentos_pedido);
  } catch (erro) {
    console.error('Erro ao buscar cancelamentos por inadimplência:', erro);
  }
};


const buscarCancelamentosPedidoUltimos = async (mes, ano) => {
  try {
    const resposta = await fetch(`http://38.224.145.3:3009/cancelamentos-por-pedido-ultimos-4-meses?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!resposta.ok) throw new Error('Erro ao buscar dados');

    const dados = await resposta.json();

    const nomesMeses = [
      '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const formatado = dados.map(item => ({
      mes: `${nomesMeses[item.mes]}/${item.ano.toString().slice(-2)}`,
      total_cancelamentos_pedido: item.total_cancelamentos_pedido
    }));

    setCancelamentosMesPedidos(formatado);
  } catch (erro) {
    console.error('Erro ao buscar cancelamentos por pedido dos últimos meses:', erro);
  }
};



   const buscarAtendimentos = async (mes, ano) => {
  try {
    const resposta = await fetch(`http://38.224.145.3:3009/atendimentos-tipo-mes-passado?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!resposta.ok) throw new Error('Erro ao buscar atendimentos');
    const dados = await resposta.json();

    setTotalAtendimentos(dados.percentual_sucesso);
  } catch (erro) {
    console.error('Erro ao carregar os atendimentos:', erro);
  }
};


  const buscarAtendimentosUltimos = async () => {
  try {
    if (!mesSelecionado) return;

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    // Extrair mês e ano do valor "Abr/25"
    const [mesStr, anoStr] = mesSelecionado.split('/');
    const mesIndex = nomesMeses.findIndex(m => m.toLowerCase() === mesStr.toLowerCase());
    const mes = mesIndex + 1; // 1 a 12
    const ano = parseInt(`20${anoStr}`); // '25' → 2025

    const resposta = await fetch(`http://38.224.145.3:3009/atendimentos-tipo-ultimos-4-meses?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!resposta.ok) throw new Error('Erro na requisição');

    const dados = await resposta.json();

    const dadosFormatados = dados.map(item => ({
      mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
      percentual_sucesso: parseFloat(item.percentual_sucesso)
    }));

    setTotalAtendimentosUltimos(dadosFormatados);
  } catch (erro) {
    console.error('Erro ao carregar dados de atendimentos tipo 257:', erro);
  }
};


const buscarCancelamentosAutomaticoUltimos = async (mes, ano) => {
  try {
    const resposta = await fetch(`http://38.224.145.3:3009/cancelamentos-por-automatico-ultimos-4-meses?mes=${mes}&ano=${ano}${estadoParam}`);
    if (!resposta.ok) throw new Error('Erro ao buscar dados');

    const dados = await resposta.json();

    const nomesMeses = [
      '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const formatado = dados.map(item => ({
      mes: `${nomesMeses[item.mes]}/${item.ano.toString().slice(-2)}`,
      total_cancelamentos_pedido: item.total_cancelamentos_pedido
    }));

    setCancelamentosMesAutomatico(formatado);
  } catch (erro) {
    console.error('Erro ao buscar cancelamentos automáticos dos últimos meses:', erro);
  }
};



    const atualizarPeriodicamente = async () => {
  setLoading(true);
  try {
    await buscarCancelamentosPedidoUltimos(mes, ano);
    await fetchTicketMedioUltimos(mes, ano);
    await fetchFaturamento(mes, ano);
    await fetchCrescimentoMesAtual(mes, ano);
    await fetchClientesAtivos(mes, ano);
    await fetchCrescimento(mes, ano);
    await fetchClientesVendas(mes, ano);
    await fetchTotal(mes, ano);
    await fetchValorPago(mes, ano);
    await fetchNovosClientes(mes, ano);
    await fetchTotalClientesNovos(mes, ano);
    await fetchTicketMedio(mes, ano);
    await fetchCadastros(mes, ano);
    await fetchCadastrosPF(mes, ano);
    await fetchCadastrosPJ(mes, ano);
    await fetchChurnData(mes, ano);
    await fetchChurnDataporcentos(mes, ano);
    await buscarCancelamentosPedido(mes, ano);
    await buscarCancelamentosautomatico(mes, ano);
    await buscarAtendimentos(mes, ano);
    await buscarAtendimentosUltimos(mes, ano);
    await fetchCadastrosNovo(mes, ano);
    await fetchCadastrosPJUltimos(mes, ano);
    await fetchCadastrosPFUltimos(mes, ano);
    await buscarCancelamentosporcentos(mes, ano);
    await buscarCancelamentos(mes, ano);
    await buscarCancelamentosAutomaticoUltimos(mes, ano);
    await fetchClientesAtivosMesSelecionado(mes, ano);
  } catch (error) {
    console.error('Erro ao atualizar os dados do dashboard:', error);
  }
  setLoading(false);
};

  // Executa imediatamente na primeira renderização
  atualizarPeriodicamente();

  const intervalo = setInterval(atualizarPeriodicamente, 10000); // 60 segundos

  return () => clearInterval(intervalo); // limpeza quando o componente desmontar
}, [mesSelecionado, estadoSelecionado]);


  const handleLimparFiltros = () => {
  setMesSelecionado(getMesAtual());
  setEstadoSelecionado('Todos');
};

  return (
    <div style={{backgroundColor: 'white', alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%'}}>


          <div className='head-gerencial-body-geral'>
                    <h1 className='h1-head-gerencial-body'>DASHBOARD GERENCIAL</h1>
                    <h1  className='h2-head-gerencial-body'>Geral</h1>
                    <img  className='logo-head-gerencial-body' src={logobranca}/>
                </div>
                
                <div className='div-body-select-geral'>

               <div className='div-body-opcao1'>
                <h1 className='h1-body-opcao'>Mês</h1>
                <select
                  className='button-body-opcao'
                  value={mesSelecionado}
                  onChange={(e) => setMesSelecionado(e.target.value)}
                >
                  {mesesDisponiveis.map((mes) => (
                    <option key={mes} value={mes}>
                      {mes}
                    </option>
                  ))}
                </select>

              </div>


              <div className='div-body-opcao1'>
                  <h1 className='h1-body-opcao'>Estado</h1>
                  <select
                    className='button-body-opcao'
                    value={estadoSelecionado}
                    onChange={(e) => setEstadoSelecionado(e.target.value)}
                  >
                    <option value="Todos">Todos</option>
                    <option value="SC">SC</option>
                    <option value="RS">RS</option>
                  </select>
                </div>


                
                <div className='div-body-opcao1'>
                <button
                    className="botao-limparfiltros"
                   onClick={handleLimparFiltros}
                  >
                    Limpar Filtros
                  </button>
                  </div>


                </div>
                


                <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'> CLIENTES ATIVOS</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                                  {clientesAtivosMeses.length > 0 ? (
                                  <ResponsiveContainer width="90%" height={270}>
                                    <BarChart data={clientesAtivosMeses}>
                                      <CartesianGrid strokeDasharray="2 2" />
                                      <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
                                      <YAxis tick={{ fill: '#fff' }} />
                                      <Tooltip />
                                      <Bar dataKey="total" fill="#F45742">
                                        <LabelList dataKey="total" position="inside" fill="#fff" fontWeight="bold" />
                                      </Bar>
                                    </BarChart>
                                  </ResponsiveContainer>
                                ) : (
                                  <p>Carregando dados...</p>
                                )}
                        </div>

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{clientesAtivosSelecionado}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1  className='h2-card2-div--geral-dados'>{metaSelecionada ? metaSelecionada.meta : '—'}</h1>

                        <h2 className='h3-card2-div--geral-dados'>
                        {metaSelecionada
                          ? `${((clientesAtivosSelecionado / parseFloat(metaSelecionada.meta)) * 100).toFixed(2)}%`
                          : '—'}
                      </h2>
                        
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                         <h1  className='h2-card2-div--geral-dados'>{metaSelecionada ? metaSelecionada.super_meta : '—'}</h1>
                         
                    <h2 className='h3-card2-div--geral-dados'>
                    {metaSelecionada
                      ? `${((clientesAtivosSelecionado / parseFloat(metaSelecionada.super_meta)) * 100).toFixed(2)}%`
                      : '—'}
                  </h2>


                    </div>

                 
                    </div>
                </div>



                    <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'> INCREMENTO DE CLIENTES NA BASE</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                               {vendasUltimosMeses.length > 0 ? (
                              <ResponsiveContainer width="90%" height={270}>
                                <BarChart data={vendasUltimosMeses}>
                                  <CartesianGrid strokeDasharray="2 2" />
                                  <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
                                  <YAxis tick={{ fill: '#fff' }} />
                                  <Tooltip />
                                  <Bar dataKey="total_clientes" fill="#F45742">
                                    <LabelList dataKey="total_clientes" position="inside" fill="#fff" fontWeight="bold" />
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            ) : (
                              <p>Carregando dados...</p>
                            )}
                        </div>

                  <div className='card2-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Total</h1>
                    <h1 className='h2-card2-div--geral-dados'>{totalClientes}</h1>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {incrementoSelecionado ? incrementoSelecionado.meta : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {incrementoSelecionado
                        ? `${((totalClientes / parseFloat(incrementoSelecionado.meta)) * 100).toFixed(2)}%`
                        : '—'}
                    </h2>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {incrementoSelecionado ? incrementoSelecionado.super_meta : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {incrementoSelecionado
                        ? `${((totalClientes / parseFloat(incrementoSelecionado.super_meta)) * 100).toFixed(2)}%`
                        : '—'}
                    </h2>
                  </div>

                    </div>
                </div>


                     <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>PERCENTUAL DE CRESCIMENTO</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                              {dados.length > 0 ? (
        <ResponsiveContainer width="90%" height={270}>
          <BarChart data={dados}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} unit="%" />
            <Tooltip
              formatter={(value) =>
                typeof value === 'number' ? `${value.toFixed(2)}%` : value
              }
            />
            <Bar dataKey="crescimento" fill="#F45742">
              <LabelList
                dataKey="crescimento"
                position="inside"
                fill="#fff"
                formatter={(value) =>
                  typeof value === 'number' ? `${value.toFixed(2)}%` : ''
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Carregando dados...</p>
      )}

                        </div>

                 <div className='card2-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Total</h1>
                    <h1 className='h2-card2-div--geral-dados'>{crescimento}%</h1>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {crescimentoSelecionado ? (parseFloat(crescimentoSelecionado.meta) * 100).toFixed(2) + '%' : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {crescimentoSelecionado
                        ? `${((parseFloat(crescimento) / (parseFloat(crescimentoSelecionado.meta) * 100)) * 100).toFixed(2)}%`
                        : '—'}
                    </h2>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {crescimentoSelecionado ? (parseFloat(crescimentoSelecionado.super_meta) * 100).toFixed(2) + '%' : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {crescimentoSelecionado
                        ? `${((parseFloat(crescimento) / (parseFloat(crescimentoSelecionado.super_meta) * 100)) * 100).toFixed(2)}%`
                        : '—'}
                    </h2>
                  </div>



                    </div>
                </div>


                     <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>FATURAMENTO MENSAL</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                                {dadosReal.length > 0 ? (
                                    <ResponsiveContainer width="90%" height={270}>
                                      <BarChart data={dadosReal}>
                                        <CartesianGrid strokeDasharray="2 2" />
                                        <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
                                        <YAxis tick={{ fill: '#fff' }} />
                                        <Tooltip
                                          formatter={(value, name, props) =>
                                            name === 'total_pago' && typeof value === 'number'
                                              ? new Intl.NumberFormat('pt-BR', {
                                                  style: 'currency',
                                                  currency: 'BRL',
                                                }).format(value)
                                              : value
                                          }
                                        />
                                        <Bar dataKey="total_pago" fill="#F45742">
                                       <LabelList
                                                dataKey="total_pago"
                                               position="inside"
                                                fill="#fff"
                                                formatter={formatValorCompacto}
                                                fontWeight="bold"
                                              />

                                        </Bar>
                                      </BarChart>
                                    </ResponsiveContainer>
                                  ) : (
                                    <p>Carregando dados...</p>
                                  )}

                        </div>

                   <div className='card2-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Total</h1>
                    <h1 className='h2-card2-div--geral-dados'>{valorAbreviado}</h1>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {faturamentoSelecionado ? faturamentoSelecionado.meta : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {faturamentoSelecionado && faturamentoSelecionado.meta
                        ? `${(
                            (parseFloat(valorAbreviado.replace(/[^\d,-]/g, '').replace(',', '.')) /
                              parseFloat(faturamentoSelecionado.meta.replace(/[^\d,-]/g, '').replace(',', '.'))) *
                            1000
                          ).toFixed(2)}%`
                        : '—'}
                    </h2>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {faturamentoSelecionado ? faturamentoSelecionado.super_meta : '—'}
                    </h1>
                 

                  <h2 className='h3-card2-div--geral-dados'>
                      {faturamentoSelecionado && faturamentoSelecionado.meta
                        ? `${(
                            (parseFloat(valorAbreviado.replace(/[^\d,-]/g, '').replace(',', '.')) /
                              parseFloat(faturamentoSelecionado.super_meta.replace(/[^\d,-]/g, '').replace(',', '.'))) *
                            1000
                          ).toFixed(2)}%`
                        : '—'}
                    </h2>

                  </div>



                    </div>
                </div>


                    <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>Ticket Médio</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                              {dadosTicketMedio.length > 0 ? (
        <ResponsiveContainer width="90%" height={270}>
          <BarChart data={dadosTicketMedio}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} />
            <Tooltip
              formatter={(value) =>
                typeof value === 'number'
                  ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  : value
              }
            />
            <Bar dataKey="ticket_medio" fill="#F45742">
              <LabelList
                dataKey="ticket_medio"
               position="inside"
                fill="#fff"
                fontSize={14}
                formatter={(value) =>
                  typeof value === 'number'
                    ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    : ''
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Carregando dados...</p>
      )}

                        </div>

                    <div className='card2-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Total</h1>
                    <h1 className='h2-card2-div--geral-dados'>R$ {ticketMedio}</h1>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {ticketSelecionado ? ticketSelecionado.meta : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {ticketSelecionado
                        ? `${(
                            (parseFloat(ticketMedio) /
                              parseFloat(ticketSelecionado.meta.replace(/[^\d,-]/g, '').replace(',', '.'))) *
                            100
                          ).toFixed(1)}%`
                        : '—'}
                    </h2>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {ticketSelecionado ? ticketSelecionado.super_meta : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {ticketSelecionado
                        ? `${(
                            (parseFloat(ticketMedio) /
                              parseFloat(ticketSelecionado.super_meta.replace(/[^\d,-]/g, '').replace(',', '.'))) *
                            100
                          ).toFixed(1)}%`
                        : '—'}
                    </h2>
                  </div>




                    </div>
                </div>


                    <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>Novos Clientes</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                         {dadosNovosClientes.length > 0 ? (
  <ResponsiveContainer width="90%" height={270}>
    <BarChart data={dadosNovosClientes}>
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
      <YAxis tick={{ fill: '#fff' }} />
      <Tooltip
        formatter={(value) =>
          typeof value === 'number' ? value.toLocaleString('pt-BR') : value
        }
      />
      <Bar dataKey="total_clientes" fill="#F45742">
        <LabelList
          dataKey="total_clientes"
          position="inside"
          fill="#fff"
          formatter={(value) =>
            typeof value === 'number' ? value.toLocaleString('pt-BR') : ''
          }
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
) : (
  <p>Carregando dados...</p>
)}


                        </div>

                 <div className='card2-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Total</h1>
                    <h1 className='h2-card2-div--geral-dados'>{totalclientesnovos}</h1>
                  </div>

                <div className='card3-div--geral-dados'>
                  <h1 className='h1-card2-div--geral-dados'>Meta</h1>
                  <h1 className='h2-card2-div--geral-dados'>
                    {novosClientesSelecionado ? novosClientesSelecionado.meta : '—'}
                  </h1>
                  <h2 className='h3-card2-div--geral-dados'>
                    {novosClientesSelecionado
                      ? `${(
                          (totalclientesnovos / parseFloat(novosClientesSelecionado.meta)) * 100
                        ).toFixed(1)}%`
                      : '—'}
                  </h2>
                </div>

                <div className='card3-div--geral-dados'>
                  <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
                  <h1 className='h2-card2-div--geral-dados'>
                    {novosClientesSelecionado ? novosClientesSelecionado.super_meta : '—'}
                  </h1>
                  <h2 className='h3-card2-div--geral-dados'>
                    {novosClientesSelecionado
                      ? `${(
                          (totalclientesnovos / parseFloat(novosClientesSelecionado.super_meta)) * 100
                        ).toFixed(1)}%`
                      : '—'}
                  </h2>
                </div>



                    </div>
                </div>


                      <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>Novas Vendas</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                         {cadastrosNovo.length > 0 ? (
  <ResponsiveContainer width="90%" height={270}>
    <BarChart data={cadastrosNovo}>
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
      <YAxis tick={{ fill: '#fff' }} />
      <Tooltip
        formatter={(value) =>
          typeof value === 'number' ? value.toLocaleString('pt-BR') : value
        }
      />
      <Bar dataKey="total_clientes" fill="#F45742">
        <LabelList
          dataKey="total_clientes"
          position="inside"
          fill="#fff"
          formatter={(value) =>
            typeof value === 'number' ? value.toLocaleString('pt-BR') : ''
          }
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
) : (
  <p>Carregando dados...</p>
)}


                        </div>

               <div className='card2-div--geral-dados'>
                <h1 className='h1-card2-div--geral-dados'>Total</h1>
                <h1 className='h2-card2-div--geral-dados'>{totalCadastros}</h1>
              </div>

              <div className='card3-div--geral-dados'>
                <h1 className='h1-card2-div--geral-dados'>Meta</h1>
                <h1 className='h2-card2-div--geral-dados'>
                  {novasVendasSelecionado ? novasVendasSelecionado.meta : '—'}
                </h1>
                <h2 className='h3-card2-div--geral-dados'>
                  {novasVendasSelecionado
                    ? `${(
                        (totalCadastros / parseFloat(novasVendasSelecionado.meta)) * 100
                      ).toFixed(1)}%`
                    : '—'}
                </h2>
              </div>

              <div className='card3-div--geral-dados'>
                <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
                <h1 className='h2-card2-div--geral-dados'>
                  {novasVendasSelecionado ? novasVendasSelecionado.super_meta : '—'}
                </h1>
                <h2 className='h3-card2-div--geral-dados'>
                  {novasVendasSelecionado
                    ? `${(
                        (totalCadastros / parseFloat(novasVendasSelecionado.super_meta)) * 100
                      ).toFixed(1)}%`
                    : '—'}
                </h2>
              </div>



                    </div>
                </div>


                          <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>NOVAS VENDAS B2C</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                          {cadastrosNovoPF.length > 0 ? (
                          <ResponsiveContainer width="90%" height={270}>
                            <BarChart data={cadastrosNovoPF}>
                              <CartesianGrid strokeDasharray="2 2" />
                              <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
                              <YAxis tick={{ fill: '#fff' }} />
                              <Tooltip
                                formatter={(value) =>
                                  typeof value === 'number'
                                    ? value.toLocaleString('pt-BR')
                                    : value
                                }
                              />
                              <Bar dataKey="total_clientes" fill="#F45742">
                                <LabelList
                                  dataKey="total_clientes"
                                  position="inside"
                                  fill="#fff"
                                  formatter={(value) =>
                                    typeof value === 'number'
                                      ? value.toLocaleString('pt-BR')
                                      : ''
                                  }
                                />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <p style={{ color: '#fff' }}>Carregando dados...</p>
                        )}



                        </div>

                <div className='card2-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Total</h1>
  <h1 className='h2-card2-div--geral-dados'>{totalPF}</h1>
</div>

<div className='card3-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Meta</h1>
  <h1 className='h2-card2-div--geral-dados'>
    {novasVendasB2CSelecionado ? novasVendasB2CSelecionado.meta : '—'}
  </h1>
  <h2 className='h3-card2-div--geral-dados'>
    {novasVendasB2CSelecionado
      ? `${(
          (totalPF / parseFloat(novasVendasB2CSelecionado.meta)) * 100
        ).toFixed(1)}%`
      : '—'}
  </h2>
</div>

<div className='card3-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
  <h1 className='h2-card2-div--geral-dados'>
    {novasVendasB2CSelecionado ? novasVendasB2CSelecionado.super_meta : '—'}
  </h1>
  <h2 className='h3-card2-div--geral-dados'>
    {novasVendasB2CSelecionado
      ? `${(
          (totalPF / parseFloat(novasVendasB2CSelecionado.super_meta)) * 100
        ).toFixed(1)}%`
      : '—'}
  </h2>
</div>



                    </div>
                </div>


                   <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>NOVAS VENDAS B2B</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                      {cadastrosNovoPJ.length > 0 ? (
                          <ResponsiveContainer width="90%" height={270}>
                            <BarChart data={cadastrosNovoPJ}>
                              <CartesianGrid strokeDasharray="2 2" />
                              <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
                              <YAxis tick={{ fill: '#fff' }} />
                              <Tooltip
                                formatter={(value) =>
                                  typeof value === 'number'
                                    ? value.toLocaleString('pt-BR')
                                    : value
                                }
                              />
                              <Bar dataKey="total_clientes" fill="#F45742">
                                <LabelList
                                  dataKey="total_clientes"
                                  position="inside"
                                  fill="#fff"
                                  formatter={(value) =>
                                    typeof value === 'number'
                                      ? value.toLocaleString('pt-BR')
                                      : ''
                                  }
                                />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <p style={{ color: '#fff' }}>Carregando dados...</p>
                        )}


                        </div>

              <div className='card2-div--geral-dados'>
                <h1 className='h1-card2-div--geral-dados'>Total</h1>
                <h1 className='h2-card2-div--geral-dados'>{totalPJ}</h1>
              </div>

              <div className='card3-div--geral-dados'>
                <h1 className='h1-card2-div--geral-dados'>Meta</h1>
                <h1 className='h2-card2-div--geral-dados'>
                  {novasVendasB2BSelecionado ? novasVendasB2BSelecionado.meta : '—'}
                </h1>
                <h2 className='h3-card2-div--geral-dados'>
                  {novasVendasB2BSelecionado
                    ? `${(
                        (totalPJ / parseFloat(novasVendasB2BSelecionado.meta)) * 100
                      ).toFixed(1)}%`
                    : '—'}
                </h2>
              </div>

              <div className='card3-div--geral-dados'>
                <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
                <h1 className='h2-card2-div--geral-dados'>
                  {novasVendasB2BSelecionado ? novasVendasB2BSelecionado.super_meta : '—'}
                </h1>
                <h2 className='h3-card2-div--geral-dados'>
                  {novasVendasB2BSelecionado
                    ? `${(
                        (totalPJ / parseFloat(novasVendasB2BSelecionado.super_meta)) * 100
                      ).toFixed(1)}%`
                    : '—'}
                </h2>
              </div>



                    </div>
                </div>



                      <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>CANCELAMENTOS</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                   {cancelamentosMes.length > 0 ? (
        <ResponsiveContainer width="90%" height={270}>
          <BarChart data={cancelamentosMes}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} />
            <Tooltip
              formatter={(value) =>
                typeof value === 'number'
                  ? value.toLocaleString('pt-BR')
                  : value
              }
            />
            <Bar dataKey="total_cancelamentos_mes" fill="#F45742">
              <LabelList
                dataKey="total_cancelamentos_mes"
                position="inside"
                fill="#fff"
                formatter={(value) =>
                  typeof value === 'number'
                    ? value.toLocaleString('pt-BR')
                    : ''
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ color: '#fff' }}>Carregando dados...</p>
      )}

                        </div>

                 <div className='card2-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Total</h1>
                    <h1 className='h2-card2-div--geral-dados'>{totalCancelamentoMes}</h1>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {cancelamentosBaseSelecionado ? cancelamentosBaseSelecionado.meta : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {cancelamentosBaseSelecionado
                        ? `${(
                            (totalCancelamentoMes / parseFloat(cancelamentosBaseSelecionado.meta)) *
                            100
                          ).toFixed(1)}%`
                        : '—'}
                    </h2>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {cancelamentosBaseSelecionado ? cancelamentosBaseSelecionado.super_meta : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {cancelamentosBaseSelecionado
                        ? `${(
                            (totalCancelamentoMes /
                              parseFloat(cancelamentosBaseSelecionado.super_meta)) *
                            100
                          ).toFixed(1)}%`
                        : '—'}
                    </h2>
                  </div>



                    </div>
                </div>


                       <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>PERCENTUAL DE CHURN</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                {cancelamentosMesPorcentos.length > 0 ? (
  <ResponsiveContainer width="90%" height={270}>
    <BarChart data={cancelamentosMesPorcentos}>
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
      <YAxis tick={{ fill: '#fff' }} domain={[0, 'auto']} />
      <Tooltip
        formatter={(value) =>
          typeof value === 'number'
            ? `${value.toFixed(2)}%`
            : value
        }
      />
      <Bar dataKey="churn_mensal" fill="#F45742">
        <LabelList
          dataKey="churn_mensal"
          position="inside"
          fill="#fff"
          formatter={(value) =>
            typeof value === 'number'
              ? `${value.toFixed(2)}%`
              : ''
          }
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
) : (
  <p style={{ color: '#fff' }}>Carregando dados...</p>
)}

                        </div>

                <div className='card2-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Total</h1>
  <h1 className='h2-card2-div--geral-dados'>{totalCancelamentoMesPorcentos}%</h1>
</div>

<div className='card3-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Meta</h1>
  <h1 className='h2-card2-div--geral-dados'>
    {metaChurnSelecionada?.meta
      ? `${(parseFloat(metaChurnSelecionada.meta) * 100).toFixed(2)}%`
      : '—'}
  </h1>
  <h2 className='h3-card2-div--geral-dados'>
    {metaChurnSelecionada?.meta
      ? `${(
          (parseFloat(totalCancelamentoMesPorcentos) /
            (parseFloat(metaChurnSelecionada.meta) * 100)) *
          100
        ).toFixed(1)}%`
      : '—'}
  </h2>
</div>

<div className='card3-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
  <h1 className='h2-card2-div--geral-dados'>
    {metaChurnSelecionada?.super_meta
      ? `${(parseFloat(metaChurnSelecionada.super_meta) * 100).toFixed(2)}%`
      : '—'}
  </h1>
  <h2 className='h3-card2-div--geral-dados'>
    {metaChurnSelecionada?.super_meta
      ? `${(
          (parseFloat(totalCancelamentoMesPorcentos) /
            (parseFloat(metaChurnSelecionada.super_meta) * 100)) *
          100
        ).toFixed(1)}%`
      : '—'}
  </h2>
</div>



                    </div>
                </div>


                    <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>CANCELAMENTOS POR SOLICITAÇÃO</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                   {cancelamentosMesPedidos.length > 0 ? (
        <ResponsiveContainer width="90%" height={270}>
          <BarChart data={cancelamentosMesPedidos}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} />
            <Tooltip
              formatter={(value) =>
                typeof value === 'number'
                  ? value.toLocaleString('pt-BR')
                  : value
              }
            />
         <Bar dataKey="total_cancelamentos_pedido" fill="#F45742">
  <LabelList
    dataKey="total_cancelamentos_pedido"
    position="inside"
    fill="#fff"
    formatter={(value) =>
      typeof value === 'number'
        ? value.toLocaleString('pt-BR')
        : ''
    }
  />
</Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ color: '#fff' }}>Carregando dados...</p>
      )}

                        </div>

                 <div className='card2-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Total</h1>
                    <h1 className='h2-card2-div--geral-dados'>{cancelamentosPedido}</h1>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {cancelamentosSolicitacaoSelecionado ? cancelamentosSolicitacaoSelecionado.meta : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {cancelamentosSolicitacaoSelecionado
                        ? `${(
                            (cancelamentosPedido / parseFloat(cancelamentosSolicitacaoSelecionado.meta)) *
                            100
                          ).toFixed(1)}%`
                        : '—'}
                    </h2>
                  </div>

                  <div className='card3-div--geral-dados'>
                    <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
                    <h1 className='h2-card2-div--geral-dados'>
                      {cancelamentosSolicitacaoSelecionado ? cancelamentosSolicitacaoSelecionado.super_meta : '—'}
                    </h1>
                    <h2 className='h3-card2-div--geral-dados'>
                      {cancelamentosSolicitacaoSelecionado
                        ? `${(
                            (cancelamentosPedido / parseFloat(cancelamentosSolicitacaoSelecionado.super_meta)) *
                            100
                          ).toFixed(1)}%`
                        : '—'}
                    </h2>
                  </div>


                    </div>
                </div>


              <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>CANCELAMENTOS POR INADIMPLÊNCIA</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>
                   {cancelamentosMesAutomatico.length > 0 ? (
                        <ResponsiveContainer width="90%" height={270}>
                            <BarChart data={cancelamentosMesAutomatico}>
                              <CartesianGrid strokeDasharray="2 2" />
                              <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
                              <YAxis tick={{ fill: '#fff' }} />
                              <Tooltip
                                formatter={(value) =>
                                  typeof value === 'number'
                                    ? value.toLocaleString('pt-BR')
                                    : value
                                }
                              />
                              <Bar dataKey="total_cancelamentos_pedido" fill="#F45742">
                                <LabelList
                                  dataKey="total_cancelamentos_pedido"
                                  position="inside"
                                  fill="#fff"
                                  formatter={(value) =>
                                    typeof value === 'number'
                                      ? value.toLocaleString('pt-BR')
                                      : ''
                                  }
                                />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>


      ) : (
        <p style={{ color: '#fff' }}>Carregando dados...</p>
      )}

                        </div>

                <div className='card2-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Total</h1>
  <h1 className='h2-card2-div--geral-dados'>{cancelamentosAutomatico}</h1>
</div>

<div className='card3-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Meta</h1>
  <h1 className='h2-card2-div--geral-dados'>
    {cancelamentosInadimplenciaSelecionado ? cancelamentosInadimplenciaSelecionado.meta : '—'}
  </h1>
  <h2 className='h3-card2-div--geral-dados'>
    {cancelamentosInadimplenciaSelecionado
      ? `${(
          (cancelamentosAutomatico / parseFloat(cancelamentosInadimplenciaSelecionado.meta)) *
          100
        ).toFixed(1)}%`
      : '—'}
  </h2>
</div>

<div className='card3-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
  <h1 className='h2-card2-div--geral-dados'>
    {cancelamentosInadimplenciaSelecionado
      ? cancelamentosInadimplenciaSelecionado.super_meta
      : '—'}
  </h1>
  <h2 className='h3-card2-div--geral-dados'>
    {cancelamentosInadimplenciaSelecionado
      ? `${(
          (cancelamentosAutomatico /
            parseFloat(cancelamentosInadimplenciaSelecionado.super_meta)) *
          100
        ).toFixed(1)}%`
      : '—'}
  </h2>
</div>



                    </div>
                </div>


               <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'>RETENÇÃO DE CLIENTES (CS)</h1>

                    <div className='card-geral-dados'>

                            
                      <div className='card1-div--geral-dados'>
  <h1 className='h1-card1-div--geral-dados'>Comparativo</h1>

  {totalAtendimentosUltimos.length > 0 ? (
    <ResponsiveContainer width="90%" height={270}>
      <BarChart data={totalAtendimentosUltimos}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="mes" tick={{ fill: '#fff' }} />
        <YAxis tick={{ fill: '#fff' }} unit="%" />
        <Tooltip
          formatter={(value) =>
            typeof value === 'number'
              ? `${value.toFixed(2)}%`
              : value
          }
        />
        <Bar dataKey="percentual_sucesso" fill="#F45742">
          <LabelList
            dataKey="percentual_sucesso"
            position="inside"
            fill="#fff"
            formatter={(value) => `${value}%`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <p style={{ color: '#fff' }}>Carregando dados...</p>
  )}
</div>
                  <div className='card2-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Total</h1>
  <h1 className='h2-card2-div--geral-dados'>{totalAtendimentos}%</h1>
</div>

<div className='card3-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Meta</h1>
  <h1 className='h2-card2-div--geral-dados'>
    {retencaoCSSelecionado
      ? (parseFloat(retencaoCSSelecionado.meta) * 100).toFixed(2) + '%'
      : '—'}
  </h1>
  <h2 className='h3-card2-div--geral-dados'>
    {retencaoCSSelecionado
      ? `${(
          (parseFloat(totalAtendimentos) /
            (parseFloat(retencaoCSSelecionado.meta) * 100)) *
          100
        ).toFixed(1)}%`
      : '—'}
  </h2>
</div>

<div className='card3-div--geral-dados'>
  <h1 className='h1-card2-div--geral-dados'>Super Meta</h1>
  <h1 className='h2-card2-div--geral-dados'>
    {retencaoCSSelecionado
      ? (parseFloat(retencaoCSSelecionado.super_meta) * 100).toFixed(2) + '%'
      : '—'}
  </h1>
  <h2 className='h3-card2-div--geral-dados'>
    {retencaoCSSelecionado
      ? `${(
          (parseFloat(totalAtendimentos) /
            (parseFloat(retencaoCSSelecionado.super_meta) * 100)) *
          100
        ).toFixed(1)}%`
      : '—'}
  </h2>
</div>




                    </div>
                </div>

                   {loading && (
                <div className="loading-overlay">
                  <div className="loading-progress"></div>
                </div>
              )}

    </div>
  )
}

export default DashboardClientesgerencial