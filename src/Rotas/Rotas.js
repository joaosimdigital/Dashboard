import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Pages
import DashboardCancelamentos from '../Page/DashboardCancelamentos';
import DashboardComercial from '../Page/DashboardComercial';
import DashboardOperacional from '../Page/DashboardOperacional';
import DashboardClientes from '../Page/DashboardClientes';
import DashboardClientesTV from '../Page/DashboardClientesTV';
import DashboardOsTicket from '../Page/DashboardOsTicket';
import DashboardChurnGerencial from '../Page/DashboardChurnGerencial';
import DashboardCancelamentosClone from '../Page/DashboardCancelamentosClone';
import DashboardComercialgerencial from '../Page/DashboardComercialgerencial';
import DashboardClientesgerencial from '../Page/DashboardClientesgerencial';
import DashboardOperacionalGerencial from '../Page/DashboardOperacionalGerencial';
import DashboardPerformanceComercial from '../Page/DashboardPerformanceComercial';

const Rotas = () => {
  return (
    <Router>
      <Routes>
        <Route path='/dashboardperformancecomercial' element={<DashboardPerformanceComercial />} />
        <Route path='/cancelamentotv' element={<DashboardCancelamentos />} />
        <Route path='/cancelamento-simone' element={<DashboardCancelamentosClone />} />
        <Route path='/comercialtv' element={<DashboardComercial />} />
        <Route path='/operacionaltv' element={<DashboardOperacional />} />
        <Route path='/clientestv' element={<DashboardClientesTV />} />
        <Route path='/clientestv1' element={<DashboardClientes />} />
        <Route path='/osticket' element={<DashboardOsTicket />} />
        <Route path='/dashboardchurngerencial' element={<DashboardChurnGerencial />} />
        <Route path='/dashboardcomercialgerencial' element={<DashboardComercialgerencial />} />
         <Route path='/geral' element={<DashboardClientesgerencial />} />  
        <Route path='/dashboardoperacionalgerencial' element={<DashboardOperacionalGerencial />} />  
      </Routes>
    </Router>
  );
};

export default Rotas;