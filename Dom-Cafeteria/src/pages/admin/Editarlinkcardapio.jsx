import { useState } from "react";
import { getLinkCardapio, setLinkCardapio } from "../../services/cardapioService";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/EditarLinkCardapio.css";

function isLinkValido(link) {
  try {
    new URL(link);
    return true;
  } catch {
    return false;
  }
}

export default function EditarLinkCardapio() {
  const [linkAtual, setLinkAtual] = useState(getLinkCardapio);
  const [novoLink, setNovoLink] = useState("");
  const [mensagem, setMensagem] = useState(null);

  function handleAlterar() {
    if (!novoLink.trim()) {
      setMensagem('O campo "Novo link" está vazio.');
      return;
    }
    if (!isLinkValido(novoLink)) {
      setMensagem("Link inválido.");
      return;
    }
    if (novoLink === linkAtual) {
      setMensagem("Os links estão iguais.");
      return;
    }
    setLinkCardapio(novoLink);
    setLinkAtual(novoLink);
    setNovoLink("");
    setMensagem("Link alterado com sucesso.");
  }

  function handleRemover() {
    if (!linkAtual || linkAtual === "#") {
      setMensagem("Não existe um link atual para remover.");
      return;
    }
    setLinkCardapio("#");
    setLinkAtual("#");
    setMensagem("Link removido com sucesso.");
  }

  return (
    <main className="editar-link-container">
      <section className="editar-link-banner">
        <div className="banner-overlay">
          <h1>Editar Link do Cardápio</h1>
          <p>Atualize o link externo do seu cardápio.</p>
        </div>
      </section>

      <section className="editar-link-content">
        <div className="editar-link-form">
          <input
            className="editar-link-input"
            type="text"
            placeholder={`Link atual: ${linkAtual === "#" ? "nenhum" : linkAtual}`}
            disabled
          />

          <input
            className="editar-link-input"
            type="text"
            placeholder="Novo link: *********"
            value={novoLink}
            onChange={(e) => setNovoLink(e.target.value)}
          />

          {mensagem && (
            <p className="editar-link-mensagem">{mensagem}</p>
          )}

          <div className="editar-link-acoes">
            <button className="btn-custom" onClick={handleAlterar}>
              <FaEdit /> Alterar
            </button>
            <button className="btn-custom" onClick={handleRemover}>
              <FaTrash /> Remover
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}