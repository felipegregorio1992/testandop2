import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
  return (
    <div className="home">
      <h1>Bem-vindo à Página Inicial</h1>
      <p>Esta é a página inicial do nosso aplicativo.</p>

      {/* Adicione links para navegar entre as páginas */}
      <div>
        <Link to="/cadastro">Ir para Cadastro</Link>
      </div>
      <div>
        <Link to="/login">Ir para Login</Link>
      </div>
    </div>
  );
}
