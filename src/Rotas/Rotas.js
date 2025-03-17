import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Pages
import DashboardCancelamentos from '../Page/DashboardCancelamentos';
import DashboardComercial from '../Page/DashboardComercial';

const Rotas = () => {
  return (
    <Router>
      <Routes>
        <Route path='/cancelamentotv' element={<DashboardCancelamentos />} />
        <Route path='/comercialtv' element={<DashboardComercial />} />
        
      </Routes>
    </Router>
  );
};

export default Rotas;