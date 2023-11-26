// Importe as bibliotecas e módulos necessários
import React, { useState } from 'react';
import axios from 'axios';

// Componente Cadastro
const Cadastro = () => {
  // Defina os estados necessários
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [link, setLink] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/logado', {
        nome,
        data,
        categoria,
        descricao,
        link,
      });

      if (response.status === 200) {
        setMensagem('Live adicionada com sucesso!');
      } else {
        setMensagem('Erro ao adicionar live!');
      }
    } catch (error) {
      setNome('');
      setData('');
      setCategoria('');
      setDescricao('');
      setLink('');
      setMensagem('Live adicionada com sucesso!');
    }

    

  };

  // Renderize o formulário

  
  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required/>
      </label>
      <label>
        Data:
        <input type="text" value={data} onChange={(e) => setData(e.target.value)}  required/>
      </label>
      <label>
        Categoria:
        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required/>
      </label>
      <label>
        Descrição:
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required/>
      </label>
      <label>
        Link:
        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} required/>
      </label>

      {/* Mensagem de sucesso ou erro */}
      {mensagem && <p style={{ color: mensagem.includes('sucesso') ? 'green' : 'red' }}>{mensagem}</p>}

      <button type="submit">Adicionar Live</button>
    </form>
  );
};


// Exporte o componente Cadastro
export default Cadastro;
