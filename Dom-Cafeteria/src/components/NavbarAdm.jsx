import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.svg";

function NavbarAdm() {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);

    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

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

      <div className="nav-buttons d-flex align-items-center" style={{ position: "relative" }}>
        <NavLink className="btn-custom me-2" to="/adm/inicioadm">Início</NavLink>
        <NavLink className="btn-custom me-2" to="/adm/Cardapio">Cardápio</NavLink>
        <NavLink className="btn-custom me-2" to="/adm/sobrenos">Sobre Nós</NavLink>
        <NavLink className="btn-custom me-3" to="/adm/contato">Contato</NavLink>

        <div ref={menuRef} style={{ position: "relative"}}>
          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "36px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FaCog />
          </button>

          {menuAberto && (
            <div
              style={{
                position: "absolute",
                top: "65px",
                right: "0",
                width: "230px",
                minHeight: "360px",
                backgroundColor: "#F1E5C8",
                color: "#3b2a28",
                border: "2px solid #3b2a28",
                borderRadius: "6px",
                padding: "18px 14px",
                zIndex: 999,
                boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  marginBottom: "18px",
                  borderBottom: "2px solid #3b2a28",
                  paddingBottom: "12px",
                }}
              >
                Nome Usuario
              </h3>

              <Link
                to="/adm/infospessoais"
                style={{
                  display: "block",
                  backgroundColor: "#8C5A3C",
                  border: "2px solid #8C5A3C",
                  borderRadius: "14px",
                  padding: "16px",
                  textAlign: "center",
                  color: "#ffffff",
                  textDecoration: "none",
                  marginBottom: "28px",
                  fontWeight: "600",
                }}
              >
                Informações Pessoais
              </Link>

              <Link
                to="/adm/adicionar"
                style={{
                  display: "block",
                  backgroundColor: "#8C5A3C",
                  border: "2px solid #8C5A3C",
                  borderRadius: "14px",
                  padding: "16px",
                  textAlign: "center",
                  color: "#ffffff",
                  textDecoration: "none",
                  marginBottom: "90px",
                  fontWeight: "600",
                }}
              >
                Adicionar Adm
              </Link>

              <Link
                to="/login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#3b2a28",
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                <FaSignOutAlt />
                Sair
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdm;