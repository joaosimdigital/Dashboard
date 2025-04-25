import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';



import logobranca from '../Images/logobrnaca.png'
import grafico from '../Images/chart-graphic.png'
import '../CSS/DashboardChurnGerencial.css'

function DashboardChurnGerencial() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [anoSelecionado, setAnoSelecionado] = useState(currentYear);
  const [mesSelecionado, setMesSelecionado] = useState(currentMonth);
    const [churnMensal, setChurnMensal] = useState(null);
    const [projecao, setProjecao] = useState(0);
    const [cancelamentosPJ, setCancelamentosPJ] = useState(0);
    const [cancelamentosPF, setCancelamentosPF] = useState(0);
    const [churnUltimosMeses, setChurnUltimosMeses] = useState([]);
    const [churnPorBairro, setChurnPorBairro] = useState([]);
    const [churnPorCidade, setChurnPorCidade] = useState([]);
    const [downgradeAtendimentos, setDowngradeAtendimentos] = useState([]);
    const [motivosCancelamentos, setMotivosCancelamentos] = useState([]);
    const [atendimentosTipo257, setAtendimentosTipo257] = useState([]);
    const [valorMensalCancelamento, setValorMensalCancelamento] = useState(0);
    const [valorAnualCancelamento, setValorAnualCancelamento] = useState(0);
    const [churnAnual, setChurnAnual] = useState([]);
    const [clientesHabilitados12Meses, setClientesHabilitados12Meses] = useState([]);
    const [cancelamentosDetalhados, setCancelamentosDetalhados] = useState([]);
    const [clientesRepetidos, setClientesRepetidos] = useState([]);
    const [clientesRepetidosAtendimento, setClientesRepetidosAtendimento] = useState([]);
    const [motivoSelecionado, setMotivoSelecionado] = useState(null);
    const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
    const [bairroSelecionado, setBairroSelecionado] = useState(null);
    const [statusMeta, setStatusMeta] = useState('');
    



    


    useEffect(() => {
    if (anoSelecionado && mesSelecionado) {
        const fetchChurnMensal = async () => {
        try {
            const response = await fetch(`http://38.224.145.3:3007/churn-mensal?ano=${anoSelecionado}&mes=${mesSelecionado}`);
            const data = await response.json();
            if (response.ok) {
            setChurnMensal(data.total_cancelamentos_mes);
            
            } else {
            console.error('Erro:', data.error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
        };


        const fetchChurnTipoPessoa = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/churn-mensal_tipo_pessoa?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok) {
                setCancelamentosPJ(data.cancelamentos.PJ || 0);
                setCancelamentosPF(data.cancelamentos.PF || 0);
              } else {
                console.error('Erro:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição de tipos de pessoa:', error);
            }
          };

          const fetchChurn3Meses = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/churn-mensal-3meses?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
          
              if (response.ok) {
                // Converter número do mês para nome
                const nomesMeses = [
                  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                ];
          
                const dadosFormatados = data.map(item => ({
                  mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
                  churn: item.churn_mensal
                }));
          
                setChurnUltimosMeses(dadosFormatados);
              } else {
                console.error('Erro ao buscar últimos 3 meses:', data.error);
              }
            } catch (error) {
              console.error('Erro ao buscar churn últimos meses:', error);
            }
          };

          const fetchChurnPorBairro = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/churn-bairro?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok) {
                setChurnPorBairro(data);
              } else {
                console.error('Erro ao buscar churn por bairro:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição de churn por bairro:', error);
            }
          };


          const fetchChurnPorCidade = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/churn-cidade?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok) {
                setChurnPorCidade(data);
              } else {
                console.error('Erro ao buscar churn por cidade:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição de churn por cidade:', error);
            }
          };

          const fetchDowngradeAtendimentos = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/atendimentos_tipo_downgrade`);
              const data = await response.json();
              if (response.ok) {
                const nomesMeses = [
                  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                ];
          
                const ultimos3Meses = data.meses.slice(-3).map(item => ({
                  mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
                  total: item.total_atendimentos
                }));
          
                setDowngradeAtendimentos(ultimos3Meses);
              } else {
                console.error('Erro na requisição downgrade:', data.error);
              }
            } catch (error) {
              console.error('Erro ao buscar atendimentos downgrade:', error);
            }
          };


          const fetchMotivosCancelamento = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/motivos_cancelamentos?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok) {
                setMotivosCancelamentos(data.motivos);
              } else {
                console.error('Erro ao buscar motivos:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição de motivos de cancelamento:', error);
            }
          };

          const fetchAtendimentosTipo257 = async () => {
            if (!anoSelecionado || !mesSelecionado) return;
          
            // Array para os últimos 3 meses retroativos
            const meses = [];
            const nomesMeses = [
              'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
              'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
            ];
          
            let dataBase = new Date(anoSelecionado, mesSelecionado - 1, 1); // Mês base
            for (let i = 2; i >= 0; i--) {
              const data = new Date(dataBase.getFullYear(), dataBase.getMonth() - i, 1);
              const mes = data.getMonth() + 1;
              const ano = data.getFullYear();
          
              meses.push({
                mes,
                ano,
                label: `${nomesMeses[mes - 1]}/${ano.toString().slice(-2)}`
              });
            }
          
            try {
              const responses = await Promise.all(meses.map(async ({ mes, ano, label }) => {
                const response = await fetch(`http://38.224.145.3:3007/atendimentos_tipo?mes=${mes}&ano=${ano}`);
                const data = await response.json();
          
                if (response.ok && data.meses.length > 0) {
                  return {
                    mes: label,
                    total: data.meses[0].total_atendimentos
                  };
                } else {
                  return null;
                }
              }));
          
              const filtrado = responses.filter(r => r !== null);
              setAtendimentosTipo257(filtrado);
            } catch (error) {
              console.error('Erro ao buscar atendimentos tipo 257:', error);
            }
          };
          const fetchValorCancelamentoMensal = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/valor-cancelamento-mensal?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok) {
                setValorMensalCancelamento(parseFloat(data.valor_total_perdido));
              } else {
                console.error('Erro ao buscar valor mensal:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição valor mensal:', error);
            }
          };
          
          const fetchValorCancelamentoAnual = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/valor-cancelamento-anual?ano=${anoSelecionado}`);
              const data = await response.json();
              if (response.ok) {
                setValorAnualCancelamento(parseFloat(data.valor_total_perdido));
              } else {
                console.error('Erro ao buscar valor anual:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição valor anual:', error);
            }
          };


          const fetchChurnAnual = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/churn-mensal-12meses?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok) {
                const nomesMeses = [
                  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                ];
          
                const dadosFormatados = data.map(item => ({
                  mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
                  churn: item.churn_mensal
                }));
          
                setChurnAnual(dadosFormatados);
              } else {
                console.error('Erro ao buscar churn anual:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição de churn anual:', error);
            }
          };


          const fetchClientesHabilitados = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/total-clientes-habilitados-ultimos-12-meses?mes=${mesSelecionado}&ano=${anoSelecionado}`);
              const data = await response.json();
          
              if (response.ok && data.total_clientes_habilitados) {
                const nomesMeses = [
                  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                ];
          
                const dadosFormatados = data.total_clientes_habilitados.map(item => ({
                  mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
                  total: parseInt(item.total_clientes_habilitados)
                }));
          
                setClientesHabilitados12Meses(dadosFormatados);
              } else {
                console.error('Erro na resposta:', data.error);
              }
            } catch (error) {
              console.error('Erro ao buscar habilitações:', error);
            }
          };
          
          
          const fetchCancelamentosDetalhados = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/churn-descricao?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok) {
                setCancelamentosDetalhados(data.cancelamentos_detalhados || []);
              } else {
                console.error('Erro ao buscar cancelamentos detalhados:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição de cancelamentos detalhados:', error);
            }
          };


          const fetchClientesRepetidos = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/clientes-repetidos-3meses?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok && data.clientes_repetidos) {
                setClientesRepetidos(data.clientes_repetidos);
              } else {
                console.error('Erro na resposta de clientes repetidos:', data.error);
              }
            } catch (error) {
              console.error('Erro ao buscar clientes repetidos:', error);
            }
          };


          const fetchClientesRepetidosAtendimento = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/clientes-repetidos-atendimentos?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok && data.clientes_repetidos_atendimento) {
                setClientesRepetidosAtendimento(data.clientes_repetidos_atendimento);
              } else {
                console.error('Erro na resposta de atendimentos repetidos:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição de atendimentos repetidos:', error);
            }
          };
          

          const fetchStatusMeta = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3007/meta?ano=${anoSelecionado}&mes=${mesSelecionado}`);
              const data = await response.json();
              if (response.ok) {
                setStatusMeta(data.status); // "acima" ou "abaixo"
              } else {
                console.error('Erro ao buscar status da meta:', data.error);
              }
            } catch (error) {
              console.error('Erro na requisição do status da meta:', error);
            }
          };


          const fetchAll = async () => {
            await fetchChurnMensal();
            await fetchChurnTipoPessoa();
            await fetchChurn3Meses();
            await fetchChurnPorBairro();
            await fetchChurnPorCidade();
            await fetchDowngradeAtendimentos();
            await fetchMotivosCancelamento();
            await fetchAtendimentosTipo257();
            await fetchValorCancelamentoMensal();
            await fetchValorCancelamentoAnual();
            await fetchChurnAnual();
            await fetchClientesHabilitados();
            await fetchCancelamentosDetalhados();
            await fetchClientesRepetidos();
            await fetchClientesRepetidosAtendimento();
            await fetchStatusMeta();
          };
      
          // Chama a primeira vez imediatamente
          fetchAll();
      
          // Atualiza a cada 1 segundo
          const intervalo = setInterval(fetchAll, 1000);
      
          // Limpa intervalo ao desmontar ou trocar ano/mês
          return () => clearInterval(intervalo);

    }
    
    }, [anoSelecionado, mesSelecionado]);

  
    const anos = Array.from({ length: currentYear - 2018 + 1 }, (_, i) => 2018 + i);
  
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

  return (
    <div style={{backgroundColor: 'white', alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%'}}>
                <div className='head-gerencial-body'>
                    <h1 className='h1-head-gerencial-body'>DASHBOARD GERENCIAL</h1>
                    <h1  className='h2-head-gerencial-body'>CHURN</h1>
                    <img  className='logo-head-gerencial-body' src={logobranca}/>
                </div>


                <div className='div-body-opcao'>
      <div className='div-body-opcao1'>
        <h1 className='h1-body-opcao'>Ano</h1>
        <select
          className='button-body-opcao'
          value={anoSelecionado}
          onChange={(e) => setAnoSelecionado(Number(e.target.value))}
        >
          {anos.map((ano) => (
            <option key={ano} value={ano}>{ano}</option>
          ))}
        </select>
      </div>

      <div className='div-body-opcao1'>
        <h1 className='h1-body-opcao'>Mês</h1>
        <select
          className='button-body-opcao'
          value={mesSelecionado}
          onChange={(e) => setMesSelecionado(e.target.value)}
        >
          <option value="">Selecione um mês</option>
          {meses.map((mes, index) => (
            <option key={index} value={index + 1}>{mes}</option>
          ))}
        </select>
      </div>
    </div>

                <div className='row-gerencial-body1'>

                    <div className='div-gerencial-body1'>
                        <div className='grafico-div-gerencial-body1'>
                            
                            <div className='grafico-card1-div-gerencial-body1'>
                            <h1 className='h1-card1-div-gerencial-body1'>Churn Mês</h1>
                            <h1  className='h2-card1-div-gerencial-body1'>Indicador que mede o churn mensal.</h1>

                                {churnUltimosMeses.length > 0 ? (
                                                <ResponsiveContainer width="90%" height={270}>
                                                   <BarChart
                                                          data={churnUltimosMeses}
                                                          onClick={(data) => {
                                                            if (data && data.activeLabel) {
                                                              const [mesTexto, anoCurto] = data.activeLabel.split('/');
                                                              const mesesNomes = [
                                                                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                                                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                                                              ];
                                                              const mesIndex = mesesNomes.indexOf(mesTexto);
                                                              if (mesIndex !== -1) {
                                                                setMesSelecionado(mesIndex + 1);
                                                                setAnoSelecionado(parseInt('20' + anoCurto)); // Ex: '25' vira 2025
                                                              }
                                                            }
                                                          }}
                                                        >
                                                        <CartesianGrid strokeDasharray="2 2" />
                                                        <XAxis dataKey="mes" tick={{ fill: '#fff' }} fontWeight='bold' />
                                                        <YAxis  tick={{ fill: '#fff' }} />
                                                        <Tooltip  />
                                                       
                                                        <Bar dataKey="churn" stackId="a" fill="#F45742">
                                                         
                                                            <LabelList dataKey="churn" position="inside" fill="#fff" fontWeight='bold'  formatter={(value) => value.toFixed(2)}  />
                                                        </Bar>
                                                      
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            ) : (
                                                <p>Carregando dados...</p>
                                            )}


                                            <img src={grafico} style={{height: 100}}/>

                            </div>

                        </div>
                    </div>

                    <div  className='div-gerencial-body1'>
                    <div className='card1-div-gerencial-body1'>
                        <h1 className='h1-div-gerencial-body2'>Churn</h1>
                        <h1 className='h2-div-gerencial-body1'>
                            {churnMensal !== null ? `${churnMensal} ` : 'Carregando...'}
                        </h1>
                        </div>

                            <div className='card2-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body2'>Limite de Meta</h1>
                            </div>
                    </div>

                    <div  className='div-gerencial-body1'>


                    <div className='card1-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body2'>Projeção</h1>
                                <h1 className='h2-div-gerencial-body1'>{statusMeta}</h1>
                            </div>

                            <div className='card3-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body1'>PF</h1>
                                <h1 className='h2-div-gerencial-body1'>{cancelamentosPF}</h1>
                            </div>

                            <div className='card3-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body1'>PJ</h1>
                                <h1 className='h2-div-gerencial-body1'>{cancelamentosPJ}</h1>
                            </div>
                    </div>

                </div>


                <div className='div2-gerencial-body1'>
                <div className='lista-div2-gerencial-body1'>
                    <h1 className='h1-div-gerencial-gerencial'>Churn por Bairro</h1>
                    <table className="tabela-bairros-gerencial">
                    <thead>
                        <tr style={{backgroundColor: 'white'}}>
                        <th className='h1-tabela-bairros-gerencial'>Bairro</th>
                        <th className='h1-tabela-bairros-gerencial'>Cancelamentos</th>
                        <th className='h1-tabela-bairros-gerencial'>Clientes Ativos</th>
                        <th className='h1-tabela-bairros-gerencial'>Churn Inad.</th>
                        <th className='h1-tabela-bairros-gerencial'>Churn Opção</th>
                        <th className='h1-tabela-bairros-gerencial'>Churn</th>
                        </tr>
                    </thead>
                    <tbody>
                    {churnPorBairro.map((item, index) => (
                              <tr
                                className='link-tabela-bairros'
                                key={index}
                                onClick={() =>
                                  setBairroSelecionado(prev => prev === item.bairro_nome ? null : item.bairro_nome)
                                }
                                style={{
                                  cursor: 'pointer',
                                  backgroundColor: bairroSelecionado === item.bairro_nome ? '#f2f2f2' : 'white'
                                }}
                              >
                                <td className='h2-tabela-bairros-gerencial'>{item.bairro_nome}</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.total_cancelamentos}</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.total_clientes_ativos}</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.pct_pedido}%</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.pct_automatico}%</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.churn_rate}</td>
                              </tr>
                            ))}

                    </tbody>
                    </table>
                </div>
                </div>



                    <div className='row-gerencial-body2'>

                        <div className='div-gerencial-body2'>
                            <div className='card-div-gerencial-body2'>
                            <h1 className='h1-div-gerencial-gerencial'>Churn por Cidade</h1>
                            <table className="tabela-bairros-gerencial">
                    <thead>
                        <tr style={{backgroundColor: 'white'}}>
                        <th className='h1-tabela-bairros-gerencial'>Cidade</th>
                        <th className='h1-tabela-bairros-gerencial'>Cancelamentos</th>
                        <th className='h1-tabela-bairros-gerencial'>Clientes Ativos</th>
                        <th className='h1-tabela-bairros-gerencial'>Churn Inad.</th>
                        <th className='h1-tabela-bairros-gerencial'>Churn Opção</th>
                        <th className='h1-tabela-bairros-gerencial'>Churn</th>
                        </tr>
                    </thead>
                    <tbody>
                            {churnPorCidade.map((item, index) => (
                              <tr
                                className='link-tabela-bairros'
                                key={index}
                                onClick={() =>
                                  setCidadeSelecionada(prev => prev === item.cidade_nome ? null : item.cidade_nome)
                                }
                                style={{
                                  cursor: 'pointer',
                                  backgroundColor: cidadeSelecionada === item.cidade_nome ? '#f2f2f2' : 'white'
                                }}
                              >
                                <td className='h2-tabela-bairros-gerencial'>{item.cidade_nome}</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.total_cancelamentos}</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.total_clientes_ativos}</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.perc_cancelamento_pedido}%</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.perc_cancelamento_automatico}%</td>
                                <td className='h2-tabela-bairros-gerencial'>{item.churn_rate}%</td>
                              </tr>
                            ))}
                          </tbody>
                    </table>
                                </div>
                        </div>

                        <div  className='div-gerencial-body2'>
                       
                            <div className='card-div-gerencial-body2'>
                            <h1 className='h1-div-gerencial-gerencial'>Upgrade de Planos</h1>
                                
                            {downgradeAtendimentos.length > 0 ? (
                                <div style={{ marginTop: 30 }}>
                                    <ResponsiveContainer width="90%" height={270}>
                                    <BarChart data={downgradeAtendimentos}
                                         onClick={(data) => {
                                          if (data && data.activeLabel) {
                                            const [mesTexto, anoCurto] = data.activeLabel.split('/');
                                            const mesesNomes = [
                                              'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                              'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                                            ];
                                            const mesIndex = mesesNomes.indexOf(mesTexto);
                                            if (mesIndex !== -1) {
                                              setMesSelecionado(mesIndex + 1);
                                              setAnoSelecionado(parseInt('20' + anoCurto)); // Ex: '25' vira 2025
                                            }
                                          }
                                        }}
                                      >
                                        <CartesianGrid strokeDasharray="2 2" />
                                        <XAxis dataKey="mes" tick={{ fill: '#fff' }} fontWeight='bold' />
                                        <YAxis tick={{ fill: '#fff' }} />
                                        <Tooltip />
                                        <Bar dataKey="total"  fill="#F45742">
                                        <LabelList dataKey="total" position="insideTop" fill="#fff" fontWeight='bold' />
                                        </Bar>
                                    </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                ) : (
                                <p>Carregando atendimentos tipo downgrade...</p>
                                )}


                            </div>
                              
                        </div>


                    </div>


                <div className='div2-gerencial-body1'>
                <div className='lista-div2-gerencial-body1'>
                    <h1 className='h1-div-gerencial-gerencial'>Motivos de Cancelamentos</h1>
                    <table className="tabela-bairros-gerencial">
                    <thead>
                        <tr style={{ backgroundColor: 'white' }}>
                        <th className='h1-tabela-bairros-gerencial'>Motivo</th>
                        <th className='h1-tabela-bairros-gerencial'>Total Cancelamentos</th>
                        </tr>
                    </thead>
                    <tbody>
                          {motivosCancelamentos.map((item, index) => (
                            <tr 
                              className='link-tabela-bairros' 
                              key={index}
                              onClick={() =>
                                setMotivoSelecionado(prev => prev === item.descricao ? null : item.descricao)
                              }
                              style={{ 
                                cursor: 'pointer',
                                backgroundColor: motivoSelecionado === item.descricao ? '#f2f2f2' : 'white'
                              }}
                            >
                              <td className='h2-tabela-bairros-gerencial'>{item.descricao}</td>
                              <td className='h2-tabela-bairros-gerencial'>{item.total_cancelamentos}</td>
                            </tr>
                          ))}
                        </tbody>

                    </table>
                </div>
                </div>


                <div className='row-div-gerencial-body2'>

                <div  className='div-gerencial-body2'>
                       
                       <div className='card-div-gerencial-body2'>
                       <h1 className='h1-div-gerencial-gerencial'>Reversão de Cancelamento</h1>
                           
                       {atendimentosTipo257.length > 0 ? (
                           <div style={{ marginTop: 30 }}>
                               <ResponsiveContainer width="90%" height={270}>
                               <BarChart data={atendimentosTipo257}     onClick={(data) => {
                                                            if (data && data.activeLabel) {
                                                              const [mesTexto, anoCurto] = data.activeLabel.split('/');
                                                              const mesesNomes = [
                                                                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                                                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                                                              ];
                                                              const mesIndex = mesesNomes.indexOf(mesTexto);
                                                              if (mesIndex !== -1) {
                                                                setMesSelecionado(mesIndex + 1);
                                                                setAnoSelecionado(parseInt('20' + anoCurto)); // Ex: '25' vira 2025
                                                              }
                                                            }
                                                          }}
                                                        >
                                   <CartesianGrid strokeDasharray="2 2" />
                                   <XAxis dataKey="mes" tick={{ fill: '#fff' }} fontWeight='bold' />
                                   <YAxis tick={{ fill: '#fff' }} />
                                   <Tooltip />
                                   <Bar dataKey="total"  fill="#F45742">
                                   <LabelList dataKey="total" position="insideTop" fill="#fff" fontWeight='bold' />
                                   </Bar>
                               </BarChart>
                               </ResponsiveContainer>
                           </div>
                           ) : (
                           <p>Carregando atendimentos tipo downgrade...</p>
                           )}


                       </div>
                         
                   </div>

                   <div className='div-prejuizo-empresa'>
                    <div className='card-prejuizo-empresa'>
                           <h1 className='titulo-prejuizo-empresa'>Valor acumulado mensal</h1>
                           <h1 className='h2-div-gerencial-body1'>{valorMensalCancelamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                    </div>
                    <div className='card-prejuizo-empresa'>
                           <h1 className='titulo-prejuizo-empresa'>Valor acumulado anual</h1>
                           <h1 className='h2-div-gerencial-body1'>{valorAnualCancelamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                    </div>
                   </div>

                </div>

              
                <div  className='div-gerencial-body3'>
                       
                <div className='card-div-gerencial-body2'>
                    <h1 className='h1-div-gerencial-gerencial'>Churn porcentagem anual</h1>

                    {churnAnual.length > 0 ? (
                        <div style={{ marginTop: 30 }}>
                        <ResponsiveContainer width="95%" height={270}>
                            <BarChart data={churnAnual}      onClick={(data) => {
                                                            if (data && data.activeLabel) {
                                                              const [mesTexto, anoCurto] = data.activeLabel.split('/');
                                                              const mesesNomes = [
                                                                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                                                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                                                              ];
                                                              const mesIndex = mesesNomes.indexOf(mesTexto);
                                                              if (mesIndex !== -1) {
                                                                setMesSelecionado(mesIndex + 1);
                                                                setAnoSelecionado(parseInt('20' + anoCurto)); // Ex: '25' vira 2025
                                                              }
                                                            }
                                                          }}
                                                        >
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="mes" tick={{ fill: '#fff' }} fontWeight='bold' />
                            <YAxis tick={{ fill: '#fff' }} />
                            <Tooltip />
                            <Bar dataKey="churn" fill="#F45742">
                                <LabelList dataKey="churn" position="insideTop" fill="#fff" fontWeight='bold' />
                            </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                    ) : (
                        <p>Carregando churn anual...</p>
                    )}
                    </div>

                        </div>

                
                        <div  className='div-gerencial-body3'>
                       
                       <div className='card-div-gerencial-body2'>
                           <h1 className='h1-div-gerencial-gerencial'>Mês de instalação</h1>
       
                         {clientesHabilitados12Meses.length > 0 ? (
                            <div style={{ marginTop: 30 }}>
                              <ResponsiveContainer width="95%" height={270}>
                                <BarChart data={clientesHabilitados12Meses}      onClick={(data) => {
                                                            if (data && data.activeLabel) {
                                                              const [mesTexto, anoCurto] = data.activeLabel.split('/');
                                                              const mesesNomes = [
                                                                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                                                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                                                              ];
                                                              const mesIndex = mesesNomes.indexOf(mesTexto);
                                                              if (mesIndex !== -1) {
                                                                setMesSelecionado(mesIndex + 1);
                                                                setAnoSelecionado(parseInt('20' + anoCurto)); // Ex: '25' vira 2025
                                                              }
                                                            }
                                                          }}
                                                        >
                                  <CartesianGrid strokeDasharray="2 2" />
                                  <XAxis dataKey="mes" tick={{ fill: '#fff' }} fontWeight='bold' />
                                  <YAxis tick={{ fill: '#fff' }} />
                                  <Tooltip />
                                  <Bar dataKey="total" fill="#F45742">
                                    <LabelList dataKey="total" position="insideTop" fill="#fff" fontWeight='bold' />
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          ) : (
                            <p>Carregando clientes habilitados...</p>
                          )}
                           </div>
       
                               </div>
                

                               <div className='div2-gerencial-body1'>
                                <div className='lista-div2-gerencial-body1'>
                                  <h1 className='h1-div-gerencial-gerencial'>Cancelamentos Detalhados</h1>
                                  <table className="tabela-bairros-gerencial">
                                    <thead>
                                      <tr style={{ backgroundColor: 'white' }}>
                                        <th className='h1-tabela-bairros-gerencial'>Cliente</th>
                                        <th className='h1-tabela-bairros-gerencial'>Bairro</th>
                                        <th className='h1-tabela-bairros-gerencial'>Cidade</th>
                                        <th className='h1-tabela-bairros-gerencial'>Motivo de Cancelamento</th>
                                        <th className='h1-tabela-bairros-gerencial'>Valor</th>
                                        <th className='h1-tabela-bairros-gerencial'>Tipo</th>
                                        <th className='h1-tabela-bairros-gerencial'>Data Cancelamento</th>
                                        <th className='h1-tabela-bairros-gerencial'>Observação</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                                {cancelamentosDetalhados
                                                  .filter(item => 
                                                    (!motivoSelecionado || item.motivo_cancelamento === motivoSelecionado) &&
                                                    (!cidadeSelecionada || item.cidade_nome === cidadeSelecionada) &&
                                                    (!bairroSelecionado || item.bairro === bairroSelecionado)
                                                  )
                                                  .map((item, index) => (
                                                    <tr key={index} className='link-tabela-bairros'>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.nome_razaosocial}</td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.bairro}</td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.cidade_nome}</td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.motivo_cancelamento}</td>
                                                      
                                                      <td className='h2-tabela-bairros-gerencial'>
                                                        {parseFloat(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                      </td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.tipo_pessoa.toUpperCase()}</td>
                                                      <td className='h2-tabela-bairros-gerencial'>
                                                        {new Date(item.data_cancelamento).toLocaleDateString('pt-BR')}
                                                      </td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.observacao}</td>
                                                    </tr>
                                                ))}
                                              </tbody>

                                  </table>
                                </div>
                                </div>


                                <div className='div-pre-churn-header'>
                                  <h1 className='h1-pre-churn-header'>Pré-Churn</h1>
                                </div>


                                <div className='row-pre-churn'>
                                    
                                    <div className='card1-pre-churn'>
              
                                         <div className='card-div-gerencial-body2'>
                                            <h1 className='h1-div-gerencial-gerencial'>Ordem de Serviço (3 meses)</h1>
                                            <table className="tabela-bairros-gerencial">
                                              <thead>
                                                <tr style={{ backgroundColor: 'white' }}>
                                                  <th className='h1-tabela-bairros-gerencial1'>Cliente</th>
                                                  <th className='h1-tabela-bairros-gerencial1'>Qtd</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {clientesRepetidos.map((item, index) => (
                                                  <tr className='link-tabela-bairros' key={index}>
                                                   <td className='h2-tabela-bairros-gerencial1' title={item.cliente}>
                                                      {item.cliente.split(' ').length > 5
                                                        ? item.cliente.split(' ').slice(0, 5).join(' ') + '...'
                                                        : item.cliente}
                                                    </td>

                                                    <td className='h2-tabela-bairros-gerencial1'>{item.qtd_ordens}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                     
                                        </div>

                 
                                    <div  className='card1-pre-churn'>

                                          <div className='card-div-gerencial-body2'>
                                            <h1 className='h1-div-gerencial-gerencial'>Clientes com Atendimentos (3 meses)</h1>
                                            <table className="tabela-bairros-gerencial">
                                              <thead>
                                                <tr style={{ backgroundColor: 'white' }}>
                                                  <th className='h1-tabela-bairros-gerencial'>Cliente</th>
                                                  <th className='h1-tabela-bairros-gerencial'>Qtd</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {clientesRepetidosAtendimento.map((item, index) => (
                                                  <tr className='link-tabela-bairros' key={index}>
                                                  <td className='h2-tabela-bairros-gerencial1' title={item.cliente}>
                                                      {item.cliente.split(' ').length > 5
                                                        ? item.cliente.split(' ').slice(0, 5).join(' ') + '...'
                                                        : item.cliente}
                                                    </td>
                                                    <td className='h2-tabela-bairros-gerencial'>{item.qtd_atendimentos}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>

                                </div>



    </div>
  )
}

export default DashboardChurnGerencial