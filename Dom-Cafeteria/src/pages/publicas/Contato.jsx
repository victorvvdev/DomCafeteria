import "./Contato.css";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

function Contato() {
  return (
    <main className="contato-container">
      <section className="contato-banner">
        <div className="banner-overlay">
          <h1>Fale Conosco</h1>
          <p>
            Tem alguma dúvida, sugestão ou deseja fazer um pedido especial? A
            Dom Cafeteria está pronta para te atender.
          </p>
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
            <span className="info-icon">
              <FaWhatsapp />
            </span>
            <div>
              <h3>WhatsApp</h3>
              <p>(85) 9 8894-3216</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">
              <FaInstagram />
            </span>
            <div>
              <h3>Instagram</h3>
              <p>@dom.cafeteria</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">
              <FaMapMarkerAlt />
            </span>
            <div>
              <h3>Localização</h3>
              <p>Fortaleza - CE</p>
            </div>
          </div>
        </div>

        <div className="contato-card">
          <h2>Horário de atendimento</h2>

          <div className="horario-item">
            <span>Segunda a Sexta</span>
            <strong>08:00 às 20:00</strong>
          </div>

          <div className="horario-item">
            <span>Sábado</span>
            <strong>08:00 às 18:00</strong>
          </div>

          <div className="horario-item">
            <span>Domingo</span>
            <strong>09:00 às 14:00</strong>
          </div>

          <a
            className="btn-whatsapp"
            href="https://wa.me/5585988943216"
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
