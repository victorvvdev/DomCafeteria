import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPratos, fetchLinkCardapio } from "../../services/cardapioService";
import "../../styles/EditarCardapio.css";

export default function EditarCardapio() {
  const navigate = useNavigate();
  const [pratos, setPratos] = useState([]);
  const [linkCardapio, setLinkCardapio] = useState("");
  const [selecionados, setSelecionados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([fetchPratos(), fetchLinkCardapio()])
      .then(([dadosPratos, dadosLink]) => {
        setPratos(dadosPratos);
        setLinkCardapio(dadosLink.url);
      })
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

  function handleSelecionar(id) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleRemoverSelecionados() {
    if (selecionados.length === 0) return;
    setPratos((prev) => prev.filter((p) => !selecionados.includes(p.id)));
    setSelecionados([]);
  }

  return (
    <div className="editar-cardapio-page">
      <div className="container py-4">
        <div className="editar-cardapio-topo">

          <div className="editar-cardapio-acoes">
            <button className="btn-acao-topo" onClick={() => navigate("/adm/AdicionarPrato")}>
              +
            </button>
            <button className="btn-acao-topo" onClick={handleRemoverSelecionados}>
              🗑️
            </button>
          </div>

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

        {!carregando && (
          <div className="row g-4">
            {pratos.map((prato) => (
              <div key={prato.id} className="col-12 col-sm-6 col-lg-4">
                <div className="card-prato-editar">
                  <div className="card-prato-editar-img-wrapper">
                    <img src={prato.imagem_url} alt={prato.nome} />
                    <input
                      type="checkbox"
                      className="card-checkbox"
                      checked={selecionados.includes(prato.id)}
                      onChange={() => handleSelecionar(prato.id)}
                    />
                    <button
                      className="btn-editar-card"
                      onClick={() => navigate(`/adm/EditarPrato/${prato.id}`)}
                    >
                      ✎
                    </button>
                  </div>
                  <p className="card-prato-nome">{prato.nome}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}