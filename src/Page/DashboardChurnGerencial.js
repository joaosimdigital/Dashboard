import React from 'react'

import logobranca from '../Images/logobrnaca.png'
import '../CSS/DashboardChurnGerencial.css'

function DashboardChurnGerencial() {
  return (
    <div style={{backgroundColor: 'white', alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%'}}>
                <div className='head-gerencial-body'>
                    <h1 className='h1-head-gerencial-body'>DASHBOARD GERENCIAL</h1>
                    <h1  className='h2-head-gerencial-body'>CHURN</h1>
                    <img  className='logo-head-gerencial-body' src={logobranca}/>
                </div>


                <div className='div-body-opcao'>
                    <div className='div-body-opcao1'>
                    <h1 className='h1-body-opcao'>Ano</h1>
                    <button className='button-body-opcao'>2025</button>
                    </div>

                    <div className='div-body-opcao1'>
                    <h1 className='h1-body-opcao'>Semana</h1>
                    <button className='button-body-opcao'>Semana 1</button>
                    </div>
                </div>

                <div className='row-gerencial-body1'>

                    <div className='div-gerencial-body1'>
                        <div className='grafico-div-gerencial-body1'>
                            
                            <div className='grafico-card1-div-gerencial-body1'>
                            <h1 className='h1-card1-div-gerencial-body1'>Churn Mês</h1>
                            <h1  className='h2-card1-div-gerencial-body1'>Indicador que mede o churn mensal.</h1>
                            </div>

                        </div>
                    </div>

                    <div  className='div-gerencial-body1'>
                            <div className='card1-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body1'>Churn</h1>
                            </div>

                            <div className='card1-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body1'>Projeção</h1>
                            </div>

                            <div className='card2-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body1'>Limite de Meta</h1>
                            </div>
                    </div>

                    <div  className='div-gerencial-body1'>


                    <div className='card1-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body1'>LTV TOTAL</h1>
                            </div>


                            <div className='card3-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body1'>LTV CHURN</h1>
                            </div>


                            <div className='card3-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body1'>PF</h1>
                                <h1>0</h1>
                            </div>

                            <div className='card3-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body1'>PJ</h1>
                                <h1>0</h1>
                            </div>
                    </div>

                </div>


                <div className='div2-gerencial-body1'>
                        <div className='lista-div2-gerencial-body1'>
                            <h1>1</h1>
                        </div>
                    </div>


                    <div className='row-gerencial-body2'>

                        <div className='div-gerencial-body2'>
                            <div className='card-div-gerencial-body2'>
                                <h1>1</h1>
                                </div>
                        </div>

                        <div  className='div-gerencial-body2'>
                            <div className='card-div-gerencial-body2'>
                            <h1>1</h1>
                            </div>
                              
                        </div>

                    </div>

    </div>
  )
}

export default DashboardChurnGerencial