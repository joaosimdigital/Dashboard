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
    fetch('http://38.224.145.3:3010/ordens-servico-vencidas-mes')
      .then(res => res.json())
      .then(data => {
        setTotais(data);
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
    fetch('http://38.224.145.3:3010/ordens-servico-total-mes-por-cidade')
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
    setTotalInstalacaoMes(data.ordens_servico_mes[0]?.total_ordens_instalacao || 0);
  };

  const fetchManutencoes = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-manutencao-do-mes');
    if (!res.ok) throw new Error('Erro ao buscar manutenções');
    const data = await res.json();
    setTotalManutencaoMes(data.ordens_servico_mes[0]?.total_ordens_manutencao || 0);
  };

  const fetchTrocas = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-trocas-do-mes');
    if (!res.ok) throw new Error('Erro ao buscar trocas');
    const data = await res.json();
    setTotalTrocaEndMes(data.ordens_servico_mes[0]?.total_ordens_troca_endereco || 0);
  };

  const fetchOutros = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-outros-do-mes');
    if (!res.ok) throw new Error('Erro ao buscar outros motivos');
    const data = await res.json();
    setTotalOutrosMes(data.ordens_servico_mes[0]?.total_ordens_outros || 0);
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
  const total = data.ordens_servico_hoje?.[0]?.total_ordens_instalacao || 0;
  setTotalInstalacaoHoje(Number(total));
};

  const fetchManutencoesHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-manutencao-hoje');
    if (!res.ok) throw new Error('Erro ao buscar manutenções de hoje');
    const data = await res.json();
    setTotalManutencaoHoje(data.ordens_servico_hoje?.[0]?.total_ordens_manutencao || 0);
  };

  const fetchTrocasHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-trocas-hoje');
    if (!res.ok) throw new Error('Erro ao buscar trocas de endereço de hoje');
    const data = await res.json();
    setTotalTrocaEndHoje(data.ordens_servico_hoje?.[0]?.total_ordens_troca || 0);
  };

  const fetchOutrosHoje = async () => {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-outros-hoje');
    if (!res.ok) throw new Error('Erro ao buscar ordens de outros motivos de hoje');
    const data = await res.json();
    setTotalOutrosHoje(data.ordens_servico_hoje?.[0]?.total_ordens_outros || 0);
  };

  const fetchResumoHoje = async () => {
  const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-hoje');
  if (!res.ok) throw new Error('Erro ao buscar resumo de hoje');
  const data = await res.json();
  setTotalResumoHoje(data.total_geral || 0);
};



  const fetchDadosBairros = async () => {
  try {
    const res = await fetch('http://38.224.145.3:3010/ordens-servico-total-mes-por-bairro');
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




const dadosClientes = [
  {
    idOs: '8595',
    idCliente: '44444',
    nome: 'FULANO DA SILVA TRAB',
    servico: 'PLANO OFERTA 300MB DIGITAL',
    valorPlano: '89.90',
    cpfCnpj: '01234567890',
    bairro: 'MULTIRES',
    cidade: 'FLORIANÓPOLIS - SC',
    dataCadastro: '01/05/2025',
    dataProvisionado: '01/05/2025',
    horaProvisionado: '09:00',
    jotas: 'agente1@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:01',
    tipoCdo: '254 ACESSO (ONU SMALL OPEN)',
    status: 'EM INSTALAÇÃO / MODEM',
    instalador: 'ROGER FRANCISCO GALVINO'
  },
  {
    idOs: '8596',
    idCliente: '44445',
    nome: 'MARIA DE SOUZA',
    servico: 'PLANO OFERTA 500MB FIBRA',
    valorPlano: '109.90',
    cpfCnpj: '12345678900',
    bairro: 'CENTRO',
    cidade: 'JOINVILLE - SC',
    dataCadastro: '02/05/2025',
    dataProvisionado: '02/05/2025',
    horaProvisionado: '10:00',
    jotas: 'agente2@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:02',
    tipoCdo: '256 ACESSO (ONU GPON)',
    status: 'AGUARDANDO ATIVAÇÃO',
    instalador: 'JOSÉ ANTONIO MORAES'
  },
  {
    idOs: '8597',
    idCliente: '44446',
    nome: 'JOÃO PEDRO ALMEIDA',
    servico: 'PLANO OFERTA 600MB GAMER',
    valorPlano: '129.90',
    cpfCnpj: '45678912300',
    bairro: 'TRINDADE',
    cidade: 'FLORIANÓPOLIS - SC',
    dataCadastro: '03/05/2025',
    dataProvisionado: '03/05/2025',
    horaProvisionado: '11:00',
    jotas: 'agente3@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:03',
    tipoCdo: '300 ACESSO (ONU PREMIUM)',
    status: 'EM TESTE',
    instalador: 'ANA PAULA RIBEIRO'
  },
  {
    idOs: '8598',
    idCliente: '44447',
    nome: 'LUCAS FERREIRA',
    servico: 'PLANO BÁSICO 100MB',
    valorPlano: '69.90',
    cpfCnpj: '98765432100',
    bairro: 'ESTREITO',
    cidade: 'FLORIANÓPOLIS - SC',
    dataCadastro: '04/05/2025',
    dataProvisionado: '04/05/2025',
    horaProvisionado: '12:00',
    jotas: 'agente4@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:04',
    tipoCdo: 'ONU BASIC',
    status: 'CANCELADO',
    instalador: 'MARCOS VINÍCIUS'
  },
  {
    idOs: '8599',
    idCliente: '44448',
    nome: 'FERNANDA LIMA',
    servico: 'PLANO OFERTA 300MB DIGITAL',
    valorPlano: '89.90',
    cpfCnpj: '32165498700',
    bairro: 'SACO DOS LIMÕES',
    cidade: 'FLORIANÓPOLIS - SC',
    dataCadastro: '05/05/2025',
    dataProvisionado: '05/05/2025',
    horaProvisionado: '13:00',
    jotas: 'agente5@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:05',
    tipoCdo: '254 ACESSO (ONU SMALL OPEN)',
    status: 'FINALIZADO',
    instalador: 'RAFAEL CASTRO'
  },
  {
    idOs: '8600',
    idCliente: '44449',
    nome: 'ISABELLA MENDES',
    servico: 'PLANO OFERTA 500MB FIBRA',
    valorPlano: '109.90',
    cpfCnpj: '85274196300',
    bairro: 'INGLESES',
    cidade: 'FLORIANÓPOLIS - SC',
    dataCadastro: '06/05/2025',
    dataProvisionado: '06/05/2025',
    horaProvisionado: '14:00',
    jotas: 'agente6@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:06',
    tipoCdo: 'ONU XPTO',
    status: 'AGUARDANDO',
    instalador: 'VANESSA SANTOS'
  },
  {
    idOs: '8601',
    idCliente: '44450',
    nome: 'CARLOS EDUARDO',
    servico: 'PLANO CORPORATIVO 1GB',
    valorPlano: '299.90',
    cpfCnpj: '74185296300',
    bairro: 'CENTRO',
    cidade: 'FLORIANÓPOLIS - SC',
    dataCadastro: '07/05/2025',
    dataProvisionado: '07/05/2025',
    horaProvisionado: '15:00',
    jotas: 'agente7@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:07',
    tipoCdo: 'ONU CORPORATIVA',
    status: 'ATIVO',
    instalador: 'TIAGO HENRIQUE'
  },
  {
    idOs: '8602',
    idCliente: '44451',
    nome: 'PATRÍCIA XAVIER',
    servico: 'PLANO OFERTA 300MB DIGITAL',
    valorPlano: '89.90',
    cpfCnpj: '96385274100',
    bairro: 'CÓRREGO GRANDE',
    cidade: 'FLORIANÓPOLIS - SC',
    dataCadastro: '08/05/2025',
    dataProvisionado: '08/05/2025',
    horaProvisionado: '16:00',
    jotas: 'agente8@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:08',
    tipoCdo: '254 ACESSO (ONU SMALL OPEN)',
    status: 'EM INSTALAÇÃO',
    instalador: 'FELIPE SOARES'
  },
  {
    idOs: '8603',
    idCliente: '44452',
    nome: 'GABRIELA NASCIMENTO',
    servico: 'PLANO BÁSICO 200MB',
    valorPlano: '79.90',
    cpfCnpj: '15935748600',
    bairro: 'RIO TAVARES',
    cidade: 'FLORIANÓPOLIS - SC',
    dataCadastro: '09/05/2025',
    dataProvisionado: '09/05/2025',
    horaProvisionado: '17:00',
    jotas: 'agente9@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:09',
    tipoCdo: 'ONU FIBRA',
    status: 'PENDENTE',
    instalador: 'DÉBORA LOPES'
  },
  {
    idOs: '8604',
    idCliente: '44453',
    nome: 'RAFAEL MOURA',
    servico: 'PLANO 700MB FIBRA TURBO',
    valorPlano: '139.90',
    cpfCnpj: '95175385200',
    bairro: 'CANASVIEIRAS',
    cidade: 'FLORIANÓPOLIS - SC',
    dataCadastro: '10/05/2025',
    dataProvisionado: '10/05/2025',
    horaProvisionado: '18:00',
    jotas: 'agente10@sim.provedor.net',
    macOnu: 'B0:C3:D4:E5:F6:10',
    tipoCdo: 'ONU TURBO',
    status: 'ATIVO',
    instalador: 'LUCAS FERNANDES'
  }
];



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
      <h1 className='h2-card1-gerencial-geral'>{totais.total_geral}</h1>

      <div className='div-card1-gerencial-geral1'>
        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{totais.total_instalacoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
          <h1 className='h4-card1-gerencial-geral'>{totais.total_trocas}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
          <h1 className='h4-card1-gerencial-geral'>{totais.total_manutencoes}</h1>
        </div>

        <div className='row-card1-gerencial-geral'>
          <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
          <h1 className='h4-card1-gerencial-geral'>{totais.total_outros}</h1>
        </div>
      </div>
    </div>

            </div>

        <div style={{width: '99%', justifyItems: 'start', display: 'flex', justifySelf: 'center', marginTop: 20}}>
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
                        <div className="sla-valor">6</div>
                        <div className="sla-valor">4</div>
                        <div className="sla-valor">0,6</div>
                        <div className="sla-valor">4</div>
                    </div>
                    </div>
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
      {dadosClientes.map((cliente, index) => (
        <tr key={index}>
          <td>{cliente.idOs}</td>
          <td>{cliente.idCliente}</td>
          <td>{cliente.nome}</td>
          <td>{cliente.servico}</td>
          <td>{cliente.valorPlano}</td>
          <td>{cliente.cpfCnpj}</td>
          <td>{cliente.bairro}</td>
          <td>{cliente.cidade}</td>
          <td>{cliente.dataCadastro}</td>
          <td>{cliente.dataProvisionado}</td>
          <td>{cliente.horaProvisionado}</td>
          <td>{cliente.jotas}</td>
          <td>{cliente.macOnu}</td>
          <td>{cliente.tipoCdo}</td>
          <td>{cliente.status}</td>
          <td>{cliente.instalador}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>




    </div>
  )
}

export default DashboardOperacionalGerencial