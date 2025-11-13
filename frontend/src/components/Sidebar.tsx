import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">SafeTrack
      </h2>
      <nav>
        <ul>
          <li onClick={() => navigate("/principal")}> Início</li>
          <li onClick={() => navigate("/perfil")}> Perfil</li>
          <li onClick={handleLogout}> Sair</li>
        </ul>
      </nav>
    </div>
  );
}