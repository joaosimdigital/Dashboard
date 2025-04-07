import React, { useEffect, useState } from 'react';
import '../CSS/DashboardOsTicket.css';
import logobranca from '../Images/logobrnaca.png';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, PieChart, Pie, Cell } from 'recharts';




function DashboardOsTicket() {
  const [totais, setTotais] = useState({
    total: null,
    abertos: null,
    atualizados: null,
    fechados: null,
  });

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const endpoints = [
          { key: 'total', url: 'http://localhost:3007/total-tickets' },
          { key: 'abertos', url: 'http://localhost:3007/tickets-abertos' },
          { key: 'atualizados', url: 'http://localhost:3007/tickets-atualizados' },
          { key: 'fechados', url: 'http://localhost:3007/tickets-fechados' },
        ];

        const results = await Promise.all(
          endpoints.map(async ({ key, url }) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Erro ao buscar ${key}`);
            const data = await res.json();
            return { key, value: data.total };
          })
        );

        const novosTotais = results.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});

        setTotais(novosTotais);
      } catch (err) {
        setErro(err.message);
      }
    };

    fetchDados();
  }, []);


  const [Respondidostotal, setRespondidosTotal] = useState(null);
  const [totalTicket, setTotaTicket] = useState(null);
  const [totalAbertos, setTotalAbertos] = useState(null);
  const [totalResolvidos, setTotalResolvidos] = useState(null);
  const [erro, setErro] = useState(null);
  const [graficoData, setGraficoData] = useState([]);
  const [tms, setTms] = useState(null);
  const [data, setData] = useState([]);
  const COLORS = ['#007BFF', '#FF4136', '#FFDC00', '#2ECC40']; 

  useEffect(() => {
    fetch('http://38.224.145.3:3006/tickets-atualizados')
      .then(res => {
        if (!res.ok) throw new Error('Erro na requisição');
        return res.json();
      })
      .then(data => setRespondidosTotal(data.total))
      .catch(err => setErro(err.message));


      fetch('http://38.224.145.3:3006/total-tickets')
      .then(res => {
        if (!res.ok) throw new Error('Erro na requisição');
        return res.json();
      })
      .then(data => setTotaTicket(data.total))
      .catch(err => setErro(err.message));


        fetch('http://38.224.145.3:3006/tickets-status-aberto')
          .then(res => {
            if (!res.ok) throw new Error('Erro ao buscar tickets abertos');
            return res.json();
          })
          .then(data => setTotalAbertos(data.total))
          .catch(err => setErro(err.message));


          fetch('http://38.224.145.3:3006/tickets-fechados')
          .then(res => {
            if (!res.ok) throw new Error('Erro ao buscar tickets abertos');
            return res.json();
          })
          .then(data => setTotalResolvidos(data.total))
          .catch(err => setErro(err.message));


          fetch('http://38.224.145.3:3006/tempo-medio-resolucao')
            .then(res => {
              if (!res.ok) throw new Error('Erro ao buscar tempo médio');
              return res.json();
            })
            .then(data => setTms(data.tempo_medio))
            .catch(err => console.error(err.message));


          const fetchGrafico = async () => {
            try {
              const res = await fetch('http://38.224.145.3:3006/tickets-ultimos-3-meses');
              if (!res.ok) throw new Error('Erro ao buscar dados do gráfico');
              const data = await res.json();
      
              // Formatando os dados para o formato que o gráfico espera
              const formatado = data.map(item => ({
                month: item.mes,           // Eixo X
                instalacoes: item.total    // Altura da barra
              }));
      
              setGraficoData(formatado);
            } catch (err) {
              console.error(err.message);
            }
          };
      
          fetchGrafico();
      


          fetch('http://38.224.145.3:3006/resolvidos-por-staff')
          .then(res => {
            if (!res.ok) throw new Error('Erro ao buscar dados dos staff');
            return res.json();
          })
          .then(staffData => {
            const totalGeral = staffData.reduce((acc, staff) => acc + staff.total_resolvidos, 0);
    
            const formatado = staffData.map(staff => ({
              name: staff.nome,
              value: Math.round((staff.total_resolvidos / totalGeral) * 100)
            }));
    
            setData(formatado);
          })
          .catch(err => console.error(err));

          const interval = setInterval(fetchGrafico, 10000);
          return () => clearInterval(interval);
        }, []);


  


    return (
      <div>

        <div className='div-header-osticket'>

          <h1 style={{width: '33%'}}></h1>

            <h1 className='titulo-div-header-osticket'>TI<h1 className='subtitulo-div-header-osticket'>CKET's</h1></h1>

            <div  style={{width: '33%', display: 'flex', justifyContent: 'end'}}>
            <img className='logo-div-header-osticket' src={logobranca}/>
            </div>
        </div>

        <div className='div-metricas-osticket'>
           
            <div className='card1-metricas-osticket'>
              <h1 className='card-titulo-metricas'>Total</h1>
              <h1  className='card-subtitulo-metricas'>{totalTicket}</h1>
            </div>


            <div className='card2-metricas-osticket'>
              <h1 className='card-titulo-metricas'>Abertos</h1>
              <h1  className='card-subtitulo-metricas'>{totalAbertos}</h1>
            </div>

            <div  className='card3-metricas-osticket'>
              <h1 className='card-titulo-metricas'>Respondidos</h1>
              <h1  className='card-subtitulo-metricas'>{Respondidostotal}</h1>
            </div>


            <div  className='card4-metricas-osticket'>
              <h1 className='card-titulo-metricas'>Resolvidos</h1>
              <h1  className='card-subtitulo-metricas'>{totalResolvidos}</h1>
            </div>




        </div>


        <div className='div-graficos'>

          <div className='card1-div-graficos'>

            <div className='div-card1-div-grafico'>
                <h1 className='titulo-div-card1-div-grafico'>Abertos x Mês</h1>

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

          </div>


          <div className='card2-div-graficos'>
            <h1 className='titulo-card2-div-graficos'>TMS</h1>
            <h1  className='subtitulo-card2-div-graficos'>Tempo médio de soluções (dias)</h1>
            <h1  className='valor-card2-div-graficos'>{tms}</h1>
          </div>


          <div className='card3-div-graficos'>
            <h1 className='titulo-div-card1-div-grafico'>Gráficos</h1>

            <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}%`} // <-- nome no gráfico
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]} // Garante que as cores rodem
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>


          </div>


        </div>

      </div>
    )
  }


export default DashboardOsTicket;