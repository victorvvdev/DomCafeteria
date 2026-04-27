import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPratos } from "../../services/cardapioService";
import "../../styles/EditarPrato.css";

export default function EditarPrato() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputFotoRef = useRef(null);
  const isEdicao = !!id;

  const [nome, setNome] = useState("");
  const [preview, setPreview] = useState(null);
  const [carregando, setCarregando] = useState(isEdicao);

  useEffect(() => {
    if (!isEdicao) return;
    fetchPratos()
      .then((pratos) => {
        const prato = pratos.find((p) => String(p.id) === String(id));
        if (prato) {
          setNome(prato.nome);
          setPreview(prato.imagem_url);
        }
      })
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, [id]);

  function handleFotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  function handleSalvar() {
    navigate(-1);
  }

  function handleCancelar() {
    navigate(-1);
  }

  if (carregando) {
    return (
      <div className="editar-prato-page">
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: "var(--creme)" }} role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editar-prato-page">
      <input
        ref={inputFotoRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFotoChange}
      />

      <div className="container py-4">
        <div className="editar-prato-content">

          <div className="editar-prato-foto-wrapper">
            {preview ? (
              <img src={preview} alt="foto do prato" />
            ) : (
              <span className="editar-prato-foto-placeholder">foto do prato...</span>
            )}
            <button className="btn-editar-foto" onClick={() => inputFotoRef.current.click()}>
              ✎
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
            <button className="btn-custom" onClick={handleSalvar}>
              Salvar
            </button>
            <button className="btn-custom" onClick={handleCancelar}>
              Cancelar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}