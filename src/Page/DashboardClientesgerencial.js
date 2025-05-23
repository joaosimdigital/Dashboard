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
const [mesSelecionado, setMesSelecionado] = useState(getMesAtual());
const [estadoSelecionado, setEstadoSelecionado] = useState('Todos');


     const mesAtual = getMesAtual();

      const metaSelecionada = datageral.find(item =>
            item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
            item.base?.trim().toLowerCase() === 'geral' &&
            item.indicador?.trim().toLowerCase() === 'meta de número clientes ativos'
          );

         const metaChurnSelecionada = datageral.find(item =>
    item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
    item.base?.trim().toLowerCase() === 'geral' &&
    item.indicador?.trim().toLowerCase() === 'meta de churn (base final do mês)'
  );

        const incrementoSelecionado = datageral?.find(item =>
              item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
              item.base?.trim().toLowerCase() === 'geral' &&
              item.indicador?.trim().toLowerCase() === 'incremento de clientes na base'
            );

        const crescimentoSelecionado = datageral?.find(item =>
              item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
              item.base?.trim().toLowerCase() === 'geral' &&
              item.indicador?.trim().toLowerCase() === '% de crescimento ao mês passado'
            );

        
            const faturamentoSelecionado = datageral?.find(item =>
                item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
                item.base?.trim().toLowerCase() === 'geral' &&
                item.indicador?.trim().toLowerCase() === 'faturamento mensal'
              );

        const ticketSelecionado = datageral?.find(item =>
              item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
              item.base?.trim().toLowerCase() === 'geral' &&
              item.indicador?.trim().toLowerCase() === 'ticket médio geral'
            );


        const novosClientesSelecionado = datageral?.find(item =>
            item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
            item.base?.trim().toLowerCase() === 'geral' &&
            item.indicador?.trim().toLowerCase() === 'meta de novos clientes (ativação)'
          );


        const novasVendasSelecionado = datageral?.find(item =>
            item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
            item.base?.trim().toLowerCase() === 'geral' &&
            item.indicador?.trim().toLowerCase() === 'meta de novas vendas geral'
          );


          const novasVendasB2CSelecionado = datageral?.find(item =>
          item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
          item.base?.trim().toLowerCase() === 'geral' &&
          item.indicador?.trim().toLowerCase() === 'meta de novas vendas b2c'
        );

        const novasVendasB2BSelecionado = datageral?.find(item =>
          item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
          item.base?.trim().toLowerCase() === 'geral' &&
          item.indicador?.trim().toLowerCase() === 'meta de novas vendas b2b'
        );


        const cancelamentosBaseSelecionado = datageral?.find(item =>
            item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
            item.base?.trim().toLowerCase() === 'geral' &&
            item.indicador?.trim().toLowerCase() === 'número de cancelamentos (base)'
          );

          const cancelamentosSolicitacaoSelecionado = datageral?.find(item =>
            item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
            item.base?.trim().toLowerCase() === 'geral' &&
            item.indicador?.trim().toLowerCase() === 'cancelamentos (por solicitação)'
          );

          const cancelamentosInadimplenciaSelecionado = datageral?.find(item =>
            item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
            item.base?.trim().toLowerCase() === 'geral' &&
            item.indicador?.trim().toLowerCase() === 'cancelamentos (inadimplencia)'
          );


          const retencaoCSSelecionado = datageral?.find(item =>
            item.data?.trim().toLowerCase() === mesAtual.toLowerCase() &&
            item.base?.trim().toLowerCase() === 'geral' &&
            item.indicador?.trim().toLowerCase() === 'meta de taxa de retenção cs'
          );

            // Gera automaticamente os meses até o mês atual de 2025
