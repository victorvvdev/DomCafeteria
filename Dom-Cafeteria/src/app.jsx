import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function Layout() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const hideLayout =
    path === "/login" || path === "/recuperar-senha";

  return (
    <>
      {!hideLayout && <Navbar />}

      <AppRoutes />

      {!hideLayout && (
        <footer className="footer-fixed">
          © {new Date().getFullYear()} Dom Cafeteria — Todos os direitos reservados
        </footer>
      )}
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