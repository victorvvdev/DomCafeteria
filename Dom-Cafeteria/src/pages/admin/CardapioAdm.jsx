import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardPrato from "../../components/CardPrato";
import { fetchPratos, fetchLinkCardapio } from "../../services/cardapioService";
import "../../styles/CardapioAdmin.css";

export default function CardapioAdm() {
  const navigate = useNavigate();
  const [pratos, setPratos] = useState([]);
  const [linkCardapio, setLinkCardapio] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    Promise.all([fetchPratos(), fetchLinkCardapio()])
      .then(([dadosPratos, dadosLink]) => {
        setPratos(dadosPratos);
        setLinkCardapio(dadosLink.url);
      })
      .catch(() => setErro("Não foi possível carregar os dados."))
      .finally(() => setCarregando(false));
  }, []);

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
    </div>
  );
}