const mesesDisponiveis = (() => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  if (ano !== 2025) return [];
  const mesAtualIndex = hoje.getMonth();
  return nomesMeses.slice(0, mesAtualIndex + 1).map(m => `${m}/25`);
})();


  useEffect(() => {
  
    const fetchClientesAtivos = async () => {
  try {
    const response = await fetch('http://localhost:3009/clientestotal-ultimos4meses');
    const data = await response.json();

    const mesAtual = new Date();
    const mesAtualFormatado = `${String(mesAtual.getMonth() + 1).padStart(2, '0')}/${mesAtual.getFullYear()}`;

    let valorMesAtual = 0;

    const dadosFiltrados = data.dados.filter(item => {
      if (item.mes === mesAtualFormatado) {
        valorMesAtual = item.total_contratos_ate_primeira_data;
        return false; // exclui do gráfico
      }
      return true; // mantém no gráfico
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


       const fetchClientesVendas = async () => {
      try {
        const response = await fetch('http://localhost:3009/clientes-entrantes-reais-ultimos4meses');
        const data = await response.json();

        const formatado = data.dados.map(item => ({
          mes: `${String(item.mes).padStart(2, '0')}/${item.ano}`,  // Ex: "03/2025"
          total_clientes: item.clientes_reais
        }));

        setVendasUltimosMeses(formatado);
      } catch (error) {
        console.error('Erro ao buscar clientes dos últimos 4 meses:', error);
      }
    };


     const fetchTotal = async () => {
      try {
        const response = await fetch('http://localhost:3009/clientes-entrantes-reais');
        const data = await response.json();
        setTotalClientes(data.clientes_reais);
      } catch (error) {
        console.error('Erro ao buscar total de clientes do mês atual:', error);
      }
    };


    const fetchCrescimento = async () => {
  try {
    const response = await fetch('http://localhost:3009/clientestotal-crescimento');
    const data = await response.json();

    // Remove o primeiro item (com crescimento null)
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
        const response = await fetch('http://localhost:3009/clientestotal-crescimento-mesatual');
        const data = await response.json();

        setCrescimento(data.dados.crescimento_percentual);
      
      } catch (error) {
        console.error('Erro ao buscar crescimento do mês atual:', error);
      }
    };


    const fetchValorPago = async () => {
  try {
    const response = await fetch('http://localhost:3009/valortotalpago-mespassado');
    const data = await response.json();

    const valorNumerico = data.total_pago_mes_passado || 0;
    setValorAbreviado(formatValorCompacto(valorNumerico));
  } catch (error) {
    console.error('Erro ao buscar valor total pago do mês passado:', error);
  }
};


   const fetchFaturamento = async () => {
      try {
        const response = await fetch('http://localhost:3009/valortotalpago-ultimos4meses');
        const data = await response.json();

        setDadosReal(data.ultimos_4_meses || []);
      } catch (error) {
        console.error('Erro ao buscar dados de faturamento:', error);
      }
    };


     const fetchNovosClientes = async () => {
  try {
    const response = await fetch('http://localhost:3009/total-clientes-habilitados-ultimos4meses');
    const data = await response.json();

    const dadosFormatados = data.dados.map((item) => ({
      mes: `${String(item.mes).padStart(2, '0')}/${item.ano}`,
      total_clientes: parseInt(item.total_clientes_habilitados)
    }));

    setDadosNovosClientes(dadosFormatados);
  } catch (error) {
    console.error('Erro ao buscar dados de novos clientes:', error);
  }
};

    const fetchTotalClientesNovos = async () => {
      try {
        const response = await fetch('http://localhost:3009/total-clientes-habilitados-mespassado');
        const data = await response.json();

        setTotal(data.total_clientes_habilitados);
        
      } catch (error) {
        console.error('Erro ao buscar total de clientes do mês passado:', error);
      }
    };


     const fetchTicketMedio = async () => {
      try {
        const response = await fetch('http://localhost:3009/ticket-medio-mesatual');
        const data = await response.json();

        setTicketMedio(parseFloat(data.ticket_medio));

      } catch (error) {
        console.error('Erro ao buscar ticket médio do mês passado:', error);
      }
    };
    


    const fetchTicketMedioUltimos = async () => {
      try {
        const response = await fetch('http://localhost:3009/ticket-medio-ultimos4meses');
        const data = await response.json();

        const formatado = data.ticket_medio_ultimos_4_meses.map(item => ({
          mes: item.mes,
          ticket_medio: parseFloat(item.ticket_medio)
        }));

        setDadosTicketMedio(formatado);
      } catch (error) {
        console.error('Erro ao buscar ticket médio:', error);
      }
    };


      const fetchCadastros = async () => {
      try {
        const response = await fetch('http://localhost:3009/cadastrostotal-mespassado');
        const data = await response.json();

        setTotalCadastros(parseInt(data.total_cadastros));
      } catch (error) {
        console.error('Erro ao buscar total de cadastros do mês passado:', error);
      }
    };


      const fetchCadastrosNovo = async () => {
      try {
        const response = await fetch('http://localhost:3009/cadastrostotal-ultimos4meses');
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

      const fetchCadastrosPFUltimos = async () => {
      try {
        const response = await fetch('http://localhost:3009/cadastrospf-ultimos4meses');
        const data = await response.json();

        // Corrige nome incorreto (retorno está como total_cadastros_pj)
        const formatado = data.cadastros_pj_ultimos_4_meses?.map(item => ({
          mes: item.mes,
          total_clientes: parseInt(item.total_cadastros_pj || 0)
        })) || [];

        setCadastrosNovoPF(formatado);
      } catch (error) {
        console.error('Erro ao buscar cadastros PF:', error);
      }
    };


      const fetchCadastrosPJUltimos = async () => {
      try {
        const response = await fetch('http://localhost:3009/cadastrospj-ultimos4meses');
        const data = await response.json();

        // Corrige nome incorreto (retorno está como total_cadastros_pj)
        const formatado = data.cadastros_pj_ultimos_4_meses?.map(item => ({
          mes: item.mes,
          total_clientes: parseInt(item.total_cadastros_pj || 0)
        })) || [];

        setCadastrosNovoPJ(formatado);
      } catch (error) {
        console.error('Erro ao buscar cadastros PF:', error);
      }
    };

       const fetchCadastrosPJ = async () => {
      try {
        const response = await fetch('http://localhost:3009/cadastrospj-mespassado');
        const data = await response.json();

        setTotalPJ(parseInt(data.total_cadastros_pj));
      } catch (error) {
        console.error('Erro ao buscar cadastros de PF do mês passado:', error);
      }
    };


      const fetchCadastrosPF = async () => {
      try {
        const response = await fetch('http://localhost:3009/cadastrospf-mespassado');
        const data = await response.json();

        setTotalPF(parseInt(data.total_cadastros_pf));
      } catch (error) {
        console.error('Erro ao buscar cadastros de PF do mês passado:', error);
      }
    };

     const fetchChurnData = async () => {
      try {
        const response = await fetch('http://localhost:3009/churn-mensal');
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        const data = await response.json();
        setTotalCancelamentoMes(data.total_cancelamentos_mes);
      } catch (error) {
        console.error('Erro ao buscar churn mensal:', error);
      }
    };


      const buscarCancelamentos = async () => {
      try {
        const resposta = await fetch('http://localhost:3009/churn-mensal-ultimos');
        if (!resposta.ok) throw new Error('Erro na requisição');
        const dados = await resposta.json();

        // Opcional: transformar número do mês em nome
        const nomesMeses = [
          '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];
        const dadosFormatados = dados.map(item => ({
          mes: `${nomesMeses[item.mes]}/${item.ano.toString().slice(-2)}`, // exemplo: "Abr/25"
          total_cancelamentos_mes: item.total_cancelamentos_mes
        }));

        setCancelamentosMes(dadosFormatados);
      } catch (erro) {
        console.error('Erro ao buscar churn mensal:', erro);
      }
    };


     const fetchChurnDataporcentos = async () => {
      try {
        const response = await fetch('http://localhost:3009/churn-mensal');
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        const data = await response.json();
        setTotalCancelamentoMesPorcentos(data.churn_mensal);
      } catch (error) {
        console.error('Erro ao buscar churn mensal:', error);
      }
    };


      const buscarCancelamentosporcentos = async () => {
      try {
        const resposta = await fetch('http://localhost:3009/churn-mensal-ultimos');
        if (!resposta.ok) throw new Error('Erro na requisição');
        const dados = await resposta.json();

        // Opcional: transformar número do mês em nome
        const nomesMeses = [
          '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];
        const dadosFormatados = dados.map(item => ({
          mes: `${nomesMeses[item.mes]}/${item.ano.toString().slice(-2)}`, // exemplo: "Abr/25"
          total_cancelamentos_mes: item.churn_mensal
        }));

        setCancelamentosMesPorcentos(dadosFormatados);
      } catch (erro) {
        console.error('Erro ao buscar churn mensal:', erro);
      }
    };


    const buscarCancelamentosPedido = async () => {
      try {
        const resposta = await fetch('http://localhost:3009/cancelamentos-por-pedido-mes-passado');
        if (!resposta.ok) throw new Error('Erro ao buscar dados');
        const dados = await resposta.json();

        setCancelamentosPedido(dados.total_cancelamentos_pedido);
      } catch (erro) {
        console.error('Erro ao buscar cancelamentos por pedido do cliente:', erro);
      }
    };

    const buscarCancelamentosUltimos = async () => {
      try {
        const resposta = await fetch('http://localhost:3009/cancelamentos-por-pedido-ultimos-4-meses');
        if (!resposta.ok) throw new Error('Erro na API');
        const dados = await resposta.json();

        const nomesMeses = [
          '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];

        // Formata para: { mes: 'Abr/25', total_cancelamentos_mes: ... }
        const dadosFormatados = dados.map(item => ({
          mes: `${nomesMeses[item.mes]}/${item.ano.toString().slice(-2)}`,
          total_cancelamentos_mes: item.total_cancelamentos_pedido
        }));

        setCancelamentosMesPedidos(dadosFormatados);
      } catch (erro) {
        console.error('Erro ao buscar cancelamentos por pedido:', erro);
      }
    };


    
    const buscarCancelamentosautomatico = async () => {
      try {
        const resposta = await fetch('http://localhost:3009/cancelamentos-por-automatico-mes-passado');
        if (!resposta.ok) throw new Error('Erro ao buscar dados');
        const dados = await resposta.json();

        setCancelamentosAutomatico(dados.total_cancelamentos_pedido);
      } catch (erro) {
        console.error('Erro ao buscar cancelamentos por pedido do cliente:', erro);
      }
    };

    const buscarCancelamentosUltimosAutomatico = async () => {
      try {
        const resposta = await fetch('http://localhost:3009/cancelamentos-por-automatico-ultimos-4-meses');
        if (!resposta.ok) throw new Error('Erro na API');
        const dados = await resposta.json();

        const nomesMeses = [
          '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];

        // Formata para: { mes: 'Abr/25', total_cancelamentos_mes: ... }
        const dadosFormatados = dados.map(item => ({
          mes: `${nomesMeses[item.mes]}/${item.ano.toString().slice(-2)}`,
          total_cancelamentos_mes: item.total_cancelamentos_pedido
        }));

        setCancelamentosMesAutomatico(dadosFormatados);
      } catch (erro) {
        console.error('Erro ao buscar cancelamentos por pedido:', erro);
      }
    };



     const buscarAtendimentos = async () => {
      try {
        const resposta = await fetch('http://localhost:3009/atendimentos-tipo-mes-passado');
        if (!resposta.ok) throw new Error('Erro ao buscar atendimentos');
        const dados = await resposta.json();

        setTotalAtendimentos(dados.percentual_sucesso);
      } catch (erro) {
        console.error('Erro ao carregar os atendimentos:', erro);
      }
    };

    const buscarAtendimentosUltimos = async () => {
      try {
        const resposta = await fetch('http://localhost:3009/atendimentos-tipo-ultimos-4-meses');
        if (!resposta.ok) throw new Error('Erro na requisição');
        const dados = await resposta.json();

        const nomesMeses = [
          '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];

        const dadosFormatados = dados.map(item => ({
          mes: `${nomesMeses[item.mes]}/${item.ano.toString().slice(-2)}`,
          percentual_sucesso: parseFloat(item.percentual_sucesso)
        }));


        setTotalAtendimentosUltimos(dadosFormatados);
      } catch (erro) {
        console.error('Erro ao carregar dados de atendimentos tipo 257:', erro);
      }
    };

     const atualizarPeriodicamente = () => {
    fetchClientesAtivos();
    fetchClientesVendas();
    fetchTotal();
    fetchCrescimento();
    fetchCrescimentoMesAtual();
    fetchValorPago();
    fetchFaturamento();
    fetchNovosClientes();
    fetchTotalClientesNovos();
    fetchTicketMedio();
    fetchTicketMedioUltimos();
    fetchCadastros();
    fetchCadastrosNovo();
    fetchCadastrosPF();
    fetchCadastrosPJ();
    fetchCadastrosPFUltimos();
    fetchCadastrosPJUltimos();
    fetchChurnData();
    fetchChurnDataporcentos();
    buscarCancelamentos();
    buscarCancelamentosporcentos();
    buscarCancelamentosPedido();
    buscarCancelamentosUltimos();
    buscarCancelamentosautomatico();
    buscarCancelamentosUltimosAutomatico();
    buscarAtendimentos();
    buscarAtendimentosUltimos();
  };

  // Executa imediatamente na primeira renderização
  atualizarPeriodicamente();

  const intervalo = setInterval(atualizarPeriodicamente, 10000); // 60 segundos

  return () => clearInterval(intervalo); // limpeza quando o componente desmontar
}, []);


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
                  <select className='button-body-opcao' defaultValue="Todos">
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
                        <h1  className='h2-card2-div--geral-dados'>{totalClientesUltimoMes}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1  className='h2-card2-div--geral-dados'>{metaSelecionada ? metaSelecionada.meta : '—'}</h1>

                        <h2 className='h3-card2-div--geral-dados'>
                        {metaSelecionada
                          ? `${((totalClientesUltimoMes / parseFloat(metaSelecionada.meta)) * 100).toFixed(2)}%`
                          : '—'}
                      </h2>
                        
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                         <h1  className='h2-card2-div--geral-dados'>{metaSelecionada ? metaSelecionada.super_meta : '—'}</h1>
                         
                    <h2 className='h3-card2-div--geral-dados'>
                    {metaSelecionada
                      ? `${((totalClientesUltimoMes / parseFloat(metaSelecionada.super_meta)) * 100).toFixed(2)}%`
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
                            100
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
                            10000
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

    </div>
  )
}

export default DashboardClientesgerencial