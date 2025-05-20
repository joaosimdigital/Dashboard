import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, PieChart, Pie, Cell } from 'recharts';

import logobranca from '../Images/logobrnaca.png'
import '../CSS/DashboardChurnGerencial.css'
import '../CSS/DashboardClientesgerencial.css'


const formatValorCompacto = (valor) => {
  if (valor >= 1_000_000_000) return `${(valor / 1_000_000_000).toFixed(1)}B`;
  if (valor >= 1_000_000) return `${(valor / 1_000_000).toFixed(1)}M`;
  if (valor >= 1_000) return `${(valor / 1_000).toFixed(1)}K`;
  return valor.toFixed(0);
};

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


  useEffect(() => {
   const fetchClientesAtivos = async () => {
      try {
        const response = await fetch('http://localhost:3009/clientestotal-ultimos4meses');
        const data = await response.json();

        const dados = data.dados.map(item => ({
          mes: item.mes,
          total: item.total_contratos_ate_primeira_data,
        }));

        setClientesAtivosMeses(dados);

        // Último mês (o mais recente na lista)
        if (dados.length > 0) {
          const ultimo = dados[dados.length - 1];
          setTotalClientesUltimoMes(ultimo.total);
        }

      } catch (error) {
        console.error('Erro ao buscar clientes ativos dos últimos 4 meses:', error);
      }
    };



    const fetchTotalClientes = async () => {
      try {
        const response = await fetch('http://localhost:3009/clientestotal-ultimomes');
        const data = await response.json();
        setTotalClientesUltimoMes(parseInt(data.total_clientes, 10));
      } catch (error) {
        console.error('Erro ao buscar total de clientes do último mês:', error);
      }
    };


       const fetchClientesVendas = async () => {
      try {
        const response = await fetch('http://localhost:3009/totalclientes4meses');
        const data = await response.json();

        const formatado = data.meses.map(item => ({
          mes: `${String(item.mes).padStart(2, '0')}/${item.ano}`,  // Ex: "03/2025"
          total_clientes: item.total_clientes
        }));

        setVendasUltimosMeses(formatado);
      } catch (error) {
        console.error('Erro ao buscar clientes dos últimos 4 meses:', error);
      }
    };


     const fetchTotal = async () => {
      try {
        const response = await fetch('http://localhost:3009/totalclientes-mesatual');
        const data = await response.json();
        setTotalClientes(data.total_clientes);
      } catch (error) {
        console.error('Erro ao buscar total de clientes do mês atual:', error);
      }
    };


    const fetchCrescimento = async () => {
  try {
    const response = await fetch('http://localhost:3009/clientestotal-crescimento');
    const data = await response.json();

    // Remove o primeiro item (com crescimento null)
    const dadosFiltrados = data.clientes_acumulados.slice(1).map(item => ({
      mes: item.mes,
      crescimento: item.crescimento
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

        setCrescimento(data.crescimento);
      
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
    const response = await fetch('http://localhost:3009/total-clientes-ultimos4meses');
    const data = await response.json();

    const dadosFormatados = data.meses.map((item) => ({
      mes: `${String(item.mes).padStart(2, '0')}/${item.ano}`,
      total_clientes: parseInt(item.total_clientes)
    }));

    setDadosNovosClientes(dadosFormatados);
  } catch (error) {
    console.error('Erro ao buscar dados de novos clientes:', error);
  }
};

    const fetchTotalClientesNovos = async () => {
      try {
        const response = await fetch('http://localhost:3009/total-clientes-mespassado');
        const data = await response.json();

        setTotal(data.total_clientes);
        
      } catch (error) {
        console.error('Erro ao buscar total de clientes do mês passado:', error);
      }
    };


     const fetchTicketMedio = async () => {
      try {
        const response = await fetch('http://localhost:3009/ticket-medio-mespassado');
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

        setTotalPJ(parseInt(data.total_cadastros_pf));
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


    fetchChurnDataporcentos();
    buscarCancelamentosporcentos();
    buscarCancelamentos();
    fetchChurnData();
    fetchCadastrosPJUltimos();
    fetchCadastrosPFUltimos();
    fetchCadastrosPF();   
    fetchCadastrosPJ();
    fetchCadastrosNovo();
    fetchCadastros();
    fetchTicketMedioUltimos();
    fetchTicketMedio();
    fetchTotalClientesNovos();
    fetchNovosClientes();
    fetchFaturamento();
    fetchValorPago();
    fetchCrescimentoMesAtual();
    fetchCrescimento();
    fetchTotal();
    fetchTotalClientes();
    fetchClientesVendas();
    fetchClientesAtivos();
  }, []);

    const churnUltimosMeses = [
  { mes: 'Fev/25', churn: 3.89 },
  { mes: 'Mar/25', churn: 5.12 },
  { mes: 'Abr/25', churn: 4.01 },
  { mes: 'Mai/25', churn: 3.45 }
];


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
          className='button-body-opcao'>
        </select>
      </div>

                   <div className='div-body-opcao1'>
        <h1 className='h1-body-opcao'>Estado</h1>
        <select
          className='button-body-opcao'>
        </select>
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
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{totalClientes}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{crescimento}%</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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
                                                position="insideTop"
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{valorAbreviado}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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
                position="insideTop"
                fill="#fff"
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>R$ {ticketMedio}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{totalclientesnovos}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{totalCadastros}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{totalPF}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{totalPJ}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{totalCancelamentoMes}</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
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

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>{totalCancelamentoMesPorcentos}%</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
                    </div>



                    </div>
                </div>



    </div>
  )
}

export default DashboardClientesgerencial