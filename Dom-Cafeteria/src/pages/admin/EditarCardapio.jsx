import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPratos, setPratos, getLinkCardapio } from "../../services/cardapioService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../../styles/EditarCardapio.css";

export default function EditarCardapio() {
  const navigate = useNavigate();
  const [pratos, setPratosState] = useState(getPratos);
  const [selecionados, setSelecionados] = useState([]);
  const linkCardapio = getLinkCardapio();

  function handleSelecionar(id) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleRemoverSelecionados() {
    if (selecionados.length === 0) return;
    const novos = pratos.filter((p) => !selecionados.includes(p.id));
    setPratos(novos);
    setPratosState(novos);
    setSelecionados([]);
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
            <button
              className="btn-editar-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/adm/EditarLinkCardapio");
              }}
            >
              <FaEdit />
            </button>
          </a>
        </div>

        <div className="editar-cardapio-grid">
          {pratos.map((prato) => (
            <div key={prato.id} className="card-prato-editar">
              <div className="card-prato-editar-img-wrapper">
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
                  <FaEdit />
                </button>
              </div>
              <p className="card-prato-nome">{prato.nome}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}