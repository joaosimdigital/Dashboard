import React from 'react'

import '../CSS/DashboardClientes.css'

//Images
import logobranca from '../Images/logobrnaca.png'

function DashboardClientes() {
  return (
    <div>

            <div>


                <div className='row-header-clientes'>

                    <div className='card-header-clientes1'>
                    <h1 className='h1-card-header-clientes'>TOTAL DE CLIENTES</h1>
                    <h1 className='h2-card-header-clientes'>0</h1>
                    </div>
                    

                    <div className='card-header-clientes2'>
                    <h1 className='h1-card-header-clientes'>CLIENTES HABILITADOS</h1>
                    <h1 className='h2-card-header-clientes'>0</h1>
                    </div>


                    <div className='card-header-clientes3'>
                    <h1 className='h1-card-header-clientes'>CLIENTES SUSPENSOS</h1>
                    <h1 className='h2-card-header-clientes'>0</h1>
                    </div>


                    <div className='card-header-clientes4'>
                    <h1 className='h1-card-header-clientes'>CLIENTES SUP. DÉBITO</h1>
                    <h1 className='h2-card-header-clientes'>0</h1>
                    </div>

                </div>


                <div className='row2-header-clientes'>
                    <div className='div2-header-clientes'>

                        <div className='row3-header-clientes'>

                        <div className='card-div2-header-clientes'>
                            <h1 className='titulodiv-header-clientes-bairros'>RS</h1>
                        </div>

                        <div className='card-div2-header-clientes'>
                            <h1 className='titulodiv-header-clientes-bairros'>PJ</h1>
                        </div>

                        <div className='card-div2-header-clientes3'>
                            <h1 className='titulodiv-header-clientes-bairros'>LTV</h1>
                        </div>

                        </div>
                     

                        <div className='row4-header-clientes'>

                        <div className='card-div2-header-clientes'>
                            <h1 className='titulodiv-header-clientes-bairros'>RS</h1>
                        </div>

                        <div className='card-div2-header-clientes'>
                            <h1 className='titulodiv-header-clientes-bairros'>PF</h1>
                        </div>

                        <div className='card-div2-header-clientes3'>
                            <h1 className='titulodiv-header-clientes-bairros'>TICKET MÉDIO</h1>
                        </div>

                        </div>


                        <div className='row5-header-clientes'>

                            <div className='card-div2-header-clientes5'>
                                <h1 className='titulodiv-header-clientes-bairros'>RS</h1>
                            </div>

                            <div className='card-div2-header-clientes5'>
                                <h1 className='titulodiv-header-clientes-bairros'>RS</h1>
                            </div>

                            <div className='card-div2-header-clientes5'>
                                <h1 className='titulodiv-header-clientes-bairros'>TICKET MÉDIO</h1>
                            </div>

                            </div>

                    </div>

                    <div className='div3-header-clientes'>
                            <div className='div-header-clientes-bairros'>
                                <h1 className='titulodiv-header-clientes-bairros'>Top bairros</h1>
                            </div>
                    </div>
                </div>

            </div>


            <div className='div-titulo-dash'>
            <h1 className='h2-titulo-dash'>CHURN TV</h1>
            <h1 className='h1-titulo-dash'>CLIENTES TV</h1>
            <img src={logobranca}/>
        </div>


    </div>
  )
}

export default DashboardClientes