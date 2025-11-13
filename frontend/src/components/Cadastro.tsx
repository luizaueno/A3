import '../styles/cadastro.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    const irParaLogin = () => {
        navigate('/login')
    }

    function handleCadastro() {
   
        if (senha !== confirmarSenha) {
            setMensagem("As senhas são diferentes")
            return;
        }
        fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            nome,
            telefone,
            email,
            senha,
            confirmarSenha
            })
        })
        .then(async response => {
  const text = await response.text(); // lê a resposta como texto
  if (!response.ok || !text.trim()) {
    setMensagem(`Erro: ${text || "Preencha os campos para cadastrar"}`);
    return;
  }
  setMensagem(`Cadastro realizado com sucesso!`);
})
.catch(error => {
  setMensagem("Erro inesperado. Tente novamente.");
});
}
    return (
        <>
        <div className="container">
            <h2>Cadastre-se</h2>
            <input className="input-cadastro" type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required/>
            <input className="input-cadastro" type="text" placeholder="Telefone com DDD" value={telefone} onChange={e => setTelefone(e.target.value)} required />
            <input className="input-cadastro" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/> 
            <input className="input-cadastro" type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
            <input className="input-cadastro" type="password" placeholder="Confirme sua Senha" value= {confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)}  required />
            {confirmarSenha && senha !== confirmarSenha && (
                <p style={{ color: 'red' }}>As senhas são diferentes</p>
            )}
            <button id="botao" type='button' onClick={handleCadastro}>Cadastrar</button>
            {mensagem && (
            <p style={{ color: mensagem.includes('Erro') ? 'red' : 'green' }}>
                {mensagem.includes('Erro') ? '❌' : '✅'} {mensagem}
            </p>
            )}
            <span onClick={irParaLogin} className="login-link">Já tem uma conta? Faça login</span>
        </div>
        </>
    )
    
}