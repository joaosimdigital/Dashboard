import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,  Legend } from 'recharts';

import logobranca from '../Images/logobrnaca.png'
import '../CSS/DashboardChurnGerencial.css'
import '../CSS/DashboardComercialgerencial.css'

function DashboardComercialgerencial() {
    const [totalCadastrosRS, setTotalCadastrosRS] = useState(0);
    const [tipoPessoa, setTipoPessoa] = useState('');
    const [totalCadastrosSC, setTotalCadastrosSC] = useState(0);
    const [totalCadastrosHojeRS, setTotalCadastrosHojeRS] = useState(0);
    const [totalCadastrosHojeSC, setTotalCadastrosHojeSC] = useState(0);
    const [totalAguardandoInstalacao, setTotalAguardandoInstalacao] = useState(0);
    const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
    const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
    const [totalAtendimentos, setTotalAtendimentos] = useState(0);
    const [ticketMedio, setTicketMedio] = useState(0);
    const [faturamento, setFaturamento] = useState(0);
    const [ranking, setRanking] = useState([]);
    const [planos, setPlanos] = useState([]);
    const [dadosVendedores, setDadosVendedores] = useState([]);
    const [dadosVendas, setDadosVendas] = useState([]);
    const [rankingvendas, setRankingVendas] = useState([]);
    const [dadosVendasDetalhes, setDadosVendasDetalhes] = useState([]);
    const [bairros, setBairros] = useState([]);
  
    useEffect(() => {
        const fetchDadosRS = async () => {
          try {
            const response = await fetch(`http://38.224.145.3:3008/cadastros-rs?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
            const data = await response.json();
            setTotalCadastrosRS(data.total_cadastros);
          } catch (error) {
            console.error('Erro ao buscar dados RS:', error);
          }
        };
    
        const fetchDadosSC = async () => {
          try {
            const response = await fetch(`http://38.224.145.3:3008/cadastros-sc?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
            const data = await response.json();
            setTotalCadastrosSC(data.total_cadastros);
          } catch (error) {
            console.error('Erro ao buscar dados SC:', error);
          }
        };

        const fetchDadosRSDias = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/cadastros-hoje-rs`);
              const data = await response.json();
              setTotalCadastrosHojeRS(data.total_cadastros);
            } catch (error) {
              console.error('Erro ao buscar dados RS:', error);
            }
          };
      
          const fetchDadosSCDias= async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/cadastros-hoje-sc`);
              const data = await response.json();
              setTotalCadastrosHojeSC(data.total_cadastros);
            } catch (error) {
              console.error('Erro ao buscar dados SC:', error);
            }
          };

          const fetchUpgrade = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/upgrade?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json();
              setTotalAtendimentos(data.total_atendimentos);
            } catch (error) {
              console.error('Erro ao buscar atendimentos de upgrade:', error);
            }
          };

          const fetchAguardandoInstalacao = async () => {
            const response = await fetch(`http://38.224.145.3:3008/aguardandoinstalacao?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
            const data = await response.json();
            setTotalAguardandoInstalacao(data.total_cadastros); // mostra total com status 6
          };

          const fetchTicketMedio = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/ticket-medio?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json();
              setTicketMedio(data.ticket_medio);
            } catch (error) {
              console.error('Erro ao buscar ticket médio:', error);
            }
          };
          
          const fetchFaturamento = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/faturamento-mensal?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json();
              setFaturamento(data.faturamento);
            } catch (error) {
              console.error('Erro ao buscar faturamento mensal:', error);
            }
          };


          const fetchRanking = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/ranking-high-ticket?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json(); 
              setRanking(data.ranking_high_ticket);
            } catch (error) {
              console.error('Erro ao buscar high ticket ranking:', error);
            }
          };


          const fetchPlanos = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/planos-mais-vendidos?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json();
              setPlanos(data.planos_mais_vendidos);
            } catch (error) {
              console.error('Erro ao buscar planos:', error);
            }
          };

          const fetchRankingVendas = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/top-vendas-ranking?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json();
              setRankingVendas(data.ranking_top_vendas);
            } catch (error) {
              console.error('Erro ao buscar ranking:', error);
            }
          };


          const fetchVendas = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/vendas-anuais?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json();
      
              const mesesNomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      
              const dadosFormatados = data.vendas_mensais.map(item => ({
                mes: `${mesesNomes[item.mes - 1]}/${item.ano}`,
                vendas: item.total_vendas
              }));
      
              setDadosVendas(dadosFormatados);
            } catch (error) {
              console.error('Erro ao buscar vendas anuais:', error);
            }
          };


          const fetchVendedores = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/top-vendedores-mensais?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json();
      
              const dadosFormatados = data.vendedores_top_mes.map(item => ({
                ...item,
                vendedor: item.vendedor.length > 15
                  ? item.vendedor.slice(0, 15) + '...'
                  : item.vendedor
              }));
      
              setDadosVendedores(dadosFormatados);
            } catch (error) {
              console.error('Erro ao buscar top vendedores:', error);
            }
          };


          const fetchVendasDetalhes = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/lista-vendas-detalhadas?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json();
              setDadosVendasDetalhes(data.vendas);
            } catch (error) {
              console.error('Erro ao buscar vendas:', error);
            }
          };

          const fetchBairros = async () => {
            try {
              const response = await fetch(`http://38.224.145.3:3008/top-bairros?mes=${mesSelecionado}&ano=${anoSelecionado}&tipo_pessoa=${tipoPessoa}`);
              const data = await response.json();
              setBairros(data.top_bairros);
            } catch (error) {
              console.error('Erro ao buscar top bairros:', error);
            }
          };
      

        // Função que chama ambos os endpoints
        const atualizarTudo = () => {
          fetchDadosRS();
          fetchDadosSC();
          fetchDadosRSDias();
          fetchDadosSCDias();
          fetchUpgrade();
          fetchAguardandoInstalacao();
          fetchTicketMedio();
          fetchFaturamento();
          fetchRanking();
          fetchPlanos();
          fetchRankingVendas()
          fetchVendas();
          fetchVendedores();
          fetchVendasDetalhes();
          fetchBairros();
        };
    
        // Executa imediatamente
        atualizarTudo();
    
        // Reexecuta a cada 1 segundo
        const interval = setInterval(atualizarTudo, 1000);
    
        return () => clearInterval(interval);
      }, [mesSelecionado, anoSelecionado, tipoPessoa]);
      

      const limparFiltros = () => {
  const now = new Date();
  setMesSelecionado(now.getMonth() + 1);
  setAnoSelecionado(now.getFullYear());
  setTipoPessoa('');
};


  return (
    <div style={{backgroundColor: 'white', alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%'}}>

                <div className='head-gerencial-body'>
                    <h1 className='h1-head-gerencial-body'>DASHBOARD GERENCIAL</h1>
                    <h1  className='h2-head-gerencial-body'>Comercial</h1>
                    <img  className='logo-head-gerencial-body' src={logobranca}/>
                </div>

                <div className='div-body-opcao'>
      <div className='div-body-opcao1'>
        <h1 className='h1-body-opcao'>Ano</h1>
        <select
                className='button-body-opcao'
                value={anoSelecionado}
                onChange={(e) => setAnoSelecionado(parseInt(e.target.value))}
                >
                {[2024, 2025, 2026].map((ano) => (
                    <option key={ano} value={ano}>{ano}</option>
                ))}
                </select>
      </div>

      <div className='div-body-opcao1'>
        <h1 className='h1-body-opcao'>Mês</h1>
            <select
                className='button-body-opcao'
                value={mesSelecionado}
                onChange={(e) => setMesSelecionado(parseInt(e.target.value))}
                >
                <option value="">Selecione um mês</option>
                {[
                    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                ].map((nome, index) => (
                    <option key={index + 1} value={index + 1}>{nome}</option>
                ))}
                </select>
      </div>

        <div className='div-body-opcao1'>
        <h1 className='h1-body-opcao'>Tipo</h1>
           <select
              className='button-body-opcao'
              value={tipoPessoa}
              onChange={(e) => setTipoPessoa(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="pj">PJ</option>
              <option value="pf">PF</option>
            </select>

      </div>

<button className="botao-limparfiltros" onClick={limparFiltros}>
  Limpar Filtros
</button>

    </div>


        <div className='row-header-comercial'>
            <div className='header-comercial1'> 

                <div className='card1-header-comercial1'>

                <div className='card1-header-comercial-row'>

                        <div className='minicard1-header-comercial1'>
                            <h1 className='h1-minicard1-header-comercial1'>Vendas Mês SC</h1>
                            <h1  className='h2-minicard1-header-comercial1'>{totalCadastrosSC}</h1>
                        </div>
                        
                        <div  className='minicard1-header-comercial1'>
                            <h1  className='h1-minicard1-header-comercial1'>Vendas Mês RS</h1>
                            <h1   className='h2-minicard1-header-comercial1'>{totalCadastrosRS}</h1>
                        </div>
                        </div>

                        <div className='meta-card1-header-comercial1'>
                            <h1 className='h1-meta-card1-header-comercial1'>Meta Mês</h1>
                            <h1 className='h2-meta-card1-header-comercial1'>1094</h1>
                        </div>

                
                </div>

                <h1  className='card2-header-comercial1'>ABAIXO</h1>

            </div>

            <div className='header-comercial2'>
            <h1 className='h1-header-comercial2'>Vendas dia RS</h1>
            <h1  className='h2-header-comercial2'>{totalCadastrosHojeRS}</h1>
            <h1  className='h1-header-comercial2'>Vendas dia SC</h1>
            <h1  className='h2-header-comercial2'>{totalCadastrosHojeSC}</h1>
            <h1  className='h1-header-comercial2'>Ticket Médio</h1>
            <h1  className='h2-header-comercial2'>R${ticketMedio}</h1>
            </div>


            <div className='header-comercial2'>
            <h1 className='h1-header-comercial2'>Upgrade</h1>
            <h1  className='h2-header-comercial2'>{totalAtendimentos}</h1>
            <h1  className='h1-header-comercial2'>Aguardando Instalação</h1>
            <h1  className='h2-header-comercial2'>{totalAguardandoInstalacao}</h1>
            <h1  className='h1-header-comercial2'>Faturamento Mensal</h1>
            <h1  className='h2-header-comercial2'>R$ {faturamento}</h1>
            </div>
        </div>

        <h1 className='status-dias-dashboard'>Faltam 24 dias para batermos a meta!</h1>


        <div className="div-tabela1-comercial">
  <h1 className="h1-div-tabela1-comercial">
    Top 10 <h1 className="h2-div-tabela1-comercial">High Tickets Mês</h1>
  </h1>

  <div className="scroll-wrapper"> {/* ADICIONADO */}
    <table className="tabela-div-tabela1-comercial">
      <thead>
        <tr>
          <th className="titulo-tabela-div-tabela1-comercial">Vendedor</th>
          <th className="titulo-tabela-div-tabela1-comercial">Plano</th>
          <th className="titulo-tabela-div-tabela1-comercial">Empresa</th>
          <th className="titulo-tabela-div-tabela1-comercial1">Valor (R$)</th>
        </tr>
      </thead>
      <tbody>
        {ranking.map((item, index) => (
          <tr key={index}>
            <td className="subtitulo-tabela-div-tabela1-comercial">{item.vendedor}</td>
            <td className="subtitulo-tabela-div-tabela1-comercial">{item.plano}</td>
            <td className="subtitulo-tabela-div-tabela1-comercial">{item.empresa}</td>
            <td className="subtitulo-tabela-div-tabela1-comercial1">{parseFloat(item.valor).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



    <div className='row-div-tabela1-comercial'>
       
    <div className="div-tabela1-comercial1">    
      <h1 className="h1-div-tabela1-comercial">Top 10<h1  className="h2-div-tabela1-comercial">Planos Vendidos Mês</h1></h1>
      
      <div className="scroll-wrapper">
      <table className="tabela-div-tabela1-comercial">
      <thead>
        <tr>
          <th className="titulo-tabela-div-tabela1-comercial">Plano</th>
          <th className="titulo-tabela-div-tabela1-comercial">Total Vendas</th>
        </tr>
      </thead>
      <tbody>
        {planos.map((item, index) => (
          <tr key={index}>
            <td className="subtitulo-tabela-div-tabela1-comercial">{item.plano}</td>
            <td className="subtitulo-tabela-div-tabela1-comercial">{item.total_vendas}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

    </div>


    <div className="div-tabela1-comercial1">
      <h1 className="h1-div-tabela1-comercial">Top 10
        <h1 className="h2-div-tabela1-comercial">Bairros Vendas Mês</h1>
      </h1>

      <div className="scroll-wrapper">
        <table className="tabela-div-tabela1-comercial">
          <thead>
            <tr>
              <th className="titulo-tabela-div-tabela1-comercial">Bairro</th>
              <th className="titulo-tabela-div-tabela1-comercial">Total Vendas</th>
            </tr>
          </thead>
          <tbody>
            {bairros.map((item, index) => (
              <tr key={index}>
                <td className="subtitulo-tabela-div-tabela1-comercial">{item.bairro}</td>
                <td className="subtitulo-tabela-div-tabela1-comercial">{item.total_vendas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

        </div>


        <div className="div-tabela1-comercial">
      <h1 className="h1-div-tabela1-comercial">
        <h1 className="h2-div-tabela1-comercial">Vendas Anual</h1>
      </h1>

      <ResponsiveContainer width="90%" height={270}>
        <BarChart data={dadosVendas}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="mes" tick={{ fill: '#fff' }} fontWeight='bold' />
          <YAxis tick={{ fill: '#fff' }} />
          <Tooltip />

          <Bar dataKey="vendas" stackId="a" fill="#F45742">
            <LabelList dataKey="vendas" position="inside" fill="#fff" fontWeight='bold' />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>


    <div className="div-tabela1-comercial">
  <h1 className="h1-div-tabela1-comercial">
    <h1 className="h2-div-tabela1-comercial">Top Vendedores Mensais</h1>
  </h1>

  <div className="scroll-wrapper"> {/* Scroll ativado aqui */}
    <ResponsiveContainer width='100%' height={900}> {/* Largura fixa para rolar */}
      <BarChart
        data={dadosVendedores}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tick={{ fill: '#333' }} />
        <YAxis type="category" dataKey="vendedor" tick={{ fill: 'white', width: 300, fontSize: 14, fontFamily: 'Arial' }} />
        <Tooltip />
        <Bar dataKey="total_vendas" fill="#F45742" >
          <LabelList dataKey="total_vendas" position="insideRight" style={{ width: 100 }} fill="#fff" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>



    <div className="div-tabela1-comercial2">
      <h1 className="h1-div-tabela1-comercial2">Vendas por dia</h1>

      <div className="scroll-wrapper">
      <table className="tabela-div-tabela1-comercial">
        <thead>
          <tr>
            <th className="titulo-tabela-div-tabela1-comercial">Nome</th>
            <th className="titulo-tabela-div-tabela1-comercial">Descrição</th>
            <th className="titulo-tabela-div-tabela1-comercial">Vendedor</th>
               <th className="titulo-tabela-div-tabela1-comercial">Tipo</th>
            <th className="titulo-tabela-div-tabela1-comercial">Cidade</th>
            <th className="titulo-tabela-div-tabela1-comercial">Bairro</th>
            <th className="titulo-tabela-div-tabela1-comercial">Valor (R$)</th>
          </tr>
        </thead>
        <tbody>
          {dadosVendasDetalhes.map((item, index) => (
            <tr key={index}>
              <td className="subtitulo-tabela-div-tabela1-comercial">{item.empresa}</td>
              <td className="subtitulo-tabela-div-tabela1-comercial">{item.nome_plano}</td>
              <td className="subtitulo-tabela-div-tabela1-comercial">{item.vendedor}</td>
               <td className="subtitulo-tabela-div-tabela1-comercial">{item.tipo_pessoa}</td>
              <td className="subtitulo-tabela-div-tabela1-comercial">{item.cidade}</td>
              <td className="subtitulo-tabela-div-tabela1-comercial">{item.bairro}</td>
              <td className="subtitulo-tabela-div-tabela1-comercial">{item.valor_venda.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>


    </div>
  )
}

export default DashboardComercialgerencial