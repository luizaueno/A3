import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Principal from "./components/Principal";
import Perfil from "./components/Perfil";
import { PrivateRoute } from "./components/PrivateRoute";
import './styles/login.css';
import './styles/cadastro.css';
import './root.css';
import './styles/principal.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redireciona raiz para /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* rotas protegidas */}
        <Route
          path="/principal"
          element={
            <PrivateRoute>
              <Principal />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
