import { useState, useEffect } from "react";
import CardPrato from "../../components/CardPrato";
import { fetchPratos } from "../../services/cardapioService";

const LINK_CARDAPIO = "https://SEU_LINK_EXTERNO";

export default function Cardapio() {
  const [pratos, setPratos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchPratos()
      .then(setPratos)
      .catch(() => setErro("Não foi possível carregar os pratos."))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="container py-4">

      <div className="text-center mb-4">
        <a
          href={LINK_CARDAPIO}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-custom"
          style={{ padding: "8px 28px", borderRadius: "20px", fontSize: "15px", textDecoration: "none", display: "inline-block" }}
        >
          Abrir cardápio completo
        </a>
      </div>

      {carregando && (
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: "var(--creme)" }} role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {erro && (
        <p className="text-center" style={{ color: "var(--creme)" }}>{erro}</p>
      )}

      {!carregando && !erro && (
        <div className="row g-4">
          {pratos.map((prato) => (
            <div key={prato.id} className="col-12 col-sm-6 col-lg-4">
              <CardPrato prato={prato} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}