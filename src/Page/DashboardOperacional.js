import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList} from 'recharts';



import '../CSS/DashboardOperaciona.css'


import logobranca from '../Images/logobrnaca.png'
import check_box from '../Images/check_box.png'
import poste from '../Images/poste 1.png'
import schedule from '../Images/schedule.png'
import person from '../Images/person.png'

export default function DashboardOperacional() {
     const [totalHabilitadosHoje, setTotalHabilitadosHoje] = useState(0);
     const [totalHabilitadosMesSC, setTotalHabilitadosMesSC] = useState(0);
     const [totalHabilitadosMesRS, setTotalHabilitadosMesRS] = useState(0);
     const [totalExecutadoMesRS, setTotalExecutadoMesRS] = useState(0);
     const [totalExecutadoMesSC, setTotalExecutadoMesSC] = useState(0);
     const [totalExecutadoMesHoje, setTotalExecutadoMesHoje] = useState(0);
     const [totalOrdemServiconaRede, setTotalOrdemServiconaRede] = useState(0);
     const [totalOrdemServiconaPessoa, setTotalOrdemServiconaPessoa] = useState(0);
     const [totalOrdemServicoPendente, setTotalOrdemServicoPendente] = useState(0);
     const [totalOrdemServicoConcluido, setTotalOrdemServicoConcluido] = useState(0);
     const [totalIRR, setTotalIRR] = useState(0);
     const [totalIQR, setTotalIQR] = useState(0);
     const [totalIQI, setTotalIQI] = useState(0);
     const [graficoData, setGraficoData] = useState([]);

     const [regionsData, setRegionsData] = useState([
      { name: 'Caxias', days: 2 },
      { name: 'Continente', days: 6 },
      { name: 'Norte', days: 8 },
      { name: 'Sul', days: 5 },
      { name: 'Centro', days: 7 },
    ]);

        const total1 = 810;
        const total2 = 1200;
      
        // Obtém o ano e mês atual
        const now = new Date();
        const ano = now.getFullYear();
        const mes = now.getMonth(); // getMonth() retorna de 0 (Janeiro) a 11 (Dezembro)
      
        // Função para calcular os dias úteis do mês atual (excluindo domingos)
        const calcularDiasUteis = (ano, mes) => {
          let diasUteis = 0;
          const totalDias = new Date(ano, mes + 1, 0).getDate(); // Último dia do mês
      
          for (let dia = 1; dia <= totalDias; dia++) {
            const diaSemana = new Date(ano, mes, dia).getDay();
            if (diaSemana !== 0) diasUteis++; // Exclui domingos (0 = Domingo)
          }
      
          return diasUteis;
        };
      
        const diasUteisNoMes = calcularDiasUteis(ano, mes);
        const media1 = (total1 / diasUteisNoMes).toFixed(0);
        const media2 = (total2 / diasUteisNoMes).toFixed(0);


  useEffect(() => {
    // Função para buscar os dados
    const fetchData = async () => {
      try {

        const responseiqr = await fetch('http://38.224.145.3:3003/total-clientes-retrabalho-instalacao');
        const dataiqr = await responseiqr.json();
        setTotalIQR(dataiqr.porcentagem_retrabalho); // Armazenando o total de cadastros de SC

        const responseirr = await fetch('http://38.224.145.3:3003/clientes-repetidos-30-dias');
        const datairr = await responseirr.json();
        setTotalIRR(datairr.porcentagem_repetidos); // Armazenando o total de cadastros de SC
     
        const responsehojehabilitados = await fetch('http://38.224.145.3:3003/total-clientes-habilitados-hoje');
        const datahabilitadoshoje = await responsehojehabilitados.json();
        setTotalHabilitadosHoje(datahabilitadoshoje.total_clientes_habilitados); // Armazenando o total de cadastros de SC


        const responsemeshabilitadossc = await fetch('http://38.224.145.3:3003/total-clientes-habilitados-sc');
        const datahabilitadosmesSC = await responsemeshabilitadossc.json();
        setTotalHabilitadosMesSC(datahabilitadosmesSC.total_clientes_habilitados); // Armazenando o total de cadastros de SC

        const responsemeshabilitadosrs = await fetch('http://38.224.145.3:3003/total-clientes-habilitados-rs');
        const datahabilitadosmesRS = await responsemeshabilitadosrs.json();
        setTotalHabilitadosMesRS(datahabilitadosmesRS.total_clientes_habilitados); // Armazenando o total de cadastros de SC

        const responsemesexecutadors = await fetch('http://38.224.145.3:3003/total-clientes-habilitados-executado-rs');
        const dataexecutadomesRS = await responsemesexecutadors.json();
        setTotalExecutadoMesRS(dataexecutadomesRS.total_manutencoes); // Armazenando o total de cadastros de SC

        const responsemesexecutadosc = await fetch('http://38.224.145.3:3003/total-clientes-habilitados-executado-sc');
        const dataexecutadomesSC = await responsemesexecutadosc.json();
        setTotalExecutadoMesSC(dataexecutadomesSC.total_manutencoes); // Armazenando o total de cadastros de SC

        const responsiqi = await fetch('http://38.224.145.3:3003/porcentagem-clientes-repetidos');
        const dataiqi = await responsiqi.json();
        setTotalIQI(dataiqi.porcentagem_restante); // Armazenando o total de cadastros de SC


        const responsemesexecutadohoje = await fetch('http://38.224.145.3:3003/total-clientes-habilitados-executado-dia');
        const dataexecutadomeshoje = await responsemesexecutadohoje.json();
        setTotalExecutadoMesHoje(dataexecutadomeshoje.total_manutencoes); // Armazenando o total de cadastros de SC

        const responsemordemdeserviconarede = await fetch('http://38.224.145.3:3003/ordens-servico-executado-na-rede');
        const dataordemdeserviconarede = await responsemordemdeserviconarede.json();
        setTotalOrdemServiconaRede(dataordemdeserviconarede.ordens_servico[0].total_clientes_habilitados); // Armazenando o total de cadastros de SC


        const responsemordemdeserviconapessoa = await fetch('http://38.224.145.3:3003/ordens-servico-executado-na-pessoa');
        const dataordemdeserviconapessoa = await responsemordemdeserviconapessoa.json();
        setTotalOrdemServiconaPessoa(dataordemdeserviconapessoa.ordens_servico[0].total_clientes_habilitados); // Armazenando o total de cadastros de SC


        const responsemordensservicopendente = await fetch('http://38.224.145.3:3003/ordens-servico-pendente');
        const dataordensservicopendente = await responsemordensservicopendente.json();
        setTotalOrdemServicoPendente(dataordensservicopendente.total_pendentes); // Armazenando o total de cadastros de SC

        const responsemordensservicoconcluido = await fetch('http://38.224.145.3:3003/ordens-servico-concluido');
        const dataordensservicoconcluido = await responsemordensservicoconcluido.json();
        setTotalOrdemServicoConcluido(dataordensservicoconcluido.total_pendentes); // Armazenando o total de cadastros de SC

        const response = await fetch('http://38.224.145.3:3003/total-clientes-habilitados-ultimos-3-meses');
        const data = await response.json();

        // Criando dados formatados para o gráfico
        const formattedGraficoData = data.total_clientes_habilitados.map(item => ({
          month: `${item.mes}`,
          instalacoes: parseInt(item.total_clientes_habilitados)
        }));
        setGraficoData(formattedGraficoData);

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }

      }// Chama a função para buscar os dados
    fetchData();
    
    // Atualiza os dados a cada 3 segundos
    const intervalId = setInterval(fetchData, 3000);

    // Limpeza do intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []); // O array vazio faz a requisição apenas uma vez quando o componente for montado
      


  return (
    <div>

            <div>

                <div className='row-div-instalacao-manutencao'>
                    
                    <div className='div-card-dados-principais'>
                            <h1 className='h1-titulo-card-dados-principais'>Instalações</h1>
                        <div className='row-div-card-dados-principais'>
                      

                      <div className='body-div-card-dados-principais-dados'>
                            <h1 className='h1-body-div-card-dados-principais'>Mês atual</h1>
                            <div className='div-card-dados-principais-dados'>
                               
                                <div className='card-dados-principais-dados'>
                                        <h1 className='h1-card-dados-principais-dados'>SC</h1>
                                        <h1 className='h2-card-dados-principais-dados'>{totalHabilitadosMesSC}</h1>
                                </div>
                                <div className='card-dados-principais-dados'>
                                        <h1 className='h1-card-dados-principais-dados'>RS</h1>
                                        <h1 className='h2-card-dados-principais-dados'>{totalHabilitadosMesRS}</h1>
                                </div>
                            

                           
                            </div>

                            <div className='div-meta-card-dados-principais'>
                                <h1 className='h1-meta-card-dados-principais'>Meta Mês</h1>
                                <h1  className='h2-meta-card-dados-principais'>810</h1>
                            </div>

                            </div>

                            <div className='body-div-card-dados-principais-dados'>
                         
                            <div className='div-card-dados-principais-dados-diaria'>
                                    <h1 className='h1-div-card-dados-principais-dados-diaria'>Diária</h1>
                                    <h1 className='h2-div-card-dados-principais-dados-diaria'>{totalHabilitadosHoje}</h1>


                                </div>
                                

                                <div className='div-meta-card-dados-principais'>
                                <h1 className='h1-meta-card-dados-principais'>Meta / Média</h1>
                                <h1  className='h2-meta-card-dados-principais'>{media1}</h1>
                                </div>
                            </div>

                            <div>

                            </div>

                        </div>

                    </div>


                    <div className='div-card-dados-principais'>
                            <h1 className='h1-titulo-card-dados-principais'>Manutenção</h1>
                        <div className='row-div-card-dados-principais'>
                      

                      <div className='body-div-card-dados-principais-dados'>
                            <h1 className='h1-body-div-card-dados-principais'>Mês atual</h1>
                            <div className='div-card-dados-principais-dados'>
                               
                                <div className='card-dados-principais-dados'>
                                        <h1 className='h1-card-dados-principais-dados'>SC</h1>
                                        <h1 className='h2-card-dados-principais-dados'>{totalExecutadoMesSC}</h1>
                                </div>
                                <div className='card-dados-principais-dados'>
                                        <h1 className='h1-card-dados-principais-dados'>RS</h1>
                                        <h1 className='h2-card-dados-principais-dados'>{totalExecutadoMesRS}</h1>
                                </div>
                            

                           
                            </div>

                            <div className='div-meta-card-dados-principais'>
                                <h1 className='h1-meta-card-dados-principais'>Meta Mês</h1>
                                <h1  className='h2-meta-card-dados-principais'>1200</h1>
                            </div>

                            </div>

                            <div className='body-div-card-dados-principais-dados'>
                         
                            <div className='div-card-dados-principais-dados-diaria'>
                                    <h1 className='h1-div-card-dados-principais-dados-diaria'>Diária</h1>
                                    <h1 className='h2-div-card-dados-principais-dados-diaria'>{totalExecutadoMesHoje}</h1>


                                </div>
                                

                                <div className='div-meta-card-dados-principais'>
                                <h1 className='h1-meta-card-dados-principais'>Meta / Média</h1>
                                <h1  className='h2-meta-card-dados-principais'>{media2}</h1>
                                </div>
                            </div>

                            <div>

                            </div>

                        </div>

                    </div>


                    </div>

                <div className='row-div-instalacao-grafico' >
                    <div className='body1-agenda-operacao'>
                        
                        <div  className='div-agenda-operacao'>
                        <h1 className='h1-tabela-agenda-dia'>Instalações pro trimestre</h1>
                        <ResponsiveContainer width='100%' height={250}>
                          <BarChart data={graficoData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="month" 
                              tick={{ fill: '#fff', fontSize: 10 }} 
                              fontWeight="bold" 
                            />
                            <Tooltip />
                            <Bar dataKey="instalacoes" fill="#F45742" barSize={50}>
                              <LabelList dataKey="instalacoes" position="center" fill="white" />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>

                        </div>
                        <div className='div-agenda2-operacao'>
                        <h1 className='titulo-agenda-operacao'>Agenda</h1>
                        <h1 className='titulo1-agenda-operacao'>Prazo de instalação</h1>

                        {regionsData.map((region, index) => (
                          <div className='row-titulo-agenda-operacao'>
                <h1 className='h1-titulo-agenda-operacao' key={index}>{region.name}
                </h1>
                <h1  className='h2-titulo-agenda-operacao'>{region.days}</h1>
                </div>
              ))}

                        </div>
                    </div>
                    <div className='body2-agenda-operacao'>
                        

                    <div className='div3-agenda-operacao'>
                                <h1  className='titulo-agenda-operacao'>Tipo de Manutenção</h1>

                                <div className='agenda-os-dia'>
                                <div className='row-div3-agenda-operacao'>
                                    <img style={{width: '13px'}} src={poste}/>
                                    <h1 className='titulo-agenda1-operacao'>{totalOrdemServiconaRede}</h1>
                                    </div>

                                    
                                <div className='row-div3-agenda-operacao'>
                                    <img  style={{width: '30px'}} src={person}/>
                                    <h1 className='titulo-agenda1-operacao'>{totalOrdemServiconaPessoa}</h1>
                                    </div>

                                    </div>

                            </div>

                            <div className='div3-agenda-operacao'>
                                <h1  className='titulo-agenda-operacao'>OS Dia</h1>

                                <div className='agenda-os-dia'>
                                <div className='row-div3-agenda-operacao'>
                                    <img style={{width: '30px'}} src={schedule}/>
                                    <h1 className='titulo-agenda1-operacao'>{totalOrdemServicoPendente}</h1>
                                    </div>

                                    
                                <div className='row-div3-agenda-operacao'>
                                    <img  style={{width: '30px'}} src={check_box}/>
                                    <h1 className='titulo-agenda1-operacao'>{totalOrdemServicoConcluido}</h1>
                                    </div>

                                    </div>

                            </div>

                            <div className='div3-agenda-operacao'>
                                <h1  className='titulo-agenda-operacao'>Metricas</h1>



                                <div className='agenda-os-dia'>
                                <h1 className='h1-card-dados-principais-dados1'>IRR</h1>
                                <div className='row-div3-agenda-operacao'>
                                 
                                    <h1 className='titulo-agenda1-operacao'>{totalIRR}</h1>
                                    </div>


                                    <h1 className='h1-card-dados-principais-dados1'>IQI</h1>
                                <div className='row-div3-agenda-operacao'>
                                 
                                    <h1 className='titulo-agenda1-operacao'>{totalIQI}%</h1>
                                    </div>

                                    <h1 className='h1-card-dados-principais-dados1'>IQR</h1>
                                <div className='row-div3-agenda-operacao'>
                                 
                                    <h1 className='titulo-agenda1-operacao'>{totalIQR}</h1>
                                    </div>

                                    </div>

                            </div>

                    </div>
                </div>

            </div>

            <div className='div-titulo-dash'>
            <h1 className='h2-titulo-dash'>CHURN TV</h1>
            <h1 className='h1-titulo-dash'>OPERACIONAL TV</h1>
            <img src={logobranca}/>
        </div>

    </div>
  )
}
