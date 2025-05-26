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


                      <div className='div-card3-gerencial-geral'>
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


                      <div className='div-card3-gerencial-geral'>
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


                      <div className='div-card3-gerencial-geral'>
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


                      <div className='div-card3-gerencial-geral'>
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


                      <div className='div-card3-gerencial-geral'>
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

    </div>
  )
}

export default DashboardOperacionalGerencial