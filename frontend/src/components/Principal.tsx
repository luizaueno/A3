import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/principal.css";
import api from "../api/api";
import apiAdmin from "../api/apiAdmin";

export default function Principal() {
  const [descricao, setDescricao] = useState("");
  const [evidencias, setEvidencias] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuario, setUsuario] = useState<any | null>(null);
  const [chavePix, setChavePix] = useState("");
  const [denunciaExistente, setDenunciaExistente] = useState<any | null>(null);
  const [resultado, setResultado] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/usuarios/me")
      .then((res) => setUsuario(res.data))
      .catch((err) => console.error("Erro ao buscar usuário:", err));
  }, []);

  const formatarData = () => {
    const agora = new Date();
    return agora.toISOString().split(".")[0];
  };

  const verificarDenuncia = async () => {
    if (!chavePix.trim()) return;

    try {
      const res = await apiAdmin.get(`/denuncias/chave/${chavePix}`);
      const msg = res.data;
      setDenunciaExistente(msg.includes("Denúncia encontrada"));
      setMostrarFormulario(true);
      if (msg.includes("Denúncia encontrada")) {
        setResultado("⚠️ Essa chave já possui uma denúncia. Você pode adicionar uma.");
      } else {
        setResultado("✅ Nenhuma denúncia encontrada. Você pode adicionar uma.");
      }
    } catch {
      setDenunciaExistente(false);
      setMostrarFormulario(true);
      setResultado("✅ Nenhuma denúncia encontrada. Você pode adicionar uma.");
    }
  };

  const adicionarDenuncia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario?.id || !chavePix.trim() || !descricao.trim()) {
      setResultado("❌ Preencha todos os campos obrigatórios.");
      return;
    }
    const novaDenuncia = {
      usuarioId: usuario.id,
      chavePix: chavePix.trim(),
      descricao: descricao.trim(),
      status: "EM_ANDAMENTO",
      dataCriacao: formatarData(),
      evidencias: evidencias.trim(),
      resposta: ""
    };
    try {
      await apiAdmin.post("/denuncias", novaDenuncia);
      setResultado("✅ Denúncia adicionada com sucesso!");
      setMostrarFormulario(false);
      setDenunciaExistente(novaDenuncia);
      setDescricao("");
      setEvidencias("");
    } catch (error: any) {
      console.error("Erro ao adicionar denúncia:", error.response?.data || error);
      setResultado("❌ Erro ao adicionar denúncia");
    }
  };

  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <div className="pagina-inicial">
      <header className="header-inicial">
        <div className="header-content">
          <h1 className="titulo-portal">Portal de Denúncias</h1>
          <div className="usuario-info">
            <span className="nome-usuario">Olá, {usuario?.nome || "Usuário"}</span>
            <button className="btn-sair-user" onClick={sair}>Sair</button>
          </div>
        </div>
      </header>

      <main className="conteudo-principal">
        <section className="hero-section">
          <h2>Denuncie Golpes e Fraudes</h2>
          <p className="subtitulo">
            Sua denúncia é importante para combater fraudes e proteger outras pessoas.
          </p>
        </section>

        <section className="pesquisa-section">
          <div className="pesquisa-box">
            <input 
              className="input-pesquisa" 
              type="text" 
              placeholder="Digite a chave PIX para verificar denúncias..." 
              value={chavePix}
              onChange={(e) => {
                setChavePix(e.target.value);
                setResultado("");
              }}
            />
            <button className="botao-buscar" type="button" onClick={verificarDenuncia}>
              🔍 Buscar
            </button>
          </div>
          {resultado && (
            <>
              <div className={`resultado-pesquisa ${resultado.startsWith("✅") ? "success" : resultado.startsWith("❌") ? "error" : ""}`}>
                {resultado}
              </div>
              {resultado.startsWith("✅ Nenhuma denúncia encontrada") && (
                <form onSubmit={adicionarDenuncia} className="formulario-box" style={{maxWidth: 700, margin: '20px auto 0', background: 'white', borderRadius: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.1)', padding: 30}}>
                  <h3 style={{color: 'var(--h1)', marginBottom: 20}}>Registrar Nova Denúncia</h3>
                  <div className="campo-formulario">
                    <label>Descrição da denúncia:</label>
                    <textarea
                      className="textarea-formulario"
                      placeholder="Descreva o que aconteceu, como foi o golpe, valores envolvidos..."
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="campo-formulario">
                    <label>Evidências (opcional):</label>
                    <input
                      className="input-formulario"
                      type="text"
                      placeholder="Link ou texto de evidências"
                      value={evidencias}
                      onChange={(e) => setEvidencias(e.target.value)}
                    />
                  </div>
                  <button className="botao-enviar-denuncia" type="submit">📝 Enviar denúncia</button>
                </form>
              )}
            </>
          )}
        </section>

        <section className="acoes-section">
          <div className="cards-container">
            <Link to="/perfil" className="card-acao">
              <div className="card-icone">📋</div>
              <h3>Minhas Denúncias</h3>
              <p>Acompanhe o status das suas denúncias</p>
            </Link>
          </div>
        </section>

        <section className="info-section">
          <div className="info-cards">
            <div className="info-card">
              <h4>🔒 Segurança</h4>
              <p>Suas informações são protegidas e confidenciais</p>
            </div>
            <div className="info-card">
              <h4>⚡ Rápido</h4>
              <p>Processo simples e ágil para fazer denúncias</p>
            </div>
            <div className="info-card">
              <h4>🎯 Efetivo</h4>
              <p>Suas denúncias ajudam a prevenir novos golpes</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
