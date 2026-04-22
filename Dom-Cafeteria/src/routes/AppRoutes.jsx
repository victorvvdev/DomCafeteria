import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Cardapio from "../pages/Cardapio";
import SobreNos from "../pages/SobreNos";
import Contato from "../pages/Contato";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/cardapio" element={<Cardapio />} />
      <Route path="/sobre" element={<SobreNos />} />
      <Route path="/contato" element={<Contato />} />
    </Routes>
  );
}

export default AppRoutes;