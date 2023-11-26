// AtualizarPagamento.js
import React, { useState } from 'react';
import axios from 'axios';

const AtualizarPagamento = ({ idUsuario }) => {
  const [mensagem, setMensagem] = useState('');

  const handleAtualizarPagamento = async (e) => {
    e.preventDefault();

    try {
      // Ajuste aqui: envie o valor de pagamento como uma string
      const response = await axios.patch(`http://localhost:5000/clientes/${idUsuario}`, { pagamento: '30' });

      if (response.status === 200) {
        setMensagem('Pagamento atualizado com sucesso!');
      } else {
        setMensagem('Erro ao atualizar o pagamento.');
      }
    } catch (error) {
      console.error('Erro ao realizar a atualização:', error);
      setMensagem('Erro ao realizar a atualização.');
    }
  };

  return (
    <div>
      <h1>Atualizar Pagamento</h1>
      <form onSubmit={handleAtualizarPagamento}>
        <label>
          Novo Pagamento:
          <input
            type="text"
            value="R$ 30,00"
            readOnly
            disabled
            required
          />
        </label>
        <br />
        <button type="submit">Atualizar Pagamento</button>
      </form>
      <p>{mensagem}</p>
    </div>
  );
};

export default AtualizarPagamento;
