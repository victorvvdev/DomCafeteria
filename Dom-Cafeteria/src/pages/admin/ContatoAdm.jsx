import { useState, useEffect } from "react";
import "./ContatoAdm.css";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaLink } from "react-icons/fa";
import {
  getContatoHeader, updateContatoHeader,
  getContatoInfo, updateContatoInfo,
  getHorarios, updateHorario,
} from "../../services/contatoService";

function ContatoAdm() {
  const [editing, setEditing] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alertaSucesso, setAlertaSucesso] = useState(false);
  const [alertaErro, setAlertaErro] = useState(false);

  const [header, setHeader] = useState({ titulo: "Fale Conosco", subtitulo: "Tem alguma dúvida, sugestão ou deseja fazer um pedido especial? A Dom Cafeteria está pronta para te atender." });
  const [info, setInfo] = useState({ whatsapp: "(85) 9 8894-3216", whatsapp_link: "https://wa.me/5585988943216", instagram: "@dom.cafeteria", instagram_link: "https://www.instagram.com/dom.cafeteria/", localizacao: "Rua Coronel Alves Teixeira, 1578 - Fortaleza, CE" });
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const [dadosHeader, dadosInfo, dadosHorarios] = await Promise.all([
          getContatoHeader(),
          getContatoInfo(),
          getHorarios(),
        ]);
        if (dadosHeader) setHeader(dadosHeader);
        if (dadosInfo) setInfo(dadosInfo);
        if (Array.isArray(dadosHorarios) && dadosHorarios.length > 0) setHorarios(dadosHorarios);
      } catch (error) {
        console.error(error);
      }
    }
    carregar();
  }, []);

  const handleEditClick = (campo) => setEditing(campo);

  const gatilhoConfirmacao = (e) => {
    if (e) e.preventDefault();
    setMostrarModal(true);
  };

  const confirmarSalvamento = async () => {
    try {
      if (editing === "banner") {
        await updateContatoHeader(header.titulo, header.subtitulo);
      }
      if (editing === "whatsapp") {
        await updateContatoInfo(info.whatsapp, info.whatsapp_link, info.instagram, info.localizacao);
      }
      if (editing === "instagram") {
        await updateContatoInfo(info.whatsapp, info.whatsapp_link, info.instagram, info.localizacao);
      }
      if (editing === "localizacao") {
        await updateContatoInfo(info.whatsapp, info.whatsapp_link, info.instagram, info.localizacao);
      }
      if (editing === "horarios") {
        await Promise.all(horarios.map((h) => updateHorario(h.idHorario, h.dia, h.horario)));
      }
      if (editing === "whatsapp_link") {
        await updateContatoInfo(info.whatsapp, info.whatsapp_link, info.instagram, info.localizacao);
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

  const handleHorarioChange = (index, campo, valor) => {
    const novos = [...horarios];
    novos[index] = { ...novos[index], [campo]: valor };
    setHorarios(novos);
  };

  return (
    <main className="contato-adm-container">
      <section className="contato-adm-banner">
        <button
          className={`btn-editar-absoluto banner-edit ${editing === "banner" ? "btn-confirmar" : ""}`}
          onClick={editing === "banner" ? gatilhoConfirmacao : () => handleEditClick("banner")}
        >
          {editing === "banner" ? "✓" : "✎"}
        </button>
        <div className="banner-overlay">
          {editing === "banner" ? (
            <>
              <input
                className="adm-campo-edicao"
                value={header.titulo}
                onChange={(e) => setHeader({ ...header, titulo: e.target.value })}
              />
              <textarea
                className="adm-campo-edicao"
                value={header.subtitulo}
                rows={3}
                onChange={(e) => setHeader({ ...header, subtitulo: e.target.value })}
              />
            </>
          ) : (
            <>
              <h1>{header.titulo}</h1>
              <p>{header.subtitulo}</p>
            </>
          )}
        </div>
      </section>

      <section className="contato-adm-content">
        <div className="contato-adm-info">
          <h2>Entre em contato</h2>
          <p className="contato-texto">
            Será um prazer conversar com você. Escolha uma das formas abaixo
            para falar com nossa equipe.
          </p>

          <div className="info-card-adm-posicionado">
            <span className="info-icon"><FaWhatsapp /></span>
            <div>
              <h3>WhatsApp</h3>
              {editing === "whatsapp" ? (
                <input
                  className="adm-campo-edicao"
                  value={info.whatsapp}
                  onChange={(e) => setInfo({ ...info, whatsapp: e.target.value })}
                />
              ) : (
                <p>{info.whatsapp}</p>
              )}
            </div>
            <button
              className={`btn-editar-absoluto card-contato-edit ${editing === "whatsapp" ? "btn-confirmar" : ""}`}
              onClick={editing === "whatsapp" ? gatilhoConfirmacao : () => handleEditClick("whatsapp")}
            >
              {editing === "whatsapp" ? "✓" : "✎"}
            </button>
          </div>

          <div className="info-card-adm-posicionado">
            <span className="info-icon"><FaInstagram /></span>
            <div>
              <h3>Instagram</h3>
              {editing === "instagram" ? (
                <>
                  <input
                    className="adm-campo-edicao"
                    placeholder="@usuario"
                    value={info.instagram}
                    onChange={(e) => setInfo({ ...info, instagram: e.target.value })}
                  />
                  <input
                    className="adm-campo-edicao"
                    placeholder="Link do Instagram"
                    value={info.instagram_link || ""}
                    onChange={(e) => setInfo({ ...info, instagram_link: e.target.value })}
                  />
                </>
              ) : (
                <a href={info.instagram_link || `https://www.instagram.com/${info.instagram?.replace("@", "")}`} target="_blank" rel="noreferrer">
                  {info.instagram}
                </a>
              )}
            </div>
            <button
              className={`btn-editar-absoluto card-contato-edit ${editing === "instagram" ? "btn-confirmar" : ""}`}
              onClick={editing === "instagram" ? gatilhoConfirmacao : () => handleEditClick("instagram")}
            >
              {editing === "instagram" ? "✓" : "✎"}
            </button>
          </div>

          <div className="info-card-adm-posicionado">
            <span className="info-icon"><FaMapMarkerAlt /></span>
            <div>
              <h3>Localização</h3>
              {editing === "localizacao" ? (
                <input
                  className="adm-campo-edicao"
                  value={info.localizacao}
                  onChange={(e) => setInfo({ ...info, localizacao: e.target.value })}
                />
              ) : (
                <p>{info.localizacao}</p>
              )}
            </div>
            <button
              className={`btn-editar-absoluto card-contato-edit ${editing === "localizacao" ? "btn-confirmar" : ""}`}
              onClick={editing === "localizacao" ? gatilhoConfirmacao : () => handleEditClick("localizacao")}
            >
              {editing === "localizacao" ? "✓" : "✎"}
            </button>
          </div>
        </div>

        <div className="contato-adm-card">
          <div className="titulo-com-editar-absoluto">
            <h2>Horário de atendimento</h2>
            <button
              className={`btn-editar-absoluto titulo-horario-edit ${editing === "horarios" ? "btn-confirmar" : ""}`}
              onClick={editing === "horarios" ? gatilhoConfirmacao : () => handleEditClick("horarios")}
            >
              {editing === "horarios" ? "✓" : "✎"}
            </button>
          </div>

          {horarios.map((h, index) => (
            <div key={h.idHorario} className="horario-item">
              {editing === "horarios" ? (
                <>
                  <input
                    className="adm-campo-edicao"
                    value={h.dia}
                    onChange={(e) => handleHorarioChange(index, "dia", e.target.value)}
                  />
                  <input
                    className="adm-campo-edicao"
                    value={h.horario}
                    onChange={(e) => handleHorarioChange(index, "horario", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <span>{h.dia}</span>
                  <strong>{h.horario}</strong>
                </>
              )}
            </div>
          ))}

          <div className="whatsapp-link-adm">
            {editing === "whatsapp_link" ? (
              <input
                className="adm-campo-edicao"
                placeholder="Link do WhatsApp"
                value={info.whatsapp_link}
                onChange={(e) => setInfo({ ...info, whatsapp_link: e.target.value })}
              />
            ) : (
              <a className="btn-whatsapp" href={info.whatsapp_link} target="_blank" rel="noreferrer">
                Chamar no WhatsApp
              </a>
            )}
            <button
              className={`btn-editar-absoluto btn-link-posicionado ${editing === "whatsapp_link" ? "btn-confirmar" : ""}`}
              onClick={editing === "whatsapp_link" ? gatilhoConfirmacao : () => handleEditClick("whatsapp_link")}
            >
              {editing === "whatsapp_link" ? "✓" : <FaLink />}
            </button>
          </div>
        </div>
      </section>

      {mostrarModal && (
        <div className="pessoal-modal-overlay">
          <div className="pessoal-modal-content">
            <p>Deseja salvar as alterações?</p>
            <div className="pessoal-modal-actions">
              <button type="button" className="btn-modal-confirm" onClick={confirmarSalvamento}>Salvar</button>
              <button type="button" className="btn-modal-cancel" onClick={cancelarEdicao}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {alertaSucesso && <div className="pessoal-toast">Informação salva com sucesso</div>}
      {alertaErro && <div className="pessoal-toast">Não foi possível se conectar ao banco de dados</div>}
    </main>
  );
}

export default ContatoAdm;