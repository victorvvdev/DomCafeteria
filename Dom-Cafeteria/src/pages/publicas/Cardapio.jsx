import { useState, useEffect } from "react";
import "../../styles/Cardapio.css";
import CardPrato from "../../components/CardPrato";
import { getPratos, getLinkCardapio } from "../../services/cardapioService";

export default function Cardapio() {
  const [pratos, setPratos] = useState([]);
  const [linkCardapio, setLinkCardapio] = useState("#");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    Promise.all([getPratos(), getLinkCardapio()])
      .then(([dadosPratos, dadosLink]) => {
        setPratos(dadosPratos);
        setLinkCardapio(dadosLink?.link || "#");
      })
      .catch(() => setErro("Não foi possível carregar o cardápio."))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <main className="cardapio-container">
      <section className="cardapio-banner">
        <div className="banner-overlay">
          <h1>Nosso Cardápio</h1>
          <p>Descubra nossas delícias preparadas com ingredientes frescos e muito carinho.</p>
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

      {carregando && (
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: "var(--light)" }} role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {erro && <p className="text-center" style={{ color: "var(--light)" }}>{erro}</p>}

      {!carregando && !erro && (
        <div className="cardapio-grid">
          {pratos.map((prato) => (
            <div key={prato.idPrato}>
              <CardPrato prato={{ ...prato, id: prato.idPrato, imagem_url: prato.foto_url }} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}