import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { useLocation } from 'react-router-dom';


//CSS
import '../CSS/Dashboard.css'

//Images
import cash from '../Images/dolar.png'
import group from '../Images/group.png'
import logobranca from '../Images/logobrnaca.png'




export default function DashboardCancelamentosClone() {
    const [totalCanceladosMes, setTotalCanceladosMes] = useState(null);
    const [totalCanceladosHoje, setTotalCanceladosHoje] = useState(null);
    const [totalClientesAtivos, setTotalClientesAtivos] = useState(null);
      const [percentualPedido, setPercentualPedido] = useState(null);
      const [percentualAutomatico, setPercentualAutomatico] = useState(null);
      const [chunMensal, setChurnMensal] = useState("");
      const [chunDiario, setChurnDiario] = useState("");
      const [erro, setErro] = useState(null);
      const [cancelamentosPorCidade, setCancelamentosPorCidade] = useState([]);
      const [churnUltimosMeses, setChurnUltimosMeses] = useState([]);
      const location = useLocation();
      const params = new URLSearchParams(location.search);

      const mes = parseInt(params.get("mes"));
      const ano = parseInt(params.get("ano"));
      console.log(mes, ano)
     

        // Mapeamento de números de mês para nomes
    const mesParaNome = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Função para converter número do mês para nome
    const obterNomeDoMes = (mes) => {
        return mesParaNome[mes - 1]; // Meses no JavaScript começam do 0, então subtraímos 1
    };

    const fetchChurnUltimosMeses = async () => {
        try {
            const response = await fetch('http://38.224.145.3:3001/churn-ultimos-meses');
            
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados de churn dos últimos meses');
            }

            const data = await response.json();

            // Ordenando os dados pela propriedade "mes"
            const dadosOrdenados = data.churnUltimosMeses.sort((a, b) => a.mes - b.mes);

            // Alterando os meses para nomes
            const dadosComMesesNomeados = dadosOrdenados.map((item) => ({
                ...item,
                mes: obterNomeDoMes(item.mes) // Converte o número do mês para o nome
            }));

            setChurnUltimosMeses(dadosComMesesNomeados);
        } catch (error) {
            setErro(error.message);
        }
    };


  
  
      // Função para buscar os dados da API
      const fetchCancelamentoPorcentagem = async () => {
          try {
              const response = await fetch('http://38.224.145.3:3001/cancelamento_porcentagem');
              
              if (!response.ok) {
                  throw new Error('Erro ao buscar dados');
              }
  
              const data = await response.json();
              setPercentualPedido(data.percentual_pedido);
              setPercentualAutomatico(data.percentual_automatico);
          } catch (error) {
              setErro(error.message);
          }
      };
  
  
  
      useEffect(() => {

        const fetchCanceladosHoje = async () => {
          try {
            const response = await fetch('http://38.224.145.3:3001/total-clientes-cancelados-hoje');
            const data = await response.json();
            setTotalCanceladosHoje(data.total_cancelados_hoje);
          } catch (error) {
            console.error('Erro ao buscar os cancelamentos do dia:', error);
          }
        };
      
        const fetchClientesAtivos = async () => {
          try {
            const response = await fetch('http://38.224.145.3:3001/total-clientes-ativos');
            const data = await response.json();
            setTotalClientesAtivos(data.total_clientes_ativos);
          } catch (error) {
            console.error('Erro ao buscar os clientes ativos:', error);
          }
        };
      
        const fetchChurnData = async () => {
          try {
            let urlMensal = `http://38.224.145.3:3007/churn-mensal`;
            if (mes && ano) {
              urlMensal += `?mes=${mes}&ano=${ano}`;
            }
      
            const responseMensal = await fetch(urlMensal);
            const dataMensal = await responseMensal.json();
            setChurnMensal(dataMensal.churn_mensal);
            setTotalCanceladosMes(dataMensal.total_cancelamentos_mes);
      
            const responseDiario = await fetch('http://38.224.145.3:3001/churn-diario');
            const dataDiario = await responseDiario.json();
           
            setChurnDiario(dataDiario.churn_diario);
          } catch (error) {
            console.error('Erro ao buscar os dados de churn:', error);
          }
        };
      
        const fetchCancelamentosPorCidade = async (mes, ano) => {
          try {
            let url = 'http://38.224.145.3:3007/churn-cidade-reduzido';
            if (mes && ano) {
              url += `?mes=${mes}&ano=${ano}`;
            }
      
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Erro ao buscar cancelamentos por cidade');
            }
      
            const data = await response.json();
            setCancelamentosPorCidade(data.dados || []);
      
          } catch (error) {
            console.error('Erro ao buscar cancelamentos por cidade:', error);
          }
        };
      
        // Chamadas iniciais
        fetchCanceladosHoje();
        fetchClientesAtivos();
        fetchChurnData();
        fetchCancelamentosPorCidade(mes, ano);  // <-- AQUI: passe mes e ano
        fetchCancelamentoPorcentagem();
        fetchChurnUltimosMeses();
      
        // Atualizações periódicas a cada 30 segundos
        const intervalId = setInterval(() => {
          fetchCancelamentosPorCidade(mes, ano); // <-- AQUI TAMBÉM: mes e ano!
          fetchChurnData();
          fetchCanceladosHoje();
          fetchClientesAtivos();
          fetchCancelamentoPorcentagem();
          fetchChurnUltimosMeses();
        }, 30000);
      
        return () => clearInterval(intervalId);
      }, [mes, ano]); // <-- AQUI: Dependências adicionadas      
    
  

  return (
    <div className='body-principal'>

    <div className='row-body-principal'>
    <div  className='div-segunda-dados-tabelas'>
        <div className='div-numeros-churn'>

        <div className='row-div-numeros-churn1'>
      {totalCanceladosMes !== null ? (
        <h1 className='h1-numeros-churn'>{totalCanceladosMes}</h1>
      ) : (
        <p>0</p>
      )}

      <h1 className='h2-mes'>Mês</h1>

      <h1  className='h1-numeros-churn'>{chunMensal}%</h1>
      </div>
      

      <div className='row-div-numeros-churn'>
      {totalCanceladosHoje !== null ? (
        <h1 className='h1-numeros-churn'>{totalCanceladosHoje}</h1>
      ) : (
        <p>0</p>
      )}

      <h1 className='h2-mes'>Dia</h1>

      <h1  className='h1-numeros-churn'>{chunDiario}%</h1>
      </div>

      </div>
      <div className='div-numeros-churn2'>
        <h1 className='h2-numeros-churn'>376</h1>
        <h1 className='h2-mes'>Limite</h1>
        <h1 className='h2-numeros-churn'>1.50%</h1>

      </div>

      <div className='div-numero-solicitacao'>
    <div className='div-pedidos-solicitacao'>
        <h1 className='h1-pedidos-solicitacao'><img style={{width: 60}} src={cash}/> {Math.round(percentualAutomatico)} %</h1>
        <h1 className='h2-pedidos-solicitacao'>CANCELAMENTO AUTOMÁTICO</h1>
    </div>

    <div className='div-pedidos-solicitacao'>
        <h1 className='h1-pedidos-solicitacao'><img style={{width: 60}} src={group}/> {Math.round(percentualPedido)} %</h1>
        <h1 className='h2-pedidos-solicitacao'>SOLICITAÇÃO DO CLIENTE</h1>
    </div>
</div>

      <div className='div-texto-status'>
        <h1 className='h1-texto-status'>Projeção</h1>
        <h1 className='h2-texto-status'>ABAIXO</h1>
      </div>

      </div>


 
      <div className='div-segunda-dados-tabelas'>

      <div className='tabela-churn-cidade'>
  <h1 className='h1-tabela-churn-cidade'>
    Cancelamentos por Cidade {mes && ano ? `(${obterNomeDoMes(mes)}/${ano})` : ''}
  </h1>
  <table>
    <thead>
      <tr>
        <th className='titulo-tabela-churn-cidade'>Cidade</th>
        <th className='titulo-tabela-churn-cidade'>Cancelamentos</th>
        <th className='titulo-tabela-churn-cidade'>Churn (%)</th>
      </tr>
    </thead>
    <tbody>
      {cancelamentosPorCidade.length > 0 ? (
        cancelamentosPorCidade.map((cidade, index) => (
          <tr key={index}>
            <th className='titulo-tabela-churn-cidade'>{cidade.cidade_nome}</th>
            <th className='titulo-tabela-churn-cidade'>{cidade.total_cancelamentos}</th>
            <th className='titulo-tabela-churn-cidade'>
              {cidade.churn_rate ? `${cidade.churn_rate}%` : 'N/A'}
            </th>
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


    <div className='grafico'>
                <h1 className='h1-tabela-agenda-dia'>Churn dos Últimos Meses</h1>

                {churnUltimosMeses.length > 0 ? (
                    <ResponsiveContainer width="100%" height={270}>
                        <BarChart data={churnUltimosMeses}>
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="mes" tick={{ fill: '#fff' }} fontWeight='bold' />
                            <YAxis  tick={{ fill: '#fff' }} />
                            <Tooltip  />
                           
                            <Bar dataKey="churn" stackId="a" fill="#F45742">
                                {/* Exibindo os valores dentro das barras */}
                                <LabelList dataKey="churn" position="inside" fill="#fff" fontWeight='bold'  formatter={(value) => value.toFixed(2)}  />
                            </Bar>
                          
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p>Carregando dados...</p>
                )}
            </div>

</div>

</div>

        <div className='div-titulo-dash'>
            <h1 className='h2-titulo-dash'>CHURN TV</h1>
            <h1 className='h1-titulo-dash'>CHURN TV</h1>
            <img src={logobranca}/>
        </div>

    </div>
  );
}
