import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [aberta, setAberta] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <button className="menu" onClick={() => setAberta(!aberta)}>
        ☰
      </button>

      <div className={`sidebar ${aberta ? "aberta" : ""}`}>
        <nav>
          <ul>
            <li onClick={() => navigate("/perfil")}>Perfil</li>
            <li onClick={handleLogout}>Sair</li>
          </ul>
        </nav>
      </div>
    </>
  );
}
