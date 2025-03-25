import React, { useEffect, useState } from 'react'

import '../CSS/DashboardClientes.css'

//Images
import logobranca from '../Images/logobrnaca.png'

function DashboardClientes() {
    const [totalhabilitados, setTotalHabilitados] = useState("")
    const [totalsuspenso, setTotalSuspenso] = useState("")
    const [totaldebito, setTotalDebito] = useState("")
    const [totalclientesc, setTotalClienteSC] = useState("")
    const [totalclienters, setTotalClienteRS] = useState("")
    const [totalclientes, setTotalClientes] = useState("")
    const [totalclientespj, setTotalClientesPJ] = useState("")
    const [totalclientespf, setTotalClientesPF] = useState("")
    const [totalticketmedio, setTotalTicketMedio] = useState("")
    const [totalltv, setTotalLTV] = useState("")
    const [dadosCidades, setDadosCidades] = useState([]);
    const [topplanos, setTopPlanos] = useState([]);
    const [topticket, setTopTicket] = useState([]);
    const [topbairros, setTopBairros] = useState([]);



      useEffect(() => {
        // Função para buscar os dados
        const fetchData = async () => {
          try {
            // Buscar dados de SC
            const responsehabilitados = await fetch('http://38.224.145.3:3004/clientes-servicos-habilitados');
            const datahabilitados = await responsehabilitados.json();
            setTotalHabilitados(datahabilitados.total_clientes_ativos); // Armazenando o total de cadastros de SC


            const responsesuspenso = await fetch('http://38.224.145.3:3004/clientes-servicos-suspenso');
            const datasuspenso = await responsesuspenso.json();
            setTotalSuspenso(datasuspenso.total_clientes_suspensos); // Armazenando o total de cadastros de SC


            const responsedebito = await fetch('http://38.224.145.3:3004/clientes-servicos-suspenso-debito');
            const datadebito = await responsedebito.json();
            setTotalDebito(datadebito.total_clientes_ativos); // Armazenando o total de cadastros de SC

            const responseclientesc = await fetch('http://38.224.145.3:3004/clientes-sc');
            const dataclientesc = await responseclientesc.json();
            setTotalClienteSC(dataclientesc.total_clientes_sc); // Armazenando o total de cadastros de SC

            const responseclienters = await fetch('http://38.224.145.3:3004/clientes-rs');
            const dataclienters = await responseclienters.json();
            setTotalClienteRS(dataclienters.total_clientes_caxias); // Armazenando o total de cadastros de SC

            const responseclientestotal = await fetch('http://38.224.145.3:3004/clientestotal');
            const dataclientestotal = await responseclientestotal.json();
            setTotalClientes(dataclientestotal.total_clientes); // Armazenando o total de cadastros de SC


            const responseclientespj = await fetch('http://38.224.145.3:3004/clientes-tipo-pessoa-pj');
            const dataclientespj = await responseclientespj.json();
            setTotalClientesPJ(dataclientespj.total_clientes_pf); // Armazenando o total de cadastros de SC

            const responseclientespf = await fetch('http://38.224.145.3:3004/clientes-tipo-pessoa-pf');
            const dataclientespf = await responseclientespf.json();
            setTotalClientesPF(dataclientespf.total_clientes_pf); // Armazenando o total de cadastros de SC

            const responseticketmedio = await fetch('http://38.224.145.3:3004/ticket-medio');
            const dataticketmedio = await responseticketmedio.json();
            setTotalTicketMedio(dataticketmedio.ticket_medio); // Armazenando o total de cadastros de SC

            const responseltv = await fetch('http://38.224.145.3:3004/ltv');
            const dataltv = await responseltv.json();
            setTotalLTV(dataltv.tempo_medio_na_base_meses); // Armazenando o total de cadastros de SC

            
            const responsetop4cidades = await fetch('http://38.224.145.3:3004/clientes-top4-cidades');
            const dattop4cidades = await responsetop4cidades.json();
            const formattedData = dattop4cidades.top4_cidades.map(data => ({
                cidade_nome: data.cidade_nome, // Manter o nome correto
                qtd: parseInt(data.total_clientes, 10) // Converter para número
            }));

            setDadosCidades(formattedData);


            const responsetopplanos = await fetch('http://38.224.145.3:3004/planos-mais-vendidos');
            const dattopplanos = await responsetopplanos.json();
            const formattedtopplanos = dattopplanos.planos_mais_vendidos.map(data => ({
                plano: data.plano, // Manter o nome correto
                total_vendas: parseInt(data.total_vendas, 10) // Converter para número
            }));

            setTopPlanos(formattedtopplanos);


            const responsetopticket = await fetch('http://38.224.145.3:3004/maiores-tickets');
            const dattopticket = await responsetopticket.json();
            const formattedtopticket = dattopticket.maiores_tickets.map(data => ({
                nome: data.nome_cliente, // Manter o nome correto
                valor: parseInt(data.valor_pago, 10) // Converter para número
            }));

            setTopTicket(formattedtopticket);


            const responsetopbairro = await fetch('http://38.224.145.3:3004/clientes-top10-bairros');
            const dattopbairro = await responsetopbairro.json();
            const formattedtopbairro = dattopbairro.top10_bairros.map(data => ({
                nome: data.bairro, // Manter o nome correto
                valor: parseInt(data.total_clientes, 10) // Converter para número
            }));

            setTopBairros(formattedtopbairro);
    
           
    
          } catch (error) {
            console.error('Erro ao buscar dados:', error);
          }
        };
    
        // Chama a função para buscar os dados
        fetchData();
        
        // Atualiza os dados a cada 3 segundos
        const intervalId = setInterval(fetchData, 3000);
    
        // Limpeza do intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
      }, []);

      

  return (
    <div className='body-clientes'>

            <div className='body-header-clientes'>


                <div className='row-header-clientes'>

                    <div className='card-header-clientes1'>
                    <h1 className='h1-card-header-clientes'>TOTAL DE CLIENTES</h1>
                    <h1 className='h2-card-header-clientes'>{totalclientes}</h1>
                    </div>
                    

                    <div className='card-header-clientes2'>
                    <h1 className='h1-card-header-clientes'>CLIENTES HABILITADOS</h1>
                    <h1 className='h2-card-header-clientes'>{totalhabilitados}</h1>
                    </div>


                    <div className='card-header-clientes3'>
                    <h1 className='h1-card-header-clientes'>CLIENTES SUSPENSOS</h1>
                    <h1 className='h2-card-header-clientes'>{totalsuspenso}</h1>
                    </div>


                    <div className='card-header-clientes4'>
                    <h1 className='h1-card-header-clientes'>CLIENTES SUP. DÉBITO</h1>
                    <h1 className='h2-card-header-clientes'>{totaldebito}</h1>
                    </div>

                </div>


                <div className='row2-header-clientes'>
                    <div className='div2-header-clientes'>

                        <div className='row3-header-clientes'>

                        <div className='card-div2-header1-clientes'>
                            <h1 className='titulodiv-header1-clientes-bairros'>RS</h1>
                            <h1 className='h2-card-header2-clientes'>{totalclienters}</h1>
                        </div>

                        <div className='card-div2-header4-clientes'>
                            <h1 className='titulodiv-header1-clientes-bairros'>PJ</h1>
                            <h1 className='h2-card-header2-clientes'>{totalclientespj}</h1>
                        </div>

                        <div className='card-div2-header-clientes3'>
                            <h1 className='titulodiv-header-clientes-bairros'>LTV</h1>
                            <h1 className='h2-card-header-clientes'>{totalltv}</h1>
                            <h1 className='titulodiv1-header-clientes-bairros'>MESES</h1>
                        </div>

                        </div>
                     

                        <div className='row4-header-clientes'>

                        <div className='card-div2-header2-clientes'>
                            <h1 className='titulodiv-header1-clientes-bairros'>SC</h1>
                            <h1 className='h2-card-header2-clientes'>{totalclientesc}</h1>
                        </div>

                        <div className='card-div2-header3-clientes'>
                            <h1 className='titulodiv-header1-clientes-bairros'>PF</h1>
                            <h1 className='h2-card-header2-clientes'>{totalclientespf}</h1>
                        </div>

                        <div className='card-div2-header-clientes3'>
                            <h1 className='titulodiv-header-clientes-bairros'>TICKET MÉDIO</h1>
                            <h1 className='h2-card-header-clientes'>$ {totalticketmedio}</h1>
                        </div>

                        </div>


                        <div className='row5-header-clientes'>

                            <div className='card-div2-header-clientes5'>
                                <h1 className='titulodiv-header-clientes-bairros'>TOP CIDADES</h1>

                                <table style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th className='titulo-tabela-churn-cidade'>Cidade</th>
                                            <th className='titulo-tabela-churn-cidade1'>QTD</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dadosCidades.length > 0 ? (
                                            dadosCidades.map((data, index) => (
                                                <tr key={index}>
                                                    <th className='titulo-tabela-churn-cidade'>{data.cidade_nome}</th>
                                                    <th className='titulo-tabela-churn-cidade1'>{data.qtd}</th>
                                             
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">Sem dados disponíveis</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                           
                            </div>

                            <div className='card-div2-header-clientes5'>
                                <h1 className='titulodiv-header-clientes-bairros'>TOP PLANOS</h1>

                                <table style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th className='titulo-tabela-churn-cidade'>Planos</th>
                                            <th className='titulo-tabela-churn-cidade1'>QTD</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topplanos.length > 0 ? (
                                            topplanos.map((data, index) => (
                                                <tr key={index}>
                                                    <th className='titulo-tabela-churn-cidade'> {data.plano.length > 15 ? data.plano.slice(0, 15) + "..." : data.plano}</th>
                                                    <th className='titulo-tabela-churn-cidade1'>{data.total_vendas}</th>
                                             
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">Sem dados disponíveis</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                           
                            </div>
             

                            <div className='card-div2-header-clientes5'>
                                <h1 className='titulodiv-header-clientes-bairros'>TOP TICKET'S</h1>


                                <table style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th className='titulo-tabela-churn-cidade'>Planos</th>
                                            <th className='titulo-tabela-churn-cidade1'>QTD</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topticket.length > 0 ? (
                                            topticket.map((data, index) => (
                                                <tr key={index}>
                                                    <th className='titulo-tabela-churn-cidade'> {data.nome.length > 12 ? data.nome.slice(0, 12) + "..." : data.nome}</th>
                                                    <th className='titulo-tabela-churn-cidade1'>{data.valor}</th>
                                             
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">Sem dados disponíveis</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                              
                            </div>

                            </div>

                    </div>

                    <div className='div3-header-clientes'>
                            <div className='div-header-clientes-bairros'>
                                <h1 className='titulodiv-header-clientes-bairros'>TOP BAIRROS</h1>

                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <table style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', marginTop:10, width: '90%'}}>
                                    <thead>
                                        <tr>
                                            <th className='titulo-tabela-churn-cidade3'>Planos</th>
                                            <th className='titulo-tabela-churn-cidade1'>QTD</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topbairros.length > 0 ? (
                                            topbairros.map((data, index) => (
                                                <tr key={index}>
                                                    <th className='titulo-tabela-churn-cidade3'> {data.nome.length > 20 ? data.nome.slice(0, 20) + "..." : data.nome}</th>
                                                    <th className='titulo-tabela-churn-cidade1'>{data.valor}</th>
                                             
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">Sem dados disponíveis</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                </div>


                            </div>
                    </div>
                </div>

            </div>


            <div className='div-titulo-dash'>
            <h1 className='h2-titulo-dash'>CHURN TV</h1>
            <h1 className='h1-titulo-dash'>CLIENTES TV</h1>
            <img src={logobranca}/>
        </div>


    </div>
  )
}

export default DashboardClientes