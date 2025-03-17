import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

//CSS
import '../CSS/DashboardComercial.css'
import '../CSS/Dashboard.css'

//Images
import logobranca from '../Images/logobrnaca.png'

export default function DashboardComercial() {
  // Estados para armazenar os dados
  const [totalCadastrosSC, setTotalCadastrosSC] = useState(0);
  const [totalCadastrosRS, setTotalCadastrosRS] = useState(0);
  const [totalCadastrosRSPF, setTotalCadastrosRSPF] = useState(0); // PF no RS
  const [totalCadastrosRSPJ, setTotalCadastrosRSPJ] = useState(0); // PJ no RS
  const [totalCadastrosSCPF, setTotalCadastrosSCPF] = useState(0); // PF no SC
  const [totalCadastrosSCPJ, setTotalCadastrosSCPJ] = useState(0); // PJ no SC
  const [totalVendasDiaSC, setTotalVendasDiaSC] = useState(0);
  const [totalVendasDiaRS, setTotalVendasDiaRS] = useState(0);
  const [planosVendidos, setPlanosVendidos] = useState([]);
  const [totalGeral, setTotalGeral] = useState(0);
  const [maioresTickets, setMaioresTickets] = useState([]);
  const [churnUltimosMeses, setChurnUltimosMeses] = useState([]);
  const [totalAtendimentos, setTotalAtendimentos] = useState(null);
  const [totalAguardando, setTotalAguardando] = useState(null);


  useEffect(() => {
    // Função para buscar os dados
    const fetchData = async () => {
      try {
        // Buscar dados de SC
        const responseSC = await fetch('http://38.224.145.3:3002/cadastros-sc');
        const dataSC = await responseSC.json();
        setTotalCadastrosSC(dataSC.total_cadastros); // Armazenando o total de cadastros de SC

        // Buscar dados de RS
        const responseRS = await fetch('http://38.224.145.3:3002/cadastros-rs');
        const dataRS = await responseRS.json();
        setTotalCadastrosRS(dataRS.total_cadastros); // Armazenando o total de cadastros de RS

        const responseDiaSC = await fetch('http://38.224.145.3:3002/cadastros-sc-dia');
        const dataDiaSC = await responseDiaSC.json();
        setTotalVendasDiaSC(dataDiaSC.total_cadastros || 0);

        // Buscar Vendas do Dia RS
        const responseDiaRS = await fetch('http://38.224.145.3:3002/cadastros-rs-dia');
        const dataDiaRS = await responseDiaRS.json();
        setTotalVendasDiaRS(dataDiaRS.total_cadastros || 0);

        // Buscar dados de Clientes PF no RS
        const responseRSPF = await fetch('http://38.224.145.3:3002/cadastros-rs-pf');
        const dataRSPF = await responseRSPF.json();
        setTotalCadastrosRSPF(dataRSPF.total_cadastros_pf); // Armazenando o total de cadastros PF no RS

        // Buscar dados de Clientes PJ no RS
        const responseRSPJ = await fetch('http://38.224.145.3:3002/cadastros-rs-pj');
        const dataRSPJ = await responseRSPJ.json();
        setTotalCadastrosRSPJ(dataRSPJ.total_cadastros_pj); // Armazenando o total de cadastros PJ no RS

         // Buscar dados de Clientes PF em SC
         const responseSCPF = await fetch('http://38.224.145.3:3002/cadastros-sc-pf');
         const dataSCPF = await responseSCPF.json();
         setTotalCadastrosSCPF(dataSCPF.total_cadastros); // Armazenando o total de cadastros PF em SC
 
         // Buscar dados de Clientes PJ em SC
         const responseSCPJ = await fetch('http://38.224.145.3:3002/cadastros-sc-pj');
         const dataSCPJ = await responseSCPJ.json();
         setTotalCadastrosSCPJ(dataSCPJ.total_cadastros); // Armazenando o total de cadastros PJ em SC

         const response = await fetch('http://38.224.145.3:3002/maiores-tickets');
         const data = await response.json();
         setMaioresTickets(data.maiores_tickets || []);

         const responseupgrade = await fetch('http://38.224.145.3:3002/upgrade');
         const dataupgrade = await responseupgrade.json();
         setTotalAtendimentos(dataupgrade.total_atendimentos); 

         const responseaguardando = await fetch('http://38.224.145.3:3002/aguardandoinstalacao');
         const dataaguardando = await responseaguardando.json();
         setTotalAguardando(dataaguardando.total_cadastros); 

         const responsetrimestre = await fetch('http://38.224.145.3:3002/total-clientes-trimestre');
         const datatrimestre = await responsetrimestre.json();
         const formattedData = datatrimestre.meses.map(mes => ({
             mes: `Mês ${mes.mes}`, // Exibir como "Mês 1", "Mês 2"...
             churn: parseInt(mes.total_clientes, 10) // Convertendo para número
         }));

         setChurnUltimosMeses(formattedData);


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
  }, []); // O array vazio faz a requisição apenas uma vez quando o componente for montado



  useEffect(() => {
    const fetchPlanosVendidos = async () => {
      try {
        const response = await fetch('http://38.224.145.3:3002/planos-mais-vendidos');
        const data = await response.json();

        // Certifica-se de que os dados existem antes de acessar
        setPlanosVendidos(data.planos_mais_vendidos || []);
        setTotalGeral(data.total_geral_vendas || 0);
      } catch (error) {
        console.error('Erro ao buscar planos vendidos:', error);
        setPlanosVendidos([]); // Garante que o estado não fique indefinido
      }
    };

    fetchPlanosVendidos();
    const intervalId = setInterval(fetchPlanosVendidos, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='body-principal'>

      <div className='div-row-principal'>

      <div>
      <div className='row-primeiro-card'>
        <div className='card-primeiro-metricas-mes'>
          <h1 className='h2-numeros-vendas-mes'>Vendas Mês SC</h1>
          <h1 className='h1-numeros-vendas-mes'>{totalCadastrosSC}</h1>
        </div>
        <div className='card-primeiro-metricas-mes'>
          <h1 className='h2-numeros-vendas-mes'>Vendas Mês RS</h1>
          <h1 className='h1-numeros-vendas-mes'>{totalCadastrosRS}</h1>
        </div>
      </div>


        <div className='card-meta-mes'>
          <h1 className='h1-card-meta-mes'>Meta Mês</h1>
          <h1 className='h2-card-meta-mes'>0</h1>
          
          </div>

        <div className='div-dados-vendas'>

        <div className='card-vendas-dia'>
            <h1 className='h1-card-vendas-dia'>Vendas dia SC</h1>
            <h1 className='h2-card-vendas-dia'>{totalVendasDiaSC}</h1>
            <h1 className='h1-card-vendas-dia'>Vendas dia RS</h1>
            <h1 className='h2-card-vendas-dia'>{totalVendasDiaRS}</h1>
        </div>

        <div className='div-card-upgrade'>
            <div className='card-upgrade'>
                <h1 className='h1-card-upgrade'>Upgrade</h1>
                <h1  className='h2-card-upgrade'>{totalAtendimentos}</h1>
            </div>
            <div className='card-upgrade'>
                <h1  className='h1-card-upgrade'>Media / média</h1>
                <h1  className='h2-card-upgrade'>10</h1>
            </div>
        </div>

        </div>

        <div className='row-card-meta'>

        <div className='div-row-card-meta'>
          <h1 className='h1-div-row-card-meta'>Meta dia</h1>
          <h1  className='h2-div-row-card-meta'>0</h1>
        </div>

        <div className='div-row-card-meta-text'>
          <h1 className='h1-div-row-card-meta-text'>ABAIXO</h1>
        </div>

        </div>

        </div>

    <div className='body-card-vendas-mes'>

      <h1 className='sc-h1-card-vendas'>SC</h1>

      {/* Novos cards para exibir dados de PF e PJ no RS */}
      <div className='card-vendas-mes-azul'>
        <h1 className='h1-card-vendas-mes-painel'>PF</h1>
        <h1 className='h2-card-vendas-mes-painel'>{totalCadastrosRSPF}</h1>
      </div>

      <div className='card-vendas-mes-azul'>
        <h1 className='h1-card-vendas-mes-painel'>PJ</h1>
        <h1 className='h2-card-vendas-mes-painel'>{totalCadastrosSCPJ}</h1>
      </div>

     

      <h1 className='rs-h1-card-vendas'>RS</h1>

      <div  className='card-vendas-mes-azul'>
        <h1 className='h1-card-vendas-mes-painel'>PF</h1>
        <h1 className='h2-card-vendas-mes-painel'>{totalCadastrosSCPF}</h1>
      </div>

      <div  className='card-vendas-mes-azul'>
        <h1 className='h1-card-vendas-mes-painel'>PJ</h1>
        <h1 className='h2-card-vendas-mes-painel'>{totalCadastrosRSPJ}</h1>
      </div>

    

      </div>

      <div className='body-grafica-vendas'>

          <div className='div-card-grafico-vendas'>

            <div>
            <h1 className='h1-header-card-grafico-vendas'>Top 3</h1>
            <h1 className='h2-header-card-grafico-vendas'>Planos vendidos mês</h1>
            </div>


              <table>
          <thead>
            <tr>
              <th className='titulo-tabela-grafico-vendas'>Plano</th>
              <th className='subtitulo-tabela-grafico-vendas'>QTD</th>
            </tr>
          </thead>
          <tbody>
            {planosVendidos.map((plano, index) => (
              <tr key={index}>
                <td className='titulo-tabela-grafico-vendas'>{plano.plano}</td>
                <td className='subtitulo-tabela-grafico-vendas'>{plano.total_vendas}</td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>

          <div className='div-card-grafico-vendas'>

<div>
<h1 className='h1-header-card-grafico-vendas'>Top 3</h1>
<h1 className='h2-header-card-grafico-vendas'>High ticket's mês</h1>
</div>


  <table>
<thead>
<tr>
  <th className='titulo-tabela-grafico-vendas'>Plano</th>
  <th className='subtitulo-tabela-grafico-vendas'>Valor</th>
</tr>
</thead>
<tbody>
{maioresTickets.map((ticket, index) => (
  <tr key={index}>

   <td className='titulo-tabela-grafico-vendas'>
  {ticket.nome_cliente.length > 25 
    ? ticket.nome_cliente.slice(0, 25) + '...' 
    : ticket.nome_cliente}
</td>

    <td className='subtitulo-tabela-grafico-vendas'>R$ {ticket.valor_pago.toFixed(2)}</td>
  </tr>
))}
</tbody>
</table>
</div>


              <div className='div-card-grafico-aguardando'>
                  
                <div className='card-grafico-aguardando'>
                  <h1 className='h1-card-grafico-aguardando'>Aguardando Instalação</h1>
                  <h1 className='h2-card-grafico-aguardando'>{totalAguardando}</h1>
                </div>

                <div>

                </div>

              </div>


        <div className='grafico-comercial'>
                      <h1 className='h1-tabela-churn-cidade'>Vendas por trimestre</h1>
      
                      {churnUltimosMeses.length > 0 ? (
                          <ResponsiveContainer width="95%" height={150}>
                              <BarChart data={churnUltimosMeses}>
                                  <CartesianGrid strokeDasharray="2 2" />
                                  <XAxis dataKey="mes" tick={{ fill: '#fff' }} fontWeight='bold' />
                                  <YAxis  tick={{ fill: '#fff' }} />
                                  <Tooltip />
                                 
                                  <Bar dataKey="churn" stackId="a" fill="#F45742">
                                      {/* Exibindo os valores dentro das barras */}
                                      <LabelList dataKey="churn" position="inside" fill="#fff" fontWeight='bold'/>
                                  </Bar>
                                
                              </BarChart>
                          </ResponsiveContainer>
                      ) : (
                          <p>Carregando dados...</p>
                      )}
                  </div>

      </div>

      

      </div>

      <div>
        <h1>Faltam 20 dias para batermos a meta!</h1>
      </div>


      <div className='div-titulo-dash'>
            <h1 className='h2-titulo-dash'>CHURN TV</h1>
            <h1 className='h1-titulo-dash'>COMERCIAL TV</h1>
            <img src={logobranca}/>
        </div>

    </div>
  );
}
