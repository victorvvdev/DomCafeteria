import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/publicas/Inicio";
import Cardapio from "../pages/publicas/Cardapio";
import SobreNos from "../pages/publicas/SobreNos";
import Contato from "../pages/publicas/Contato";
import Login from "../pages/admin/Login";
import RecuperarSenha from "../pages/admin/RecuperarSenha";
import ContatoAdm from "../pages/admin/ContatoAdm";
import AdicionarAdm from "../pages/admin/AdicionarAdm";
import InicioAdm from "../pages/admin/InicioAdm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/cardapio" element={<Cardapio />} />
      <Route path="/sobre" element={<SobreNos />} />
      <Route path="/contato" element={<Contato />} />

      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />

      <Route path="/adm/inicioadm" element={<InicioAdm />} />
      <Route path="/adm/contato" element={<ContatoAdm />} />
      <Route path="/adm/adicionar" element={<AdicionarAdm />} />
    </Routes>
  );
}

export default AppRoutes;