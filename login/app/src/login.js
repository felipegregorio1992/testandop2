// Login.js
import axios from "axios";
import { useState } from "react";
import "./login.css";
import VideoList from "./video";
import AtualizarPagamento from "./pagamento";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/login", { email, senha }, {
        headers: { "Content-Type": "application/json" }
      });
  
      if (response.status === 200) {
        const { id, nome, pagamento } = response.data;
        console.log('Dados do usuário:', { id, nome, pagamento });
        setUsuario({ id, nome, pagamento });
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (error) {
      setError("Erro na solicitação.");
    }
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  return (
    <div className="login">
      {usuario === null ? (
        // Se o usuário não estiver autenticado, exiba o formulário de login
        <div>
          <h1>Login</h1>
          <form>
            <label>
              Username:
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="senha"
                placeholder="senha"
                required
                onChange={(e) => setSenha(e.target.value)}
              />
            </label>
            <button onClick={handleLogin}>Login</button>
          </form>
          <p>{error}</p>
        </div>
      ) : (
        // Se o usuário estiver autenticado
        <div>
          <h1>Olá, {usuario.nome}</h1>
  
          {usuario.pagamento !== null ? (
            // Se o pagamento for diferente de 0, exiba a lista de vídeos
            <VideoList />
          ) : (
            // Se o pagamento for 0, exiba a mensagem e a opção de atualizar pagamento
            <div>
              <p>Seu pagamento está pendente ou inválido.</p>
              {/* Passe o ID do usuário para AtualizarPagamento */}
              <AtualizarPagamento idUsuario={usuario.id} />
            </div>
          )}
  
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
  
}
