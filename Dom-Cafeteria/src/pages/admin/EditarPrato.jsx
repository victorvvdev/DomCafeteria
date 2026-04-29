import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPratos, setPratos } from "../../services/cardapioService";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import "../../styles/EditarPrato.css";

export default function EditarPrato() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputFotoRef = useRef(null);
  const isEdicao = !!id;

  const [nome, setNome] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!isEdicao) return;
    const pratos = getPratos();
    const prato = pratos.find((p) => String(p.id) === String(id));
    if (prato) {
      setNome(prato.nome);
      setPreview(prato.imagem_url || null);
    }
  }, [id]);

  function handleFotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }

  function handleSalvar() {
    const pratos = getPratos();
    if (isEdicao) {
      const atualizados = pratos.map((p) =>
        String(p.id) === String(id) ? { ...p, nome, imagem_url: preview } : p
      );
      setPratos(atualizados);
    } else {
      const novoId = Date.now();
      const novo = { id: novoId, nome, imagem_url: preview };
      setPratos([...pratos, novo]);
    }
    navigate(-1);
  }

  function handleCancelar() {
    navigate(-1);
  }

  return (
    <main className="editar-prato-container">
      <section className="editar-prato-banner">
        <div className="banner-overlay">
          <h1>{isEdicao ? "Editar Prato" : "Adicionar Prato"}</h1>
          <p>{isEdicao ? "Atualize as informações do prato." : "Adicione um novo prato ao cardápio."}</p>
        </div>
      </section>

      <section className="editar-prato-content">
        <div className="editar-prato-form">
          <input
            ref={inputFotoRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFotoChange}
          />

          <div className="editar-prato-foto-wrapper">
            {preview ? (
              <img src={preview} alt="foto do prato" />
            ) : (
              <span className="editar-prato-foto-placeholder">foto do prato...</span>
            )}
            <button className="btn-editar-foto" onClick={() => inputFotoRef.current.click()}>
              <FaEdit />
            </button>
          </div>

          <div className="editar-prato-campos">
            <input
              className="editar-prato-input"
              type="text"
              placeholder="nome do prato: *****"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <div className="editar-prato-acoes">
              <button className="btn-custom" onClick={handleSalvar}>
                <FaSave /> Salvar
              </button>
              <button className="btn-custom" onClick={handleCancelar}>
                <FaTimes /> Cancelar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}