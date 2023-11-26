// CadastroForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CadastroForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/cadastro', { nome, email, senha });
      const token = response.data.token;

      // Armazene o token em algum lugar seguro (por exemplo, localStorage)
      localStorage.setItem('token', token);

      // Redirecione para a página desejada após o cadastro (por exemplo, a página principal)
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao cadastrar o usuário', error);
    }
  };

  return (
    <form onSubmit={handleCadastro}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <br />
      <label>
        E-mail:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Senha:
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>
      <br />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastroForm;
