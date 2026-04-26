import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarAdm from "./components/NavbarAdm";
import AppRoutes from "./routes/AppRoutes";

function Layout() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const isAuthPage = path === "/login" || path === "/recuperar-senha";

  const isAdminPage = path.startsWith("/adm");

  return (
    <>
      {/* NAVBAR */}
      {!isAuthPage && !isAdminPage && <Navbar />}
      {!isAuthPage && isAdminPage && <NavbarAdm />}

      {/* ROTAS */}
      <AppRoutes />

      {/* FOOTER (só usuário) */}

      <footer className="footer-fixed">
        © {new Date().getFullYear()} Dom Cafeteria — Todos os direitos
        reservados
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
