import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, PieChart, Pie, Cell } from 'recharts';



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
    const [totalPorcentagemCadastrosRSPF, setPorcentagemTotalCadastrosRSPF] = useState(0); // PF no RS
  const [totalCadastrosRSPJ, setTotalCadastrosRSPJ] = useState(0); // PJ no RS
    const [totalPercentualCadastrosRSPJ, setPercentualCadastrosRSPJ] = useState(0); // PJ no RS
  const [totalCadastrosSCPF, setTotalCadastrosSCPF] = useState(0); // PF no SC
    const [totalPorcentagemCadastrosSCPF, setPorcentagemTotalCadastrosSCPF] = useState(0); // PF no SC
  const [totalmediadia, setTotalMediaDia] = useState(0); // PF no SC
  const [totalCadastrosSCPJ, setTotalCadastrosSCPJ] = useState(0); // PJ no SC
    const [totalPorcentagemCadastrosSCPJ, setPorcentagemTotalCadastrosSCPJ] = useState(0); // PJ no SC
  const [totalVendasDiaSC, setTotalVendasDiaSC] = useState(0);
  const [totalVendasDiaRS, setTotalVendasDiaRS] = useState(0);
  const [planosVendidos, setPlanosVendidos] = useState([]);
  const [totalGeral, setTotalGeral] = useState(0);
  const [maioresTickets, setMaioresTickets] = useState([]);
  const [churnUltimosMeses, setChurnUltimosMeses] = useState([]);
  const [totalAtendimentos, setTotalAtendimentos] = useState(null);
  const [totalAguardando, setTotalAguardando] = useState(null);
  const [mediaDiaria, setMediaDiaria] = useState(0);
  const [metaTotal, setMetaTotal] = useState("");
  const [porcentagemMeta, setPorcentagemMeta] = useState(0);
  const metasMensais = [
  { mes: 'jan/25', meta: 941 },
  { mes: 'fev/25', meta: 953 },
  { mes: 'mar/25', meta: 965 },
  { mes: 'abr/25', meta: 976 },
  { mes: 'mai/25', meta: 988 },
  { mes: 'jun/25', meta: 1000 },
   { mes: 'jul/25', meta: 1012 }
];


const getMesFormatado = () => {
  const now = new Date();
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const mes = meses[now.getMonth()];
  const ano = String(now.getFullYear()).slice(2); // pega só os dois últimos dígitos
  return `${mes}/${ano}`;
};
const mesAtual = getMesFormatado(); // exemplo: 'jun/25'
const metaDoMes = metasMensais.find(m => m.mes === mesAtual)?.meta || 0;




const statusMeta = totalmediadia >= mediaDiaria ? 'ACIMA' : 'ABAIXO';

 
  
  const data = [
    { name: "Alcançado", value: porcentagemMeta},
    { name: "Restante", value: 100 - porcentagemMeta}
  ];

