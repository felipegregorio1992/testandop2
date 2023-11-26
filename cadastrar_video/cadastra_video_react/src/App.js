import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import CadastroForm from './cadastrar/admcadastro';
import Loginadm from './login/loginadm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastroadm" element={<CadastroForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/loginadm" element={<Loginadm />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;
