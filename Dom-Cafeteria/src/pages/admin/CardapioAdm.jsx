import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardPrato from "../../components/CardPrato";
import { getPratos, getLinkCardapio } from "../../services/cardapioService";
import "../../styles/CardapioAdmin.css";

export default function CardapioAdm() {
  const navigate = useNavigate();
  const [pratos, setPratos] = useState([]);
  const [linkCardapio, setLinkCardapio] = useState("#");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    getPratos()
      .then((dadosPratos) => {
        if (ativo) setPratos(dadosPratos);
      })
      .catch(() => {
        if (ativo) setErro("Não foi possível carregar os pratos.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    getLinkCardapio()
      .then((dadosLink) => {
        if (ativo) setLinkCardapio(dadosLink?.link || "#");
      })
      .catch(() => {
        if (ativo) setLinkCardapio("#");
      });

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <main className="cardapio-adm-container">
      <section className="cardapio-adm-banner">
        <button className="btn-editar banner-edit" onClick={() => navigate("/adm/EditarCardapio")}>
          ✎
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
            ✎
          </button>
        </div>

        {carregando ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "var(--light)" }} role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : erro ? (
          <p className="text-center" style={{ color: "var(--light)" }}>{erro}</p>
        ) : (
          <div className="cardapio-grid">
            {pratos.map((prato) => (
              <div key={prato.id} className="cardapio-item">
                <CardPrato prato={prato} />
                <button 
                  className="btn-editar-item"
                  onClick={() => navigate(`/adm/EditarPrato/${prato.id}`)}
                >
                  ✎
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}