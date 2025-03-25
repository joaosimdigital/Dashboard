import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Pages
import DashboardCancelamentos from '../Page/DashboardCancelamentos';
import DashboardComercial from '../Page/DashboardComercial';
import DashboardOperacional from '../Page/DashboardOperacional';
import DashboardClientes from '../Page/DashboardClientes';

const Rotas = () => {
  return (
    <Router>
      <Routes>
        <Route path='/cancelamentotv' element={<DashboardCancelamentos />} />
        <Route path='/comercialtv' element={<DashboardComercial />} />
        <Route path='/operacionaltv' element={<DashboardOperacional />} />
        <Route path='/clientestv' element={<DashboardClientes />} />
        
      </Routes>
    </Router>
  );
};

export default Rotas;