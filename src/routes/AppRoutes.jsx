import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/publicas/Inicio";
import Cardapio from "../pages/publicas/Cardapio";
import SobreNos from "../pages/publicas/SobreNos";
import Contato from "../pages/publicas/Contato";
import Login from "../pages/admin/Login";
import RecuperarSenha from "../pages/admin/RecuperarSenha";

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