import React, { useEffect, useState } from 'react'

import '../CSS/DashboardOperacionalGerencial.css'
import logobranca from '../Images/logobrnaca.png'

function DashboardOperacionalGerencial() {
          const [totalManutencaoMes, setTotalManutencaoMes] = useState(0);
      const [totalInstalacaoMes, setTotalInstalacaoMes] = useState(0);
            const [totalTrocaEndMes, setTotalTrocaEndMes] = useState(0);
            const [totalOutrosMes, setTotalOutrosMes]  = useState(0);
               const [totalResumoMes, setTotalResumoMes]  = useState(0);
               const [totalInstalacaoHoje, setTotalInstalacaoHoje] = useState(0);
const [totalManutencaoHoje, setTotalManutencaoHoje] = useState(0);
const [totalTrocaEndHoje, setTotalTrocaEndHoje] = useState(0);
const [totalOutrosHoje, setTotalOutrosHoje] = useState(0);
const [totalResumoHoje, setTotalResumoHoje] = useState(0);
 const [dadosTabelaCidade, setDadosTabelaCidade] = useState([]);
 const [dadosbairros, setDadosBairros] = useState([]);
  const [dados, setDados] = useState([]);
    const [dados2, setDados2] = useState([]);
            const [dados3, setDados3] = useState([]);
                const [dados4, setDados4] = useState([]);
                    const [dados5, setDados5] = useState([]);
                            const [dados6, setDados6] = useState([]);
     const [totais, setTotais] = useState({
    total_instalacoes: 0,
    total_trocas: 0,
    total_manutencoes: 0,
    total_outros: 0,
    total_geral: 0,
  });


    const [semAgenda, setSemAgenda] = useState({
    total_instalacoes: 0,
    total_trocas: 0,
    total_manutencoes: 0,
    total_outros: 0,
    total_geral: 0,
  });


    const [sla, setSla] = useState({
    instalacoes: '-',
    trocas_endereco: '-',
    manutencoes: '-',
    outros: '-'
  });

  const [dadosClientesCompleto, setDadosClientesCompleto] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resposta = await fetch("http://38.224.145.3:3010/ordens-servico-categorias-completo-mes");
      const json = await resposta.json();
      setDadosClientesCompleto(json.ordens_servico);
    }

    fetchData();
  }, []);



    useEffect(() => {
    fetch('http://38.224.145.3:3010/sla-os-categorias-30-dias')
      .then(response => response.json())
      .then(data => {
        if (data.sla_medio_dias) {
          setSla(data.sla_medio_dias);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar SLA médio:', error);
      });
  }, []);



    useEffect(() => {
    fetch('http://38.224.145.3:3010/ordens-servico-sem-agendamento')
      .then(res => res.json())
      .then(data => {
        setSemAgenda(data);
      })
      .catch(err => {
        console.error('Erro ao buscar ordens sem agendamento:', err);
      });
  }, []);


   useEffect(() => {
  fetch('http://38.224.145.3:3010/ordens-servico-pendente-total-30-dias')
    .then(res => res.json())
    .then(data => {
      if (data && data.totais) {
        setTotais(data.totais); // Seta diretamente o objeto com os totais
      }
    })
    .catch(error => {
      console.error('Erro ao buscar ordens vencidas:', error);
    });
}, []);


useEffect(() => {
    const fetchDadosAmanha1 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha1');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


      const fetchDadosAmanha2 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha2');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados2(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };

      const fetchDadosAmanha3 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha3');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados3(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


         const fetchDadosAmanha4 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha4');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados4(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


    const fetchDadosAmanha5 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha5');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados5(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


       const fetchDadosAmanha6 = async () => {
      try {
        const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-amanha6');
        if (!res.ok) throw new Error('Erro ao buscar dados de ordens de serviço de amanhã');

        const data = await res.json();
        setDados6(data);
      } catch (error) {
        console.error('Erro ao carregar dados D+1:', error);
      }
    };


    fetchDadosAmanha1();
    fetchDadosAmanha2();
    fetchDadosAmanha3();
    fetchDadosAmanha4();
    fetchDadosAmanha5();   
    fetchDadosAmanha6(); 


  }, []);

 useEffect(() => {
    fetch('http://38.224.145.3:3010/ranking-os-cidade-mes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        return response.json();
      })
      .then(data => {
        const dadosFormatados = data.cidades.map(item => ({
          cidade: item.cidade,
          instalacoes: item.total_instalacoes,
          manutencao: item.total_manutencoes,
          trocaEndereco: item.total_trocas,
          outros: item.total_outros
        }));
        setDadosTabelaCidade(dadosFormatados);

      })
      .catch(error => {

      });
  }, []);

  

