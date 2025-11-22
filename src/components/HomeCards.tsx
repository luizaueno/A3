import React from "react";
import "../styles/HomeCards.css";

const HomeCards: React.FC = () => {
  return (
    <div className="home-cards-container">
      <div className="mini-cards-row">
        <div className="mini-card">
          <span className="card-icon" role="img" aria-label="segurança">🔒</span>
          <p>Segurança<br /><small>Informações protegidas.</small></p>
        </div>
        <div className="mini-card">
          <span className="card-icon" role="img" aria-label="rápido">⚡</span>
          <p>Rápido<br /><small>Processo simples.</small></p>
        </div>
        <div className="mini-card">
          <span className="card-icon" role="img" aria-label="efetivo">✅</span>
          <p>Efetivo<br /><small>Ajuda a prevenir novos golpes.</small></p>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
