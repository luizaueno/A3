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
  const token = await resposta.text();
  localStorage.setItem("token", token);
  console.log(token)
  setErro("");
  navigate("/principal");
} else {
  const erro = await resposta.text(); // lê a mensagem do backend
  setErro(erro); // exibe exatamente o que veio do backend
}
  };

  return(
    <>
    <div className="container">
      <h1>Bem vindo!</h1>

      <input className="input-login" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/> 

      <input className="input-login" type="password" placeholder="Senha" value={senha
      } onChange={(e) => setSenha(e.target.value)}  required />

      <button id="botao" onClick={handleLogin}>Entrar</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <span onClick={irParaCadastro} className="cadastro-link">Crie uma conta</span>
    </div>
    </>
  )
} 