import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/login.css';

export default function AdminLogin() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const admins = [
    { usuario: "Gabriela", senha: "senhaadmin" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const valido = admins.find(
        (a) => a.usuario === usuario && a.senha === senha
    );

    if (valido) {
        localStorage.setItem("adminToken", "true");
        localStorage.setItem("adminNome", valido.usuario); 
        navigate("/admin/painel");
    } else {
        alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="container">
      <h1>Bem vindo, Admin!</h1>
      
        <form className="form" onSubmit={handleLogin}>
        <input
        className="input-login"
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        />

        <input
        className="input-login"
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        />
        <button id="botao" type="submit">Entrar</button>
      </form>
      <p className="admin-link"> <Link to="/login">Voltar ao login de usuário</Link></p>
    </div>
      
  );
}
