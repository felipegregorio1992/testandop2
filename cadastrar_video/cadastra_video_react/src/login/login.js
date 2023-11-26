import axios from "axios";
import { useState } from "react";



export default function Login(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:5001/login", { email, senha }, {
            headers: { "Content-Type": "application/json" }
        });

        if (response.status === 200) {
            const { nome } = response.data;
            setUsuario({ nome }); // Atualize o estado com o nome da pessoa logada
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
        <div>
          <h1>Olá, {usuario.nome}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
