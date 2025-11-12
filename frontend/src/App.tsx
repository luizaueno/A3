import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'
import './styles/login.css'
import Cadastro from './components/Cadastro'
import './styles/cadastro.css'
import './root.css';
import Principal from "./components/Principal";
import './styles/principal.css'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
