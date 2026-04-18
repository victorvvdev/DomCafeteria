import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Páginas
function Inicio() {
  return (
    <div>
      <h1>Dom Cafeteria</h1>
      <p>Bem-vindo à melhor cafeteria!</p>
    </div>
  );
}

function Cardapio() {
  return (
    <div>
      <h1>Cardápio</h1>
      <ul className="list-group">
        <li className="list-group-item">Café Expresso</li>
        <li className="list-group-item">Cappuccino</li>
        <li className="list-group-item">Latte</li>
      </ul>
    </div>
  );
}

function SobreNos() {
  return (
    <div>
      <h1>Sobre Nós</h1>
      <p>Somos apaixonados por café</p>
    </div>
  );
}

function Contato() {
  return (
    <div>
      <h1>Contato</h1>
      <p>Entre em contato conosco!</p>
    </div>
  );
}

// Navbar
export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-custom d-flex justify-content-between align-items-center">

        <div className="d-flex align-items-center nav-logo">
          <img
            src="logo.svg"
            alt="Logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="nav-buttons">
          <Link className="btn-custom me-2" to="/">Início</Link>
          <Link className="btn-custom me-2" to="/cardapio">Cardápio</Link>
          <Link className="btn-custom me-2" to="/sobre">Sobre Nós</Link>
          <Link className="btn-custom" to="/contato">Contato</Link>
        </div>

      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/sobre" element={<SobreNos />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </div>

      <footer className="footer-fixed">
        © {new Date().getFullYear()} Dom Cafeteria — Todos os direitos reservados
      </footer>
    </BrowserRouter>
  );
}