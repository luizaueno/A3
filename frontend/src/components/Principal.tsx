import { useState, useEffect } from "react";
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
      if (res.data) {
        setDenunciaExistente(res.data);
        setMostrarFormulario(false);
        setResultado("⚠️ Essa chave já possui uma denúncia.");
      } else {
        setDenunciaExistente(null);
        setMostrarFormulario(true);
        setResultado("✅ Nenhuma denúncia encontrada. Você pode adicionar uma.");
      }
    } catch {
      setDenunciaExistente(null);
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
    <div className="principal">
      <Sidebar />
      <div className="container">
        <h1>Bem-vinda, {usuario?.nome}!</h1>

        <input
          type="text"
          placeholder="Digite a chave Pix"
          value={chavePix}
          onChange={(e) => setChavePix(e.target.value)}
        />

        <div className="botoes">
          <button onClick={verificarDenuncia}>Verificar denúncia</button>
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
            <button type="submit">Enviar denúncia</button>
          </form>
        )}
      </div>
    </div>
  );
}
