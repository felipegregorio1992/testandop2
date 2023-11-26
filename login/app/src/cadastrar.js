import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./cadastrar.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/clientes",
        {
          nome,
          senha,
          cpf,
          email,
          telefone,
          endereco,
          cidade,
          estado,
          cep,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        setSucesso(true);
        setError("");
        navigate('/login');
      } else {
        setSucesso(false);
        setError("Erro no cadastro. Tente novamente mais tarde.");
      }
    } catch (error) {
      setSucesso(false);
      setError("Erro na solicitação.");
    }
  };

  return (
    <div className="cadastro">
      <h1>Cadastro de Usuário</h1>
      <form>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            required
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            name="senha"
            placeholder="Sua senha"
            required
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <label>
          Confirmar Senha:
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirme sua senha"
            required
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            placeholder="Seu CPF"
            required
            onChange={(e) => setCpf(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Seu email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            placeholder="Seu telefone"
            required
            onChange={(e) => setTelefone(e.target.value)}
          />
        </label>
        <label>
          Endereço:
          <input
            type="text"
            name="endereco"
            placeholder="Seu endereço"
            required
            onChange={(e) => setEndereco(e.target.value)}
          />
        </label>
        <label>
          Cidade:
          <input
            type="text"
            name="cidade"
            placeholder="Sua cidade"
            required
            onChange={(e) => setCidade(e.target.value)}
          />
        </label>
        <label>
          Estado:
          <input
            type="text"
            name="estado"
            placeholder="Seu estado"
            required
            onChange={(e) => setEstado(e.target.value)}
          />
        </label>
        <label>
          CEP:
          <input
            type="text"
            name="cep"
            placeholder="Seu CEP"
            required
            onChange={(e) => setCep(e.target.value)}
          />
        </label>
        <button onClick={handleCadastro}>Cadastrar</button>
      </form>
      {error && <p className="error">{error}</p>}
      {sucesso && <p className="success">Cadastro realizado com sucesso!</p>}
    </div>
  );
}
