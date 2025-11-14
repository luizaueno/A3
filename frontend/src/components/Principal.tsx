import React, { useState } from "react";
import type { JSX } from "react";
import Sidebar from "./Sidebar";
import "../styles/principal.css";

export default function Principal(): JSX.Element {
  const [chavePix, setChavePix] = useState<string>("");
  const [resultado, setResultado] = useState<string | null>(null);

  const verificarDenuncia = (): void => {
    const denunciasFalsas = ["123456", "abc123", "pixfraude"];
    if (denunciasFalsas.includes(chavePix.trim())) {
      setResultado("🚨 Denúncia encontrada!");
    } else {
      setResultado("✅ Nenhuma denúncia registrada");
    }
  };

  return (
    <div className="principal-container">
      <Sidebar />
      <div className="conteudo">
        <div className="container">
          <h2>Verificar denúncia</h2>
          <input
            type="text"
            placeholder="Digite a chave Pix"
            value={chavePix}
            onChange={(e) => setChavePix(e.target.value)}
          />
          <button onClick={verificarDenuncia}>Verificar</button>
          {resultado && (
            <p style={{ color: resultado.includes("🚨") ? "red" : "green" }}>
              {resultado}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
