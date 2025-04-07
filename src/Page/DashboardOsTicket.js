import React, { Component } from 'react'


import '../CSS/DashboardOsTicket.css'

import logobranca from '../Images/logobrnaca.png'


export class DashboardOsTicket extends Component {
  render() {
    return (
      <div>

        <div className='div-header-osticket'>

          <h1 style={{width: '33%'}}></h1>

            <h1 className='titulo-div-header-osticket'>TI<h1 className='subtitulo-div-header-osticket'>CKET's</h1></h1>

            <div  style={{width: '33%', display: 'flex', justifyContent: 'end'}}>
            <img className='logo-div-header-osticket' src={logobranca}/>
            </div>
        </div>

        <div className='div-metricas-osticket'>
           
            <div className='card1-metricas-osticket'>
              <h1 className='card-titulo-metricas'>Total</h1>
              <h1  className='card-subtitulo-metricas'>0</h1>
            </div>


            <div className='card2-metricas-osticket'>
              <h1 className='card-titulo-metricas'>Abertos</h1>
              <h1  className='card-subtitulo-metricas'>0</h1>
            </div>

            <div  className='card3-metricas-osticket'>
              <h1 className='card-titulo-metricas'>Respondidos</h1>
              <h1  className='card-subtitulo-metricas'>0</h1>
            </div>


            <div  className='card4-metricas-osticket'>
              <h1 className='card-titulo-metricas'>Resolvidos</h1>
              <h1  className='card-subtitulo-metricas'>0</h1>
            </div>




        </div>


        <div className='div-graficos'>

          <div className='card1-div-graficos'>

            <div className='div-card1-div-grafico'>
                <h1 className='titulo-div-card1-div-grafico'>Abertos x Mês</h1>
            </div>

          </div>


          <div className='card2-div-graficos'>
            <h1 className='titulo-card2-div-graficos'>TMS</h1>
            <h1  className='subtitulo-card2-div-graficos'>Tempo médio de soluções (dias)</h1>
            <h1  className='valor-card2-div-graficos'>0</h1>
          </div>


          <div className='card3-div-graficos'>
            <h1>Gráficos</h1>
          </div>


        </div>

      </div>
    )
  }
}

export default DashboardOsTicket