import { useState } from "react";
import CardPrato from "../../components/CardPrato";
import { getPratos, getLinkCardapio } from "../../services/cardapioService";

export default function Cardapio() {
  const [pratos] = useState(getPratos);
  const linkCardapio = getLinkCardapio();

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <a
          href={linkCardapio}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-custom"
          style={{ padding: "8px 28px", borderRadius: "20px", fontSize: "15px", textDecoration: "none", display: "inline-block" }}
        >
          Abrir cardápio completo
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
  );
}