useEffect(() => {
  const fetchInstalacoes = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-instalacoes-do-mes');
    if (!res.ok) throw new Error('Erro ao buscar instalações');
    const data = await res.json();
    setTotalInstalacaoMes(data.total_ordens_pendentes_aguardando_instalacao || 0);
  };

  const fetchManutencoes = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-manutencao-do-mes');
    if (!res.ok) throw new Error('Erro ao buscar manutenções');
    const data = await res.json();
    setTotalManutencaoMes(data.total_ordens_pendentes_aguardando_manutencao || 0);
  };

  const fetchTrocas = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-trocas-do-mes');
    if (!res.ok) throw new Error('Erro ao buscar trocas');
    const data = await res.json();
    setTotalTrocaEndMes(data.total_ordens_pendentes_aguardando_troca_endereco || 0);
  };

  const fetchOutros = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-outros-do-mes');
    if (!res.ok) throw new Error('Erro ao buscar outros motivos');
    const data = await res.json();
    setTotalOutrosMes(data.total_ordens_pendentes_aguardando_outros || 0);
  };

  const fetchResumo = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-do-mes');
    if (!res.ok) throw new Error('Erro ao buscar resumo mensal');
    const data = await res.json();
    setTotalResumoMes(data.total_geral || 0);
  };


