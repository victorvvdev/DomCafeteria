import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPrato from "../../components/CardPrato";
import { getPratos, getLinkCardapio } from "../../services/cardapioService";
import { FaEdit } from "react-icons/fa";
import "../../styles/CardapioAdmin.css";

export default function CardapioAdm() {
  const navigate = useNavigate(); 
  const [pratos] = useState(getPratos());
  const linkCardapio = getLinkCardapio();

  return (
    <main className="cardapio-adm-container">
      <section className="cardapio-adm-banner">
        <button className="btn-editar banner-edit" onClick={() => navigate("/adm/EditarCardapio")}>
          <FaEdit />
        </button>

        <div className="banner-overlay">
          <h1>Gerenciar Cardápio</h1>
          <p>
            Adicione, edite ou remova os pratos do seu cardápio.
          </p>
        </div>
      </section>

      <section className="cardapio-adm-content">
        <div className="cardapio-link-area">
          <a
            href={linkCardapio}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cardapio-completo"
          >
            Abrir cardápio completo
          </a>
          <button
            className="btn-editar-link"
            onClick={() => navigate("/adm/EditarLinkCardapio")}
          >
            <FaEdit />
          </button>
        </div>

        <div className="cardapio-grid">
          {pratos.map((prato) => (
            <div key={prato.id} className="cardapio-item">
              <CardPrato prato={prato} />
              <button 
                className="btn-editar-item"
                onClick={() => navigate(`/adm/EditarPrato/${prato.id}`)}
              >
                <FaEdit />
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}