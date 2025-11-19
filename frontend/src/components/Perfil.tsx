import { useEffect, useState } from "react";
import api from "../api/api";
import apiAdmin from "../api/apiAdmin";
import { Link } from "react-router-dom";
import "../styles/perfil.css";

export default function Perfil() {
  const [usuario, setUsuario] = useState<any | null>(null);
  const [denuncias, setDenuncias] = useState<any[]>([]);
  const [mostrarDenuncias, setMostrarDenuncias] = useState<boolean>(false);

  useEffect(() => {
    api
      .get("/usuarios/me")
      .then((res) => setUsuario(res.data))
      .catch((err) => console.error("Erro ao buscar perfil:", err));
  }, []);

  const buscarDenuncias = () => {
    if (!usuario) return;

    apiAdmin
      .get(`/denuncias/usuario/${usuario.id}`)
      .then((res) => {
        const apenasMinhas = res.data.filter(
          (d: any) => d.chavePix && d.chavePix.trim() !== "" && d.gravidade === null
        );
        setDenuncias(apenasMinhas);
        setMostrarDenuncias(true);
      })
      .catch((err) => console.error("Erro ao buscar denúncias:", err));
  };

  if (!usuario) return <p>Carregando perfil...</p>;

  return (
    <div className="perfil">
      <div className="avatar">
        <img src="/imagem/user_9055398.png" alt="imagem de usuário" />
      </div>
      <h2>{usuario.nome}</h2>
      <button className="buscar" onClick={buscarDenuncias}>Minhas denúncias</button>
      <Link to="/principal" className="link">Voltar à página principal</Link>

      {mostrarDenuncias && (
        <ul className="lista-denuncias">
          {denuncias.length === 0 ? (
            <li>Nenhuma denúncia encontrada.</li>
          ) : (
            denuncias.map((d) => (
              <li key={d.id} className="denuncia-bloco">
                <p className="descricao"><strong>Descrição:</strong> {d.descricao}</p>
                <p className="status"><strong>Status:</strong> {d.status}</p>
              
                {d.resposta && <p><strong>Resposta:</strong> {d.resposta}</p>}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
