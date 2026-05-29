import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLinkCardapio,
  updateLinkCardapio,
  removeLinkCardapio,
} from "../../services/cardapioService";
import { FaEdit, FaTrash, FaTimes, FaArrowLeft } from "react-icons/fa";
import "../../styles/Editarlinkcardapio.css";

function isLinkValido(link) {
  try {
    new URL(link);
    return true;
  } catch {
    return false;
  }
}

export default function EditarLinkCardapio() {
  const [linkAtual, setLinkAtual] = useState(null);
  const [novoLink, setNovoLink] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getLinkCardapio()
      .then((dados) => setLinkAtual(dados?.link || null))
      .catch(() => setLinkAtual(null))
      .finally(() => setCarregando(false));
  }, []);

  async function handleAlterar() {
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
    try {
      await updateLinkCardapio(novoLink);
      setLinkAtual(novoLink);
      setNovoLink("");
      setMensagem("Link alterado com sucesso.");
    } catch {
      setMensagem("Erro ao alterar o link.");
    }
  }

  async function handleRemover() {
    if (!linkAtual) {
      setMensagem("Não existe um link atual para remover.");
      return;
    }
    try {
      await removeLinkCardapio();
      setLinkAtual(null);
      setMensagem("Link removido com sucesso.");
    } catch {
      setMensagem("Erro ao remover o link.");
    }
  }

  function handleCancelar() {
    setNovoLink("");
    setMensagem(null);
  }

  function handleVoltar() {
    navigate(-1);
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
            placeholder={
              carregando
                ? "Carregando..."
                : `Link atual: ${linkAtual || "nenhum"}`
            }
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
            <button className="btn-custom" onClick={handleCancelar}>
              <FaTimes /> Cancelar
            </button>
            <button className="btn-custom" onClick={handleVoltar}>
              <FaArrowLeft /> concluir
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}