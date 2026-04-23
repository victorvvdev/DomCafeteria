import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Cardapio from "../pages/Cardapio";
import SobreNos from "../pages/SobreNos";
import Contato from "../pages/Contato";
import Login from "../pages/Login";
import RecuperarSenha from "../pages/RecuperarSenha";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/cardapio" element={<Cardapio />} />
      <Route path="/sobre" element={<SobreNos />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
    </Routes>
  );
}

export default AppRoutes;