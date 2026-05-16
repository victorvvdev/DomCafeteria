import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPratos, createPrato, updatePrato } from "../../services/cardapioService";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import "../../styles/EditarPrato.css";

export default function EditarPrato() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputFotoRef = useRef(null);
  const isEdicao = !!id;

  const [nome, setNome] = useState("");
  const [preview, setPreview] = useState(null);
  const [fotoBase64, setFotoBase64] = useState(null);
  const [carregando, setCarregando] = useState(isEdicao);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!isEdicao) return;
    getPratos()
      .then((pratos) => {
        const prato = pratos.find((p) => String(p.idPrato) === String(id));
        if (prato) {
          setNome(prato.nome);
          if (prato.foto_url) {
            setPreview(`data:image/jpeg;base64,${prato.foto_url}`);
            setFotoBase64(prato.foto_url);
          }
        }
      })
      .catch(() => setErro("Erro ao carregar prato."))
      .finally(() => setCarregando(false));
  }, [id]);

  function handleFotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setPreview(dataUrl);
      setFotoBase64(dataUrl.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }

  async function handleSalvar() {
    try {
      if (isEdicao) {
        await updatePrato(id, nome, fotoBase64);
      } else {
        await createPrato(nome, fotoBase64);
      }
      navigate(-1);
    } catch {
      setErro("Erro ao salvar prato.");
    }
  }

  function handleCancelar() {
    navigate(-1);
  }

  return (
    <main className="editar-prato-container">
      <input
        ref={inputFotoRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFotoChange}
      />
      <section className="editar-prato-banner">
        <div className="banner-overlay">
          <h1>{isEdicao ? "Editar Prato" : "Adicionar Prato"}</h1>
          <p>{isEdicao ? "Atualize as informações do prato." : "Adicione um novo prato ao cardápio."}</p>
        </div>
      </section>
      <section className="editar-prato-content">
        {carregando && (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "var(--light)" }} role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}
        {erro && <p className="text-center" style={{ color: "var(--light)" }}>{erro}</p>}
        {!carregando && (
          <div className="editar-prato-form">
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
        )}
      </section>
    </main>
  );
}