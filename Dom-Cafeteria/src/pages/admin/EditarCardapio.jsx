import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPratos, deletePrato, getLinkCardapio } from "../../services/cardapioService";
import { base64ParaSrc } from "../../utils/imageDisplay";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../../styles/EditarCardapio.css";

export default function EditarCardapio() {
  const navigate = useNavigate();
  const [pratos, setPratosState] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [linkCardapio, setLinkCardapio] = useState("#");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    Promise.all([getPratos(), getLinkCardapio()])
      .then(([dadosPratos, dadosLink]) => {
        setPratosState(dadosPratos);
        setLinkCardapio(dadosLink?.link || "#");
      })
      .catch(() => setErro("Não foi possível carregar os dados."))
      .finally(() => setCarregando(false));
  }, []);

  function handleSelecionar(id) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleRemoverSelecionados() {
    if (selecionados.length === 0) return;
    try {
      await Promise.all(selecionados.map((id) => deletePrato(id)));
      setPratosState((prev) => prev.filter((p) => !selecionados.includes(p.idPrato)));
      setSelecionados([]);
    } catch {
      setErro("Erro ao remover pratos.");
    }
  }

  return (
    <main className="editar-cardapio-container">
      <section className="editar-cardapio-banner">
        <div className="banner-overlay">
          <h1>Editar Cardápio</h1>
          <p>Gerencie os pratos do seu cardápio.</p>
        </div>
      </section>

      <section className="editar-cardapio-content">
        <div className="editar-cardapio-topo">
          <div className="editar-cardapio-acoes">
            <button className="btn-acao-topo" onClick={() => navigate("/adm/AdicionarPrato")}>
              <FaPlus />
            </button>
            <button className="btn-acao-topo" onClick={handleRemoverSelecionados}>
              <FaTrash />
            </button>
          </div>

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

        {carregando && (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "var(--light)" }} role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}

        {erro && <p className="text-center" style={{ color: "var(--light)" }}>{erro}</p>}

        {!carregando && !erro && (
          <div className="editar-cardapio-grid">
            {pratos.map((prato) => (
              <div key={prato.idPrato} className="card-prato-editar">
                <div className="card-prato-editar-img-wrapper">
                  {base64ParaSrc(prato.foto_url) ? (
                    <img src={base64ParaSrc(prato.foto_url)} alt={prato.nome} />
                  ) : (
                    <span style={{ color: "var(--light)", opacity: 0.5, fontSize: "14px" }}>imagem aqui...</span>
                  )}
                  <input
                    type="checkbox"
                    className="card-checkbox"
                    checked={selecionados.includes(prato.idPrato)}
                    onChange={() => handleSelecionar(prato.idPrato)}
                  />
                  <button
                    className="btn-editar-card"
                    onClick={() => navigate(`/adm/EditarPrato/${prato.idPrato}`)}
                  >
                    ✎
                  </button>
                </div>
                <p className="card-prato-nome">{prato.nome}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}