import React from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div className="home">
      <h1>Bem-vindo à Página Inicial</h1>
      <p>Esta é a página inicial do nosso aplicativo.</p>

      {/* Adicione links para navegar entre as páginas */}
      <div>
        <Link to="/cadastroadm">Ir para Cadastro de ADM</Link>
        </div>
        <div>
        <Link to="/loginadm">Ir para Login de Administrador</Link>
        </div>
    </div>
  );
}
