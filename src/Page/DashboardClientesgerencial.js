import React from 'react'

import logobranca from '../Images/logobrnaca.png'
import '../CSS/DashboardChurnGerencial.css'
import '../CSS/DashboardClientesgerencial.css'


function DashboardClientesgerencial() {
  return (
    <div style={{backgroundColor: 'white', alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%'}}>


          <div className='head-gerencial-body-geral'>
                    <h1 className='h1-head-gerencial-body'>DASHBOARD GERENCIAL</h1>
                    <h1  className='h2-head-gerencial-body'>Geral</h1>
                    <img  className='logo-head-gerencial-body' src={logobranca}/>
                </div>
                
                <div className='div-body-select-geral'>

                       <div className='div-body-opcao1'>
        <h1 className='h1-body-opcao'>Mês</h1>
        <select
          className='button-body-opcao'>
        </select>
      </div>

                   <div className='div-body-opcao1'>
        <h1 className='h1-body-opcao'>Estado</h1>
        <select
          className='button-body-opcao'>
        </select>
      </div>
                </div>
                


                <div className='card-body-geral-dados'>
                    <h1 className='header-titulo-card-body-geral-dados'> CLIENTES ATIVOS</h1>

                    <div className='card-geral-dados'>

                            
                        <div className='card1-div--geral-dados'>
                                <h1>grafico</h1>
                        </div>

                    <div  className='card2-div--geral-dados'>
                        <h1 className='h1-card2-div--geral-dados'>Total</h1>
                        <h1  className='h2-card2-div--geral-dados'>25500</h1>
                    </div>


                     <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>25000</h1>
                    </div>

                         <div   className='card3-div--geral-dados'>
                        <h1  className='h1-card2-div--geral-dados'>Super Meta</h1>
                        <h1   className='h2-card2-div--geral-dados'>26000</h1>
                    </div>



                    </div>
                </div>

    </div>
  )
}

export default DashboardClientesgerencial