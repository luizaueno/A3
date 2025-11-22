import { useEffect, useState } from "react";
import apiAdmin from "../api/apiAdmin";
import "../styles/painel.css";


interface Denuncia {
  id: number;
  descricao: string;
  status: string;
  chavePix: string;
  dataCriacao: string;
  usuarioId: number;
  evidencias?: string;
  resposta?: string | null;
}

export default function AdminPainel() {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [selecionada, setSelecionada] = useState<Denuncia | null>(null);
  const [resposta, setResposta] = useState("");
  const [novoStatus, setNovoStatus] = useState("EM_ANDAMENTO");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    apiAdmin
      .get("/denuncias")
      .then((res) => setDenuncias(res.data))
      .catch((err) => console.error("Erro ao buscar denúncias:", err));
  }, []);

  const nomeAdmin = localStorage.getItem("adminNome");

  const enviarResposta = async () => {
    if (!selecionada || !resposta.trim()) return;

    try {
      const atualizada = {
        ...selecionada,
        resposta: resposta,
        status: novoStatus,
      };

      await apiAdmin.put(`/denuncias/${selecionada.id}`, atualizada);

      const atualizadas = denuncias.map((d) =>
        d.id === selecionada.id ? atualizada : d
      );
      setDenuncias(atualizadas);
      setSelecionada(null);
      setResposta("");
      setNovoStatus("EM_ANDAMENTO");
      setMensagem("Denúncia Respondida!");


      setTimeout(() => setMensagem(""), 5000);
    } catch (error) {
      console.error("Erro ao atualizar denúncia:", error);
    }
  };

  const sair = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminNome");
    window.location.href = "/login";
  };

  return (
    <div className="container">
    <div className="top-bar">
      <h1>Olá, {nomeAdmin}!</h1>
      <button onClick={sair}>Sair</button>
     </div>
        <h2>Veja a lista de Denúncias </h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Chave Pix</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {denuncias.map((d) => (
            <tr key={d.id} onClick={() => setSelecionada(d)}>
              <td>{d.id}</td>
              <td>{d.descricao}</td>
              <td>{d.status}</td>
              <td>{d.chavePix ?? "—"}</td>
              <td>{new Date(d.dataCriacao).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {mensagem && (
        <p style={{ color: "green", marginTop: "20px", fontWeight: "bold" }}>
          {mensagem}
        </p>
      )}

      {selecionada && (
        <div className="form-resposta">
          <h3>Responder denúncia {selecionada.id}</h3>
          <p><strong>Descrição:</strong> {selecionada.descricao}</p>
          <p><strong>Evidências:</strong> {selecionada.evidencias || "Nenhuma"}</p>
        <div>
            <textarea
            placeholder="Digite a resposta"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            />

          <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
            <option value="RECUSADA">Recusada</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="RESOLVIDA">Resolvida</option>
          </select>

          <button onClick={enviarResposta}>Salvar</button>
          <button onClick={() => setSelecionada(null)}>Cancelar</button>

        </div>
        </div>
      )}
    </div>
  );
}

