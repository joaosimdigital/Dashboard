import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList} from 'recharts';


import '../CSS/DashboardOperaciona.css'


import logobranca from '../Images/logobrnaca.png'
import check_box from '../Images/check_box.png'
import poste from '../Images/poste 1.png'
import schedule from '../Images/schedule.png'
import person from '../Images/person.png'

export default function DashboardOperacional() {


    const data = [
        { month: 'Janeiro', instalacoes: 200 },
        { month: 'Fevereiro', instalacoes: 300 },
        { month: 'Março', instalacoes: 400 },
      ];
      

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
                        <h1 className='h1-tabela-agenda-dia'>Instalações pro trimestre</h1>
                        <ResponsiveContainer width='100%' height={250}>
                        <BarChart data={data} margin={{ top:30, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis 
                            dataKey='month' 
                         tick={{ fill: '#fff', fontSize: 10}} fontWeight='bold'
                            />
                           
                            <Tooltip />
                           
                            <Bar dataKey='instalacoes' fill='#F45742' barSize={50}>
                            <LabelList dataKey="instalacoes" position="center" fill="white" />
                            </Bar>
                        </BarChart>
                        </ResponsiveContainer>

                        </div>
                        <div className='div-agenda2-operacao'>
                        <h1 className='titulo-agenda-operacao'>Agenda</h1>
                        <h1 className='titulo1-agenda-operacao'>Prazo de instalação</h1>
                        </div>
                    </div>
                    <div className='body2-agenda-operacao'>
                        

                    <div className='div3-agenda-operacao'>
                                <h1  className='titulo-agenda-operacao'>Tipo de Manutenção</h1>

                                <div className='agenda-os-dia'>
                                <div className='row-div3-agenda-operacao'>
                                    <img style={{width: '13px'}} src={poste}/>
                                    <h1 className='titulo-agenda1-operacao'>55</h1>
                                    </div>

                                    
                                <div className='row-div3-agenda-operacao'>
                                    <img  style={{width: '30px'}} src={person}/>
                                    <h1 className='titulo-agenda1-operacao'>55</h1>
                                    </div>

                                    </div>

                            </div>

                            <div className='div3-agenda-operacao'>
                                <h1  className='titulo-agenda-operacao'>OS Dia</h1>

                                <div className='agenda-os-dia'>
                                <div className='row-div3-agenda-operacao'>
                                    <img style={{width: '30px'}} src={schedule}/>
                                    <h1 className='titulo-agenda1-operacao'>55</h1>
                                    </div>

                                    
                                <div className='row-div3-agenda-operacao'>
                                    <img  style={{width: '30px'}} src={check_box}/>
                                    <h1 className='titulo-agenda1-operacao'>55</h1>
                                    </div>

                                    </div>

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
