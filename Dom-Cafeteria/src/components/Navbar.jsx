import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Navbar() {
  return (
    <nav className="navbar navbar-custom d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center nav-logo">
        <img
          src={logo}
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
        <NavLink className="btn-custom me-2" to="/">Início</NavLink>
        <NavLink className="btn-custom me-2" to="/cardapio">Cardápio</NavLink>
        <NavLink className="btn-custom me-2" to="/sobre">Sobre Nós</NavLink>
        <NavLink className="btn-custom" to="/contato">Contato</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;