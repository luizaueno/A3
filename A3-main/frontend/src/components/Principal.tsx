import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import "../styles/principal.css";
import api from "../api/api";
import apiAdmin from "../api/apiAdmin";
import HomeCards from "./HomeCards";

export default function Principal() {
  const [descricao, setDescricao] = useState("");
  const [evidencias, setEvidencias] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuario, setUsuario] = useState<any | null>(null);
  const [chavePix, setChavePix] = useState("");
  const [denunciaExistente, setDenunciaExistente] = useState<any | null>(null);
  const [resultado, setResultado] = useState("");


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
    } catch (error: any) {
      console.error("Erro ao adicionar denúncia:", error.response?.data || error);
      setResultado("❌ Erro ao adicionar denúncia");
    }
  };

  return (
    <div className="principal" style={{ paddingTop: '80px' }}>
      <Sidebar />
      <div className="container">
        <h1>Olá, {usuario?.nome}!</h1>

        <input
          type="text"
          placeholder="Digite a chave Pix"
          value={chavePix}
          onChange={(e) => setChavePix(e.target.value)}
        />

        {/* Container separado para o botão Verificar denúncia */}
        <div className="container-btn">
          <button onClick={verificarDenuncia}>🔍 Verificar denúncia</button>
        </div>

        {resultado && (
          <p className={`resultado ${resultado.startsWith("✅") ? "success" : resultado.startsWith("❌") ? "error" : ""}`}>
            {resultado}
          </p>
        )}

        {mostrarFormulario && (
          <form onSubmit={adicionarDenuncia} className="formulario-denuncia">
            <input
              type="text"
              placeholder="Descrição da denúncia"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <input
              type="text"
              placeholder="Evidências (opcional)"
              value={evidencias}
              onChange={(e) => setEvidencias(e.target.value)}
            />
            {/* Container separado para o botão Enviar denúncia */}
            <div className="container-btn">
              <button type="submit">Enviar denúncia</button>
            </div>
          </form>
        )}
        {/* Cards informativos abaixo do formulário */}
        <HomeCards />
      </div>
    </div>
  );
}
