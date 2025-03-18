import React from 'react'

import '../CSS/DashboardOperaciona.css'


import logobranca from '../Images/logobrnaca.png'

export default function DashboardOperacional() {
  return (
    <div>

            <div>

                <div className='row-div-instalacao-manutencao'>
                    
                    <div className='div-card-dados-principais'>
                            <h1 className='h1-titulo-card-dados-principais'>Instalações</h1>
                        <div className='row-div-card-dados-principais'>
                      

                      <div className='body-div-card-dados-principais-dados'>
                            <h1 className='h1-body-div-card-dados-principais'>Mês atual</h1>
                            <div className='div-card-dados-principais-dados'>
                               
                                <div className='card-dados-principais-dados'>
                                        <h1 className='h1-card-dados-principais-dados'>SC</h1>
                                        <h1 className='h2-card-dados-principais-dados'>145</h1>
                                </div>
                                <div className='card-dados-principais-dados'>
                                        <h1 className='h1-card-dados-principais-dados'>RS</h1>
                                        <h1 className='h2-card-dados-principais-dados'>145</h1>
                                </div>
                            

                           
                            </div>

                            <div className='div-meta-card-dados-principais'>
                                <h1 className='h1-meta-card-dados-principais'>Meta Mês</h1>
                                <h1  className='h2-meta-card-dados-principais'>0</h1>
                            </div>

                            </div>

                            <div className='body-div-card-dados-principais-dados'>
                         
                            <div className='div-card-dados-principais-dados-diaria'>
                                    <h1 className='h1-div-card-dados-principais-dados-diaria'>Diária</h1>
                                    <h1 className='h2-div-card-dados-principais-dados-diaria'>0</h1>


                                </div>
                                

                                <div className='div-meta-card-dados-principais'>
                                <h1 className='h1-meta-card-dados-principais'>Meta / Média</h1>
                                <h1  className='h2-meta-card-dados-principais'>0</h1>
                                </div>
                            </div>

                            <div>

                            </div>

                        </div>

                    </div>


                    <div className='div-card-dados-principais'>
                            <h1 className='h1-titulo-card-dados-principais'>Manutenção</h1>
                        <div className='row-div-card-dados-principais'>
                      

                      <div className='body-div-card-dados-principais-dados'>
                            <h1 className='h1-body-div-card-dados-principais'>Mês atual</h1>
                            <div className='div-card-dados-principais-dados'>
                               
                                <div className='card-dados-principais-dados'>
                                        <h1 className='h1-card-dados-principais-dados'>SC</h1>
                                        <h1 className='h2-card-dados-principais-dados'>145</h1>
                                </div>
                                <div className='card-dados-principais-dados'>
                                        <h1 className='h1-card-dados-principais-dados'>RS</h1>
                                        <h1 className='h2-card-dados-principais-dados'>145</h1>
                                </div>
                            

                           
                            </div>

                            <div className='div-meta-card-dados-principais'>
                                <h1 className='h1-meta-card-dados-principais'>Meta Mês</h1>
                                <h1  className='h2-meta-card-dados-principais'>0</h1>
                            </div>

                            </div>

                            <div className='body-div-card-dados-principais-dados'>
                         
                            <div className='div-card-dados-principais-dados-diaria'>
                                    <h1 className='h1-div-card-dados-principais-dados-diaria'>Diária</h1>
                                    <h1 className='h2-div-card-dados-principais-dados-diaria'>0</h1>


                                </div>
                                

                                <div className='div-meta-card-dados-principais'>
                                <h1 className='h1-meta-card-dados-principais'>Meta / Média</h1>
                                <h1  className='h2-meta-card-dados-principais'>0</h1>
                                </div>
                            </div>

                            <div>

                            </div>

                        </div>

                    </div>


                    </div>

                <div className='row-div-instalacao-grafico' >
                    <div className='body1-agenda-operacao'>
                        <div  className='div-agenda-operacao'>
                                <h1  className='titulo-agenda-operacao'>Instalações por Trimestre</h1>
                        </div>
                        <div className='div-agenda2-operacao'>
                        <h1 className='titulo-agenda-operacao'>Agenda</h1>
                        <h1 className='titulo1-agenda-operacao'>Prazo de instalação</h1>
                        </div>
                    </div>
                    <div className='body2-agenda-operacao'>
                            <div className='div3-agenda-operacao'>
                                <h1  className='titulo-agenda-operacao'>Tipo de Manutenção</h1>
                            </div>
                            <div className='div3-agenda-operacao'>
                                <h1  className='titulo-agenda-operacao'>OS Dia</h1>
                            </div>

                    </div>
                </div>

            </div>

            <div className='div-titulo-dash'>
            <h1 className='h2-titulo-dash'>CHURN TV</h1>
            <h1 className='h1-titulo-dash'>OPERACIONAL TV</h1>
            <img src={logobranca}/>
        </div>

    </div>
  )
}
