import React from 'react'

import '../CSS/DashboardOperacionalGerencial.css'
import logobranca from '../Images/logobrnaca.png'

function DashboardOperacionalGerencial() {


    const dados = [
  { cidade: 'FLORIANÓPOLIS', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
  { cidade: 'CAXIAS DO SUL', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
  { cidade: 'SÃO JOSÉ', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
  { cidade: 'PALHOÇA', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
  { cidade: 'CRICIÚMA', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
];


 const dadosbairros = [
  { bairros: 'INGLESES', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
  { bairros: 'CAMPECHE', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
  { bairros: 'SÃO JOÃO DO RIO VERMELHO', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
  { bairros: 'VARGEM GRANDE', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
  { bairros: 'VARGEM PEQUENA', instalacoes: 100, manutencao: 50, trocaEndereco: 50, outros: 25 },
];



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

                    <h1  className='h2-head-gerencial-body-operacional'><h1  className='amarelo-h2-head-gerencial-body'>C</h1>ENTRO DE <h1 className='amarelo-h2-head-gerencial-body'> OP</h1>ERAÇÕES</h1>

                      <h1  className='h2-head-gerencial-body-invisivel'>Geral</h1>
                 
                </div>

                <div style={{width: '100%', backgroundColor: 'black', height: 40}}>
                    .
                </div>

            <div className='row-div-gerencial-geral'>

                    <div className='div-card1-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>BACKLOG TOTAL</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                             
      
                        </div>
                    </div>

                                    <div className='div-card1-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>AGENDA DIA</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
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
          {dados.map((item, index) => (
            <tr key={item.cidade} style={{flexDirection: 'row', display:'flex'}} className={index % 2 === 1 ? 'bg-gray-800' : 'bg-gray-600'}>
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
          {dadosbairros.map((item, index) => (
            <tr key={item.bairros} style={{flexDirection: 'row', display:'flex'}} className={index % 2 === 1 ? 'bg-gray-800' : 'bg-gray-600'}>
              <td className="h7-card1-gerencial-geral">{item.bairros}</td>
              <td className="h8-card1-gerencial-geral">{item.instalacoes}</td>
              <td className="h8-card1-gerencial-geral">{item.manutencao}</td>
              <td className="h8-card1-gerencial-geral">{item.trocaEndereco}</td>
              <td className="h8-card1-gerencial-geral">{item.outros}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
           

            </div>    


            <div style={{ width: '100%', marginTop: 20, display: 'flex', justifyContent: 'space-around'}}>


                 <div className='div-card4-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>D + 1</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                             
      
                        </div>
                    </div>


                      <div className='div-card5-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>D + 2</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                             
      
                        </div>
                    </div>


                      <div className='div-card6-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>D + 3</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                             
      
                        </div>
                    </div>


                      <div className='div-card7-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>D + 4</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                             
      
                        </div>
                    </div>


                      <div className='div-card8-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>D + 5</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                             
      
                        </div>
                    </div>


                      <div className='div-card9-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>D + 6 (Futuro)</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                             
      
                        </div>
                    </div>


                      <div className='div-card10-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>SEM AGENDA</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                             
      
                        </div>
                    </div>


                      <div className='div-card3-gerencial-geral'>
                        <h1 className='h1-card1-gerencial-geral'>VENCIDOS</h1>
                        <h1  className='h2-card1-gerencial-geral'>200</h1>

                        <div className='div-card1-gerencial-geral1'>
                       
                                <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>INSTALAÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>TROCAS END.</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>

                                      <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>MANUTENÇÕES</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
                                 </div>


                                  <div className='row-card1-gerencial-geral'>
                                <h1 className='h3-card1-gerencial-geral'>OUTROS</h1>
                                 <h1  className='h4-card1-gerencial-geral'>200</h1>
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