import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/publicas/Inicio";
import Cardapio from "../pages/publicas/Cardapio";
import SobreNos from "../pages/publicas/SobreNos";
import Contato from "../pages/publicas/Contato";
import Login from "../pages/admin/Login";
import RecuperarSenha from "../pages/admin/RecuperarSenha";
import InicioAdm from "../pages/admin/InicioAdm";
import InfosPessoais from "../pages/admin/InfosPessoais";
import InfosPessoais2 from "../pages/admin/InfosPessoais2";

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
      <Route path="/adm/infospessoais" element={<InfosPessoais />} />
      <Route path="/adm/infospessoais2" element={<InfosPessoais2 />} />
    </Routes>
  );
}

export default AppRoutes;