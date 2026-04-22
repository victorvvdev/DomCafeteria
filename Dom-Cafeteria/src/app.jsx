import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <AppRoutes />
      </div>

      <footer className="footer-fixed">
        © {new Date().getFullYear()} Dom Cafeteria — Todos os direitos reservados
      </footer>
    </BrowserRouter>
  );
}