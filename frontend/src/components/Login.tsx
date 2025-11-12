import { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   const [erro, setErro] = useState("");
   const navigate = useNavigate();

   const irParaCadastro = () => {
    navigate('/cadastro');
   };

  const handleLogin = async () => {
    if(email === "" || senha === "") {
      setErro("Campos não preenchidos");
      return;
    }

  const resposta = await fetch("http://localhost:8080/login", {
    method:"POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, senha})
  });

  if (resposta.ok) {
    const token = await resposta.text(); // lê o token da resposta
    localStorage.setItem("token", token); // salva o token no navegador
    setErro(""); // limpa a mensagem de erro
    navigate("/principal"); // redireciona para a tela principal
  } else {
    setErro("Email ou senha inválidos"); // mostra o erro em vermelho
  }
  };

  return(
    <>
    <div className="container">
      <h1>Bem vindo!</h1>

      <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/> 

      <input className="input" type="password" placeholder="Senha" value={senha
      } onChange={(e) => setSenha(e.target.value)}  required />

      <button id="botao" onClick={handleLogin}>Entrar</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <span onClick={irParaCadastro} className="cadastro-link">Crie uma conta</span>
    </div>
    </>
  )
} 