const fetchInstalacoesHoje = async () => {
  const res = await fetch('http://38.224.145.3:3010/ordens-servico-instalacoes-hoje');
  if (!res.ok) throw new Error('Erro ao buscar instalações de hoje');
  const data = await res.json();

  // Correção aqui:
  const total = data.total_ordens_instalacao_hoje || 0;
  setTotalInstalacaoHoje(Number(total));
};

  const fetchManutencoesHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-manutencao-hoje');
    if (!res.ok) throw new Error('Erro ao buscar manutenções de hoje');
    const data = await res.json();
    setTotalManutencaoHoje(data.total_ordens_manutencao_hoje || 0);
  };

  const fetchTrocasHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-trocas-hoje');
    if (!res.ok) throw new Error('Erro ao buscar trocas de endereço de hoje');
    const data = await res.json();
    setTotalTrocaEndHoje(data.total_ordens_troca_hoje || 0);
  };

  const fetchOutrosHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-outros-hoje');
    if (!res.ok) throw new Error('Erro ao buscar ordens de outros motivos de hoje');
    const data = await res.json();
    setTotalOutrosHoje(data.total_ordens_outros_hoje || 0);
  };

  const fetchResumoHoje = async () => {
  const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-hoje');
  if (!res.ok) throw new Error('Erro ao buscar resumo de hoje');
  const data = await res.json();
  setTotalResumoHoje(data.total_geral || 0);
};



  const fetchDadosBairros = async () => {
  try {
    const res = await fetch('http://38.224.145.3:3010/ranking-os-bairro-mes');
    if (!res.ok) throw new Error('Erro ao buscar dados por bairro');
    
    const data = await res.json();
    // Mapeia para manter compatibilidade com nomes de chave utilizados na tabela
    const transformado = data.bairros.map(bairro => ({
      bairros: bairro.bairro || 'Não informado',
      instalacoes: bairro.total_instalacoes || 0,
      manutencao: bairro.total_manutencoes || 0,
      trocaEndereco: bairro.total_trocas || 0,
      outros: bairro.total_outros || 0
    }));
    setDadosBairros(transformado);
  } catch (error) {
    console.error('Erro ao carregar bairros:', error);
  }
};


  const buscarTodos = async () => {
    try {
      await Promise.all([
        fetchInstalacoes(),
        fetchManutencoes(),
        fetchTrocas(),
        fetchOutros(),
        fetchResumo(),
         fetchInstalacoesHoje(),
        fetchManutencoesHoje(),
        fetchTrocasHoje(),
        fetchOutrosHoje(),
        fetchResumoHoje(),
        fetchDadosBairros()
      ]);
    } catch (error) {
      console.error('Erro ao buscar dados mensais:', error);
    }
  };

  buscarTodos();
}, []);





  return (
    <div>

              <div className='head-gerencial-body-geral'>

                <div className='div-logo-operacional'>
                           <img  className='logo-head-gerencial-body-operacional' src={logobranca}/>

                    </div>

                    <h1  className='h2-head-gerencial-body-operacional'><h1  className='amarelo-h2-head-gerencial-body'>C</h1>ENTRO DE <h1 className='amarelo-h2-head-gerencial-body'> C</h1>ONTROLE DE <h1 className='amarelo-h2-head-gerencial-body'> O</h1>PERAÇÃO</h1>

                      <h1  className='h2-head-gerencial-body-invisivel'>Geral</h1>
                 
                </div>

                <div style={{width: '100%', backgroundColor: 'black', height: 40}}>
                    .
                </div>

            <div className='row-div-gerencial-geral'>

                    <div className='div-card1-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>BACKLOG TOTAL</h1>
                        <h1  className='h2-card1-gerencial-geral'>{totalResumoMes}</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>{totalInstalacaoMes}</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>{totalTrocaEndMes}</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>{totalManutencaoMes}</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>{totalOutrosMes}</h1>
                                 </div>

                             
      
                        </div>
                    </div>

                                    <div className='div-card1-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>AGENDA DIA</h1>
                        <h1  className='h2-card1-gerencial-geral'>{totalResumoHoje}</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>{totalInstalacaoHoje}</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>{totalTrocaEndHoje}</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>{totalManutencaoHoje}</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>{totalOutrosHoje}</h1>
                                 </div>

                             
      
                        </div>
                    </div>


               <div className="div-card2-gerencial-geral">
      <h2 className="h1-card1-gerencial-geral">BACKLOG POR CIDADE</h2>
      <table style={{marginTop: 20, width: '95%'}}>
        <thead style={{width: '100%'}}>
          <tr className="row-card2-gerencial-geral">
            <th className="h5-card1-gerencial-geral">CIDADE</th>
            <th className="h6-card1-gerencial-geral">INSTALAÇÕES</th>
            <th className="h6-card1-gerencial-geral">MANUT.</th>
            <th className="h6-card1-gerencial-geral">TROCA END.</th>
            <th className="h6-card1-gerencial-geral">OUTROS</th>
          </tr>
        </thead>
        <tbody>
          {dadosTabelaCidade.map((item, index) => (
            <tr key={item.cidade} style={{
              flexDirection: 'row',
              display: 'flex',
              height: 30,
              borderTop: '1px solid white',
              borderBottom: '1px solid white'
            }} className={index % 2 === 1 ? 'bg-gray-800' : 'bg-gray-600'}>
              <td className="h7-card1-gerencial-geral">{item.cidade}</td>
              <td className="h8-card1-gerencial-geral">{item.instalacoes}</td>
              <td className="h8-card1-gerencial-geral">{item.manutencao}</td>
              <td className="h8-card1-gerencial-geral">{item.trocaEndereco}</td>
              <td className="h8-card1-gerencial-geral">{item.outros}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


<div className="div-card2-gerencial-geral">


  {/* Div com rolagem vertical */}
  <div style={{ maxHeight: '400px', overflowY: 'auto', width: '95%', height: 260 }}>
    <table style={{ marginTop: 20, width: '95%' }}>
      <thead style={{ width: '100%' }}>
        <tr className="row-card2-gerencial-geral">
          <th className="h5-card1-gerencial-geral">BAIRRO</th>
          <th className="h6-card1-gerencial-geral">INSTALAÇÕES</th>
          <th className="h6-card1-gerencial-geral">MANUT.</th>
          <th className="h6-card1-gerencial-geral">TROCA END.</th>
          <th className="h6-card1-gerencial-geral">OUTROS</th>
        </tr>
      </thead>
      <tbody>
        {dadosbairros.map((item, index) => (
          <tr
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderTop: '1px solid white',
              borderBottom: '1px solid white',
              height: 30
            }}
            className={index % 2 === 1 ? 'bg-gray-800' : 'bg-gray-600'}
          >
            <td className="h7-card1-gerencial-geral" >{item.bairros}</td>
            <td className="h8-card1-gerencial-geral" >{item.instalacoes}</td>
            <td className="h8-card1-gerencial-geral" >{item.manutencao}</td>
            <td className="h8-card1-gerencial-geral" >{item.trocaEndereco}</td>
            <td className="h8-card1-gerencial-geral" >{item.outros}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



           

            </div>    


            <div style={{ width: '100%', marginTop: 20, display: 'flex', justifyContent: 'space-around'}}>


                    <div className='div-card4-gerencial-geral'>
      <h1 className='h1-card1-gerencial-geral'>D + 1</h1>
      <h1 className='h2-card1-gerencial-geral'>{dados.total_geral}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_instalacoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_trocas}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_manutencoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados.total_outros}</h1>
        </div>
      </div>
    </div>


                        <div className='div-card5-gerencial-geral'>
      <h1 className='h1-card1-gerencial-geral'>D + 2</h1>
      <h1 className='h2-card1-gerencial-geral'>{dados2.total_geral}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados2.total_instalacoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados2.total_trocas}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados2.total_manutencoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados2.total_outros}</h1>
        </div>
      </div>
    </div>



                                      <div className='div-card6-gerencial-geral'>
      <h1 className='h1-card1-gerencial-geral'>D + 3</h1>
      <h1 className='h2-card1-gerencial-geral'>{dados3.total_geral}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados3.total_instalacoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados3.total_trocas}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados3.total_manutencoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados3.total_outros}</h1>
        </div>
      </div>
    </div>


                                      <div className='div-card7-gerencial-geral'>
      <h1 className='h1-card1-gerencial-geral'>D + 4</h1>
      <h1 className='h2-card1-gerencial-geral'>{dados4.total_geral}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados4.total_instalacoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados4.total_trocas}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados4.total_manutencoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados4.total_outros}</h1>
        </div>
      </div>
    </div>



                            <div className='div-card8-gerencial-geral'>
      <h1 className='h1-card1-gerencial-geral'>D + 5</h1>
      <h1 className='h2-card1-gerencial-geral'>{dados5.total_geral}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados5.total_instalacoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados5.total_trocas}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados5.total_manutencoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados5.total_outros}</h1>
        </div>
      </div>
    </div>

                                       <div className='div-card9-gerencial-geral'>
      <h1 className='h1-card1-gerencial-geral'>D + 6</h1>
      <h1 className='h2-card1-gerencial-geral'>{dados6.total_geral}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados6.total_instalacoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados6.total_trocas}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados6.total_manutencoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
          <h1 className='h4-card1-gerencial-geral'>{dados6.total_outros}</h1>
        </div>
      </div>
    </div>



                    <div className='div-card10-gerencial-geral'>
      <h1 className='h1-card1-gerencial-geral'>SEM AGENDA</h1>
      <h1 className='h2-card1-gerencial-geral'>{semAgenda.total_geral}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{semAgenda.total_instalacoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
          <h1 className='h4-card1-gerencial-geral'>{semAgenda.total_trocas}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{semAgenda.total_manutencoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
          <h1 className='h4-card1-gerencial-geral'>{semAgenda.total_outros}</h1>
        </div>
      </div>
    </div>


                       <div className='div-card3-gerencial-geral'>
      <h1 className='h1-card1-gerencial-geral'>VENCIDOS</h1>
      <h1 className='h2-card1-gerencial-geral'>{totais.todos}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{totais.instalacoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
          <h1 className='h4-card1-gerencial-geral'>{totais.trocas_endereco}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{totais.manutencoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
          <h1 className='h4-card1-gerencial-geral'>{totais.outros}</h1>
        </div>
      </div>
    </div>

            </div>

      <div style={{ width: '99%', justifyItems: 'start', display: 'flex', justifySelf: 'center', marginTop: 20 }}>
      <div className="div-slas">
        <div className="sla-titulo">
          <div className="sla-titulo-texto">SLA MÉDIO</div>
          <div className="sla-titulo-subtexto">DIAS</div>
        </div>

        <div className="sla-categorias">
          <div className="sla-categoria">INSTALAÇÕES</div>
          <div className="sla-categoria">TROCAS END.</div>
          <div className="sla-categoria">MANUTENÇÕES</div>
          <div className="sla-categoria">OUTROS</div>
        </div>

        <div className="sla-valores">
          <div className="sla-valor">{sla.instalacoes}</div>
          <div className="sla-valor">{sla.trocas_endereco}</div>
          <div className="sla-valor">{sla.manutencoes}</div>
          <div className="sla-valor">{sla.outros}</div>
        </div>
      </div>
    </div>

            <div style={{width: '100%', marginTop: 20, display: 'flex', justifyContent:'flex-end', alignSelf: 'center'}}>
              <button style={{ width: 150, marginRight: 10, backgroundColor: '#0B8634', borderRadius: 5, color: 'white', fontWeight: 'bold', border: 'transparent', height: 35, cursor: 'pointer'}}>EXPORTAR .CSV</button>
            </div>

        <div className="div-tabela-scroll">
              <table className="tabela-clientes">
                <thead>
                  <tr>
                    <th>ID OS</th>
                    <th>ID CLIENTE</th>
                    <th>NOME DO CLIENTE</th>
                    <th>SERVIÇO</th>
                    <th>VALOR PLANO</th>
                    <th>CPF / CNPJ</th>
                    <th>BAIRRO</th>
                    <th>CIDADE</th>
                    <th>DATA CADASTRO</th>
                    <th>DATA PEDIDO PROVISIONADO</th>
                    <th>HORA PEDIDO PROVISIONADO</th>
                    <th>JOTAS</th>
                    <th>MAC/ONU</th>
                    <th>TIPO CDO</th>
                    <th>STATUS</th>
                    <th>LOCALIZAÇÃO INSTALADOR</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosClientesCompleto.map((cliente, index) => (
                    <tr key={index}>
                      <td>{cliente.id_ordem_servico}</td>
                      <td>{cliente.id_cliente_servico}</td>
                      <td>{cliente.cliente_nome}</td>
                      <td>{cliente.descricao_servico}</td>
                      <td>{cliente.valor}</td>
                      <td>{cliente.tipo_pessoa === "pf" ? "CPF" : "CNPJ"}</td>
                      <td>{cliente.bairro_cliente}</td>
                      <td>{cliente.cidade_nome}</td>
                      <td>{new Date(cliente.data_cadastro).toLocaleDateString()}</td>
                      <td>{new Date(cliente.data_inicio_programado).toLocaleDateString()}</td>
                      <td>{new Date(cliente.data_inicio_programado).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td>{cliente.jotas || "-"}</td>
                      <td>{cliente.macOnu || "-"}</td>
                      <td>{cliente.tipoCdo || "-"}</td>
                      <td>{cliente.status}</td>
                      <td>{cliente.instalador || "-"}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
  



    </div>
  )
}

export default DashboardOperacionalGerencial