const COLORS = ['#FF4500', '#D3D3D3'];

  
  useEffect(() => {
    const metaTotal = 1035;
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    
    // Gerar todos os dias do mês
    const diasUteis = Array.from({ length: diasNoMes }, (_, i) => new Date(anoAtual, mesAtual, i + 1))
      .filter(dia => dia.getDay() !== 0); // Remove domingos
    
    // Calcula a média diária
    setMediaDiaria((metaTotal / diasUteis.length).toFixed(0));
  }, []);



  useEffect(() => {
    const meta = 1035
    const total = Number(totalVendasDiaSC) + Number(totalVendasDiaRS);
    setMetaTotal(total);


    const totalMeses = Number(totalCadastrosSC) + Number(totalCadastrosRS)
    const porcentagemmes = (((totalMeses / meta) * 100).toFixed(0))
    setPorcentagemMeta(porcentagemmes)

  }, [totalVendasDiaSC, totalVendasDiaRS]);

  useEffect(() => { 
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

         // Buscar dados de RS
         const responseMediadia = await fetch('http://38.224.145.3:3002/media-cadastros-mes');
         const dataMediadia = await responseMediadia.json();
         setTotalMediaDia(dataMediadia.media_por_dia_util); // Armazenando o total de cadastros de RS

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
        setTotalCadastrosRSPF(dataRSPF.total_cadastros); // Armazenando o total de cadastros PF no RS
        setPorcentagemTotalCadastrosRSPF(dataRSPF.percentual_faturamento)


        // Buscar dados de Clientes PJ no RS
        const responseRSPJ = await fetch('http://38.224.145.3:3002/cadastros-rs-pj');
        const dataRSPJ = await responseRSPJ.json();
        setTotalCadastrosRSPJ(dataRSPJ.total_cadastros); // Armazenando o total de cadastros PJ no RS
        setPercentualCadastrosRSPJ(dataRSPJ.percentual_faturamento); // Armazenando o total de cadastros PJ no RS
          

         // Buscar dados de Clientes PF em SC
         const responseSCPF = await fetch('http://38.224.145.3:3002/cadastros-sc-pf');
         const dataSCPF = await responseSCPF.json();
         setTotalCadastrosSCPF(dataSCPF.total_cadastros); // Armazenando o total de cadastros PF em SC
         setPorcentagemTotalCadastrosSCPF(dataSCPF.percentual_faturamento)
 
         // Buscar dados de Clientes PJ em SC
         const responseSCPJ = await fetch('http://38.224.145.3:3002/cadastros-sc-pj');
         const dataSCPJ = await responseSCPJ.json();
         setTotalCadastrosSCPJ(dataSCPJ.total_cadastros); // Armazenando o total de cadastros PJ em SC
         setPorcentagemTotalCadastrosSCPJ(dataSCPJ.percentual_faturamento)

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


    const getDaysRemaining = () => {
      const today = new Date();
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return lastDayOfMonth.getDate() - today.getDate();
    };
  

  return (
    <div className='body-principal'>

      <div className='div-row-principal'>

      <div className='div-row-primeiro-card'>
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
          <h1 className='h2-card-meta-mes'>{metaDoMes}</h1>
          
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
                <h1  className='h1-card-upgrade'>Media / Dia</h1>
                <h1  className='h2-card-upgrade'>{totalmediadia}</h1>
            </div>
        </div>

        </div>

        <div className='row-card-meta'>

        <div className='div-row-card-meta'>
          <h1 className='h1-div-row-card-meta'>Meta dia</h1>
          <h1  className='h2-div-row-card-meta'>{mediaDiaria}</h1>
        </div>

       <div
              className='div-row-card-meta-text'
              style={{ backgroundColor: statusMeta === 'ACIMA' ? '#12B51D' : 'red' }}
            >
              <h1 className='h1-div-row-card-meta-text'>{statusMeta}</h1>
            </div>


        </div>

        </div>

    <div className='body-card-vendas-mes'>

      <h1 className='sc-h1-card-vendas'>SC</h1>

      {/* Novos cards para exibir dados de PF e PJ no RS */}
      <div className='card-vendas-mes-azul'>
        <h1 className='h1-card-vendas-mes-painel'>PF <h1 style={{fontSize: 10, marginLeft: 10}}> (QTD. e Porcentagem Faturamento)</h1></h1>
        <h1 className='h2-card-vendas-mes-painel'>{totalCadastrosSCPF}<h1 className='h2-card-vendas-mes-painel1'>{totalPorcentagemCadastrosSCPF}</h1></h1>
      </div>

      <div className='card-vendas-mes-azul'>
        <h1 className='h1-card-vendas-mes-painel'>PJ <h1 style={{fontSize: 10, marginLeft: 10}}> (QTD. e Porcentagem Faturamento)</h1></h1>
        <h1 className='h2-card-vendas-mes-painel'>{totalCadastrosSCPJ}<h1 className='h2-card-vendas-mes-painel1'>{totalPorcentagemCadastrosSCPJ}</h1></h1>
      </div>

     

      <h1 className='rs-h1-card-vendas'>RS</h1>

      <div  className='card-vendas-mes-azul'>
        <h1 className='h1-card-vendas-mes-painel'>PF <h1 style={{fontSize: 10, marginLeft: 10}}> (QTD. e Porcentagem Faturamento)</h1></h1>
        <h1 className='h2-card-vendas-mes-painel'>{totalCadastrosRSPF}<h1 className='h2-card-vendas-mes-painel1'>{totalPorcentagemCadastrosRSPF}</h1></h1>
      </div>

      <div  className='card-vendas-mes-azul'>
        <h1 className='h1-card-vendas-mes-painel'>PJ <h1 style={{fontSize: 10, marginLeft: 10}}> (QTD. e Porcentagem Faturamento)</h1></h1>
        <h1 className='h2-card-vendas-mes-painel'>{totalCadastrosRSPJ}<h1 className='h2-card-vendas-mes-painel1'>{totalPercentualCadastrosRSPJ}</h1></h1>
      </div>

    

      </div>

      <div className='body-grafica-vendas'>

          <div className='div-card-grafico-vendas'>

            <div>
            <h1 className='h1-header-card-grafico-vendas'>Top 3</h1>
            <h1 className='h2-header-card-grafico-vendas'>Planos vendidos mês</h1>
            </div>


              <table style={{marginLeft: '20px'}}>
          <thead>
            <tr>
              <th className='titulo-tabela-grafico-vendas'>Plano</th>
              <th className='subtitulo-tabela-grafico-vendas'>QTD</th>
            </tr>
          </thead>
          <tbody>
            {planosVendidos.map((plano, index) => (
              <tr key={index}>
           <td className='titulo-tabela-grafico-vendas'>{plano.plano.length > 30 ? plano.plano.substring(0, 30) + "..." : plano.plano}</td>
                <td className='subtitulo-tabela-grafico-vendas'>{plano.total_vendas}</td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>

          <div className='div-card-grafico-vendas'>

<div style={{marginRight: 20}}>
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
  {ticket.nome_cliente.length > 30
    ? ticket.nome_cliente.slice(0, 30) + '...' 
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

                <div className='div-responsive'>
                  <h1 className='h1-porcentagem-atingida'>Porcentagem atingida %</h1>
                  <ResponsiveContainer width="100%" height={75}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={15} // Raio interno
                      outerRadius={30} // Raio externo
                      paddingAngle={2}
                      dataKey="value"
                      label={(entry) => `${entry.value}%`} 
                    >
                     {data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={COLORS[index]} // Aplica a cor baseada no índice, primeiro alcançado (laranja), depois restante (cinza)
        />
      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>


                </div>

              </div>


        <div className='grafico-comercial'>
                      <h1 className='h1-tabela-churn-cidade'>Vendas por trimestre</h1>
      
                      {churnUltimosMeses.length > 0 ? (
                          <ResponsiveContainer width="95%" height={160} style={{marginTop: '-10px'}}>
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

      <div className='div-para-bater-meta'>
        <h1 className='h1-para-bater-meta'>  Faltam {getDaysRemaining()} dias para batermos a meta!</h1>
      </div>


      <div className='div-titulo-dash'>
            <h1 className='h2-titulo-dash'>CHURN TV</h1>
            <h1 className='h1-titulo-dash'>COMERCIAL TV</h1>
            <img src={logobranca}/>
        </div>

    </div>
  );
}
