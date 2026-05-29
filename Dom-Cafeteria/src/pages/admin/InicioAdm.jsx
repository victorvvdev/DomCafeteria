import { useState, useEffect, useRef } from "react";
import "../admin/InicioAdm.css";
import { getHorarios } from "../../services/contatoService";
import { getContatoInfo } from "../../services/contatoService";
import { converterParaBase64 } from "../../utils/imageUtils";
import { base64ParaSrc } from "../../utils/imageDisplay";

const API_URL = "http://localhost:3000/api";

function InicioAdm() {
  const [faqAberto, setFaqAberto] = useState(false);
  const [editing, setEditing] = useState(null);
  const [destaque, setDestaque] = useState("Cafeteria com ambiente acolhedor e cardápio adaptado para diferentes necessidades alimentares.");
  const [imagemBase64, setImagemBase64] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [endereco, setEndereco] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [idInicio, setIdInicio] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alertaSucesso, setAlertaSucesso] = useState(false);
  const [alertaErro, setAlertaErro] = useState(false);
  const inputImagemRef = useRef(null);

  useEffect(() => {
    async function carregar() {
      try {
        const [dadosInicio, dadosHorarios, dadosContato, dadosFaqs] = await Promise.all([
          fetch(`${API_URL}/inicio`).then((r) => r.json()),
          getHorarios(),
          getContatoInfo(),
          fetch(`${API_URL}/duvidas`).then((r) => r.json()),
        ]);

        if (dadosInicio) {
          setIdInicio(dadosInicio.idInicio);
          if (dadosInicio.texto) setDestaque(dadosInicio.texto);
          if (dadosInicio.foto) setImagemBase64(dadosInicio.foto);
        }
        if (Array.isArray(dadosHorarios)) setHorarios(dadosHorarios);
        if (dadosContato?.localizacao) setEndereco(dadosContato.localizacao);
        if (Array.isArray(dadosFaqs)) setFaqs(dadosFaqs);
      } catch (error) {
        console.error(error);
      }
    }
    carregar();
  }, []);

  const toggleFaq = () => setFaqAberto(!faqAberto);
  const handleEditClick = (field) => setEditing(field);
  const gatilhoConfirmacao = () => setMostrarModal(true);

  const confirmarSalvamento = async () => {
    try {
      if (editing === "texto") {
        await fetch(`${API_URL}/inicio`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto: destaque, foto: imagemBase64 || "" }),
        });
      }

      if (editing === "imagem") {
        await fetch(`${API_URL}/inicio`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ foto: imagemBase64, texto: destaque }),
        });
      }

      if (editing?.startsWith("faq-")) {
        const index = parseInt(editing.split("-")[1]);
        const faq = faqs[index];
        if (faq.idDuvida) {
          await fetch(`${API_URL}/duvidas/${faq.idDuvida}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pergunta: faq.pergunta, resposta: faq.resposta }),
          });
        } else {
          const criado = await fetch(`${API_URL}/duvidas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pergunta: faq.pergunta, resposta: faq.resposta }),
          }).then((r) => r.json());
          const novosFaqs = [...faqs];
          novosFaqs[index] = { ...novosFaqs[index], idDuvida: criado.idDuvida };
          setFaqs(novosFaqs);
        }
      }

      setEditing(null);
      setMostrarModal(false);
      setAlertaSucesso(true);
      setTimeout(() => setAlertaSucesso(false), 3000);
    } catch (error) {
      console.error(error);
      setEditing(null);
      setMostrarModal(false);
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 4000);
    }
  };

  const cancelarEdicao = () => setMostrarModal(false);

  const handleFaqChange = (index, field, value) => {
    const novos = [...faqs];
    novos[index] = { ...novos[index], [field]: value };
    setFaqs(novos);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const { base64 } = await converterParaBase64(file);
      setImagemBase64(base64);
    } catch {
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 4000);
    }
  };

  return (
    <main className="inicio">
      <section className="inicio-apresentacao container">
        <div className="inicio-texto">
          <button
            className={editing === "texto" ? "btn-acao-confirmar" : "btn-acao-editar"}
            onClick={editing === "texto" ? gatilhoConfirmacao : () => handleEditClick("texto")}
          >
            {editing === "texto" ? "✓" : "✎"}
          </button>

          <div className="form-edicao-container">
            {editing === "texto" ? (
              <div className="campos-edicao-texto">
                <textarea
                  className="inicio-destaque-textarea"
                  value={destaque}
                  onChange={(e) => setDestaque(e.target.value)}
                />
              </div>
            ) : (
              <>
                <p className="inicio-destaque">{destaque}</p>
                <p className="inicio-subtitulo-p">Desde 2024 marcando corações.</p>
                <div className="inicio-barra"></div>
                <div className="inicio-info-bloco">
                  <p className="inicio-info">{endereco}</p>
                  {horarios.map((h) => (
                    <p key={h.idHorario} className="inicio-info">{h.dia}: {h.horario}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="inicio-imagem">
          <button
            className={editing === "imagem" ? "btn-acao-confirmar" : "btn-acao-editar"}
            onClick={editing === "imagem" ? gatilhoConfirmacao : () => handleEditClick("imagem")}
          >
            {editing === "imagem" ? "✓" : "✎"}
          </button>

          {editing === "imagem" ? (
            <div className="upload-container">
              <input
                ref={inputImagemRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              {imagemBase64 && (
                <img src={base64ParaSrc(imagemBase64)} alt="Preview" />
              )}
              <button className="btn-acao-editar" onClick={() => inputImagemRef.current?.click()}>
                Escolher imagem
              </button>
            </div>
          ) : (
            imagemBase64
              ? <img src={base64ParaSrc(imagemBase64)} alt="Cafeteria" />
              : <div className="adm-sem-imagem">Sem imagem</div>
          )}
        </div>
      </section>

      <section className={`inicio-faq container ${faqAberto ? "aberto" : "fechado"}`}>
        <div className="faq-header-adm" onClick={toggleFaq}>
          <div className="faq-spacer"></div>
          <h3>Perguntas Frequentes</h3>
          <button className={`botao-toggle-adm ${faqAberto ? "girar" : ""}`}>
            <span className="seta-faq-adm"></span>
          </button>
        </div>

        <div className="faq-conteudo-adm">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={faq.idDuvida || index}>
              <button
                className={editing === `faq-${index}` ? "btn-acao-confirmar" : "btn-acao-editar"}
                onClick={(e) => {
                  e.stopPropagation();
                  editing === `faq-${index}` ? gatilhoConfirmacao() : handleEditClick(`faq-${index}`);
                }}
              >
                {editing === `faq-${index}` ? "✓" : "✎"}
              </button>

              <div className="faq-campos-container">
                {editing === `faq-${index}` ? (
                  <>
                    <textarea
                      className="inicio-info-textarea faq-edit"
                      value={faq.pergunta}
                      onChange={(e) => handleFaqChange(index, "pergunta", e.target.value)}
                    />
                    <textarea
                      className="inicio-info-textarea faq-edit-resp"
                      value={faq.resposta}
                      onChange={(e) => handleFaqChange(index, "resposta", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <div className="faq-pergunta-adm"><h4>{faq.pergunta}</h4></div>
                    <div className="faq-corpo-adm"><p>{faq.resposta}</p></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {mostrarModal && (
        <div className="pessoal-modal-overlay">
          <div className="pessoal-modal-content">
            <p>Deseja salvar as alterações?</p>
            <div className="pessoal-modal-actions">
              <button className="btn-modal-confirm" onClick={confirmarSalvamento}>Salvar</button>
              <button className="btn-modal-cancel" onClick={cancelarEdicao}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {alertaSucesso && <div className="pessoal-toast">Informação salva com sucesso</div>}
      {alertaErro && <div className="pessoal-toast toast-erro">Não foi possível se conectar ao banco de dados</div>}
    </main>
  );
}

export default InicioAdm;