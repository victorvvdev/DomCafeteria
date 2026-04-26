import { useState, useEffect } from "react";
import { fetchLinkCardapio } from "../../services/cardapioService";
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
  const [linkAtual, setLinkAtual] = useState("");
  const [novoLink, setNovoLink] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    fetchLinkCardapio()
      .then((dados) => setLinkAtual(dados.url))
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

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
    setLinkAtual(novoLink);
    setNovoLink("");
    setMensagem("Link alterado com sucesso.");
  }

  function handleRemover() {
    if (!linkAtual) {
      setMensagem("Não existe um link atual para remover.");
      return;
    }
    setLinkAtual("");
    setMensagem("Link removido com sucesso.");
  }

  return (
    <div className="editar-link-page">
      <div className="container py-4">
        <div className="editar-link-form">

          <input
            className="editar-link-input"
            type="text"
            placeholder={carregando ? "Carregando..." : `Link atual: ${linkAtual || "nenhum"}`}
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
              Alterar
            </button>
            <button className="btn-custom" onClick={handleRemover}>
              Remover
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}