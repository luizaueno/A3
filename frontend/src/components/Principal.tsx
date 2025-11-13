import React, { useState } from "react";
import type { JSX } from "react";
import Sidebar from "./Sidebar"
import '../styles/principal.css'

export default function Principal(): JSX.Element {
  const [chavePix, setChavePix] = useState<string>("");
  const [resultado, setResultado] = useState<string | null>(null);

  const verificarDenuncia = (): void => {
    if (chavePix.trim() === "123456") {
      setResultado("🚨 Denúncia encontrada!");
    } else {
      setResultado("✅ Nenhuma denúncia registrada");
    }
  };

  return (
     <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
      <div className="container">
        <h2>Verificar denúncia</h2>
        <input
          type="text"
          placeholder="Digite a chave Pix"
          value={chavePix}
          onChange={(e) => setChavePix(e.target.value)}
        />
        <button onClick={verificarDenuncia}>Verificar</button>
        {resultado && <p>{resultado}</p>}
      </div>
    </div>
  </div>
  );
}
