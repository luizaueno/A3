import { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const irParaCadastro = () => {
    navigate('/cadastro');
  };

  const handleLogin = async () => {
    if (email === "" || senha === "") {
      setErro("Campos não preenchidos");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      if (resposta.ok) {
        const data = await resposta.json();
        localStorage.setItem("token", data.token);
        setErro("");
        navigate("/principal");
      } else {
        const erroMsg = await resposta.text();
        setErro(erroMsg);
      }
    } catch (error) {
      setErro("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="container">
      <h1>Bem vindo!</h1>

      <input
        className="input-login"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="input-login"
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <button id="botao" onClick={handleLogin}>Entrar</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <span onClick={irParaCadastro} className="cadastro-link">Crie uma conta</span>
      <p className="admin-link"> É administrador? <Link to="/admin/login">Acesse aqui</Link> </p>
    </div>

    
  );
}
