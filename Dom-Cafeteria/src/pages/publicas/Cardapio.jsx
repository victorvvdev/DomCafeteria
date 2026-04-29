import { useState } from "react";
import "../../styles/Cardapio.css";
import CardPrato from "../../components/CardPrato";
import { getPratos, getLinkCardapio } from "../../services/cardapioService";

export default function Cardapio() {
  const [pratos] = useState(getPratos());
  const linkCardapio = getLinkCardapio();

  return (
    <main className="cardapio-container">
      <section className="cardapio-banner">
        <div className="banner-overlay">
          <h1>Nosso Cardápio</h1>
          <p>
            Descubra nossasdelícias preparadas com ingredientes frescos e muito carinho.
          </p>
        </div>
      </section>

      <div className="cardapio-link-container">
        <a
          href={linkCardapio}
          target="_blank"
          rel="noopener noreferrer"
          className="cardapio-link-btn"
        >
          Abrir cardápio completo
        </a>
      </div>

      <div className="cardapio-grid">
        {pratos.map((prato) => (
          <div key={prato.id}>
            <CardPrato prato={prato} />
          </div>
        ))}
      </div>
    </main>
  );
}