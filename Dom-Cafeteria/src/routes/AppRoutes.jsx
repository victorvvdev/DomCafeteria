import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/publicas/Inicio";
import Cardapio from "../pages/publicas/Cardapio";
import SobreNos from "../pages/publicas/SobreNos";
import Contato from "../pages/publicas/Contato";
import Login from "../pages/admin/Login";
import RecuperarSenha from "../pages/admin/RecuperarSenha";
import ContatoAdm from "../pages/admin/ContatoAdm";
import AdicionarAdm from "../pages/admin/AdicionarAdm";
import CardapioAdm from "../pages/admin/CardapioAdm";
import EditarLinkCardapio from "../pages/admin/EditarLinkCardapio";
import EditarCardapio from "../pages/admin/EditarCardapio";
import EditarPrato from "../pages/admin/EditarPrato";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/cardapio" element={<Cardapio />} />
      <Route path="/sobre" element={<SobreNos />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />

      {/* ADMIN */}
      <Route path="/adm/contato" element={<ContatoAdm />} />
      <Route path="/adm/adicionar" element={<AdicionarAdm />} />
      <Route path="/adm/Cardapio" element={<CardapioAdm />} />
      <Route path="/adm/EditarLinkCardapio" element={<EditarLinkCardapio />} />
      <Route path="/adm/EditarCardapio" element={<EditarCardapio />} />
      <Route path="/adm/EditarPrato/:id" element={<EditarPrato />} />
      <Route path="/adm/AdicionarPrato" element={<EditarPrato />} />
    </Routes>
  );
}

export default AppRoutes;