import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./componentes/Login";
import Home from "./componentes/Home";
import Usuario from "./componentes/Usuario";
import Perfil from "./componentes/Perfil";
import Impressora from "./componentes/Impressora";
import Cartucho from "./componentes/Cartucho";
import NoteDesk from "./componentes/NoteDesk";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios" element={<Usuario />} />
        <Route path="/perfil" element={<Perfil />} />
         <Route path="/impressora" element={<Impressora />} />
        <Route path="/cartucho" element={<Cartucho/>} />
        <Route path="/notedesk" element={<NoteDesk/>}/>
        {/* Redirecionamento caso a rota não exista */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );

}

export default App;

