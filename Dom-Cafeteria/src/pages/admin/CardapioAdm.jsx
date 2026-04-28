import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPrato from "../../components/CardPrato";
import { getPratos, getLinkCardapio } from "../../services/cardapioService";
import "../../styles/CardapioAdmin.css";

export default function CardapioAdm() {
  const navigate = useNavigate();
  const [pratos] = useState(getPratos);
  const linkCardapio = getLinkCardapio();

  return (
    <div className="cardapio-page">
      <div className="container py-4">
        <div className="cardapio-topo">
          <button className="btn-editar-topo" onClick={() => navigate("/adm/EditarCardapio")}>
            ✎
          </button>
          <a
            href={linkCardapio}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cardapio-completo"
          >
            Abrir cardápio completo
            <button
              className="btn-editar-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/adm/EditarLinkCardapio");
              }}
            >
              ✎
            </button>
          </a>
        </div>

        <div className="row g-4">
          {pratos.map((prato) => (
            <div key={prato.id} className="col-12 col-sm-6 col-lg-4">
              <CardPrato prato={prato} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}