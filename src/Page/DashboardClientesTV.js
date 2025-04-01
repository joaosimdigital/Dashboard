import React, { useEffect, useState } from 'react'

import '../CSS/DashboardClientes.css'

//Images
import logobranca from '../Images/logobrnaca.png'

function DashboardClientesTV() {
    const [totalhabilitados, setTotalHabilitados] = useState("")
    const [totalsuspenso, setTotalSuspenso] = useState("")
    const [totaldebito, setTotalDebito] = useState("")
    const [totalclientesc, setTotalClienteSC] = useState("")
    const [totalclienters, setTotalClienteRS] = useState("")
    const [totalclienteRStotal, setTotalClienteRSTotal] = useState("")
    const [totalclienterspf, setTotalClienteRSPF] = useState("")
    const [totalclienterspj, setTotalClienteRSPJ] = useState("")
    const [totalclientescpf, setTotalClienteSCPF] = useState("")
    const [totalclientescpj, setTotalClienteSCPJ] = useState("")
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


            const responseclienterstotal = await fetch('http://38.224.145.3:3004/clientes-rs-total');
            const dataclienterstotal = await responseclienterstotal.json();
            setTotalClienteRSTotal(dataclienterstotal.total_clientes_sc); // Armazenando o total de cadastros de SC

          
            const responseclienterspf = await fetch('http://38.224.145.3:3004/clientes-rs-pf');
            const dataclienterspf = await responseclienterspf.json();
            setTotalClienteRSPF(dataclienterspf.total_clientes_sc); // Armazenando o total de cadastros de SC

            const responseclienterspj = await fetch('http://38.224.145.3:3004/clientes-rs-pj');
            const dataclienterspj = await responseclienterspj.json();
            setTotalClienteRSPJ(dataclienterspj.total_clientes_sc); // Armazenando o total de cadastros de SC

            const responseclientescpf = await fetch('http://38.224.145.3:3004/clientes-sc-pf');
            const dataclientescpf = await responseclientescpf.json();
            setTotalClienteSCPF(dataclientescpf.total_clientes_sc); // Armazenando o total de cadastros de SC
            
            const responseclientescpj = await fetch('http://38.224.145.3:3004/clientes-sc-pj');
            const dataclientescpj = await responseclientescpj.json();
            setTotalClienteSCPJ(dataclientescpj.total_clientes_sc); // Armazenando o total de cadastros de SC

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


            <div className='card3-header-clientes'>
                            <h1 className='h1-card-header-clientes1'>TOTAL DE CLIENTES</h1>
                            <h1 className='h3-card-header-clientes'>{totalclientes}</h1>
                            </div>

            <div className='body-header-clientes'>

                <div className='div1-header-clientes'>

                <div className='card1-header-clientes'>
                    <h1 className='h1-card-header-clientes'>TOTAL DE CLIENTES SC</h1>
                    <h1 className='h2-card-header-clientes'>{totalclientesc}</h1>
                    </div>

                    <div className='card1-header-clientes'>
                    <h1 className='h1-card-header-clientes'>CLIENTES SC PF</h1>
                    <h1 className='h2-card-header-clientes'>{totalclientescpf}</h1>
                    </div>

                    <div className='card1-header-clientes'>
                    <h1 className='h1-card-header-clientes'>CLIENTES SC PJ</h1>
                    <h1 className='h2-card-header-clientes'>{totalclientescpj}</h1>
                    </div>


                </div>


                <div className='div1-header-clientes'>

                        <div className='card1-header-clientes'>
                            <h1 className='h1-card-header-clientes'>TOTAL DE CLIENTES RS</h1>
                            <h1 className='h2-card-header-clientes'>{totalclienteRStotal}</h1>
                            </div>

                            <div className='card1-header-clientes'>
                            <h1 className='h1-card-header-clientes'>CLIENTES RS PF</h1>
                            <h1 className='h2-card-header-clientes'>{totalclienterspf}</h1>
                            </div>

                            <div className='card1-header-clientes'>
                            <h1 className='h1-card-header-clientes'>CLIENTES RS PJ</h1>
                            <h1 className='h2-card-header-clientes'>{totalclienterspj}</h1>
                            </div>


                        </div>

                {/*
                    <div className='div2-header-clientes'>

                    <div className='card2-header-clientes'>
                        <h1 className='h4-card-header-clientes'>Faturamento</h1>
                 

                        <h1 className='h1-card-header-clientes'>Faturamento SC</h1>
                    <h1 className='h1-card-header-clientes'>Faturamento SC PF</h1>
                    <h1 className='h1-card-header-clientes'>Faturamento SC PJ</h1>



                    <h1 className='h1-card-header-clientes'>Faturamento RS</h1>
                    <h1 className='h1-card-header-clientes'>Faturamento RS PF</h1>
                    <h1 className='h1-card-header-clientes'>Faturamento RS PJ</h1>


                        </div>

                    </div>
               
                */}

            </div>


            <div className='div-titulo-dash'>
            <h1 className='h2-titulo-dash'>CHURN TV</h1>
            <h1 className='h1-titulo-dash'>CLIENTES TV</h1>
            <img src={logobranca}/>
        </div>


    </div>
  )
}

export default DashboardClientesTV