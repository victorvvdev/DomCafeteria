import { useEffect, useState } from "react";
import "./Contato.css";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { getContatoHeader, getContatoInfo, getHorarios } from "../../services/contatoService";

function Contato() {
  const [header, setHeader] = useState({ titulo: "Fale Conosco", subtitulo: "" });
  const [info, setInfo] = useState({ whatsapp: "", whatsapp_link: "#", instagram: "", localizacao: "" });
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
        if (Array.isArray(dadosHorarios)) setHorarios(dadosHorarios);
      } catch (error) {
        console.error("Erro ao carregar contato:", error);
      }
    }
    carregar();
  }, []);

  return (
    <main className="contato-container">
      <section className="contato-banner">
        <div className="banner-overlay">
          <h1>{header.titulo}</h1>
          <p>{header.subtitulo}</p>
        </div>
      </section>
      <section className="contato-content">
        <div className="contato-info">
          <h2>Entre em contato</h2>
          <p className="contato-texto">
            Será um prazer conversar com você. Escolha uma das formas abaixo
            para falar com nossa equipe.
          </p>
          <div className="info-card">
            <span className="info-icon"><FaWhatsapp /></span>
            <div>
              <h3>WhatsApp</h3>
              <p>{info.whatsapp}</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon"><FaInstagram /></span>
            <div>
              <h3>Instagram</h3>
              <a href={`https://www.instagram.com/${info.instagram.replace("@", "")}`} target="_blank" rel="noreferrer">
                {info.instagram}
              </a>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon"><FaMapMarkerAlt /></span>
            <div>
              <h3>Localização</h3>
              <p>{info.localizacao}</p>
            </div>
          </div>
        </div>
        <div className="contato-card">
          <h2>Horário de atendimento</h2>
          {horarios.length > 0 ? (
            horarios.map((h) => (
              <div key={h.idHorario} className="horario-item">
                <span>{h.dia}</span>
                <strong>{h.horario}</strong>
              </div>
            ))
          ) : (
            <p>Nenhum horário cadastrado.</p>
          )}
          <a
            className="btn-whatsapp"
            href={info.whatsapp_link || "#"}
            target="_blank"
            rel="noreferrer"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

export default Contato;