import "./ContatoAdm.css";
import NavbarAdm from "../../components/NavbarAdm";

import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaLink,
} from "react-icons/fa";

function ContatoAdm() {
  return (
    <>
      <main className="contato-adm-container">
        <section className="contato-adm-banner">
          <button className="btn-editar-absoluto banner-edit">
            ✎
          </button>

          <div className="banner-overlay">
            <h1>Fale Conosco</h1>
            <p>
              Tem alguma dúvida, sugestão ou deseja fazer um pedido especial? A
              Dom Cafeteria está pronta para te atender.
            </p>
          </div>
        </section>

        <section className="contato-adm-content">
          <div className="contato-adm-info">
            <h2>Entre em contato</h2>
            <p className="contato-texto">
              Será um prazer conversar com você. Escolha uma das formas abaixo
              para falar com nossa equipe.
            </p>

            {/* Card WhatsApp */}
            <div className="info-card-adm-posicionado">
              <span className="info-icon">
                <FaWhatsapp />
              </span>

              <div>
                <h3>WhatsApp</h3>
                <p>(85) 9 8894-3216</p>
              </div>

              <button className="btn-editar-absoluto card-contato-edit">
                ✎
              </button>
            </div>

            {/* Card Instagram */}
            <div className="info-card-adm-posicionado">
              <span className="info-icon">
                <FaInstagram />
              </span>

              <div>
                <h3>Instagram</h3>
                <p>@dom.cafeteria</p>
              </div>

              <button className="btn-editar-absoluto card-contato-edit">
                ✎
              </button>
            </div>

            {/* Card Localização */}
            <div className="info-card-adm-posicionado">
              <span className="info-icon">
                <FaMapMarkerAlt />
              </span>

              <div>
                <h3>Localização</h3>
                <p>Fortaleza - CE</p>
              </div>

              <button className="btn-editar-absoluto card-contato-edit">
                ✎
              </button>
            </div>
          </div>

          <div className="contato-adm-card">
            <div className="titulo-com-editar-absoluto">
              <h2>Horário de atendimento</h2>
              <button className="btn-editar-absoluto titulo-horario-edit">
                ✎
              </button>
            </div>

            <div className="horario-item">
              <span>Segunda a Sexta</span>
              <strong>07:30 às 18:00</strong>
            </div>

            <div className="horario-item">
              <span>Sábado</span>
              <strong>07:30 às 12:00</strong>
            </div>

            <div className="horario-item">
              <span>Domingo</span>
              <strong>Fechado</strong>
            </div>

            <div className="whatsapp-link-adm">
              <a
                className="btn-whatsapp"
                href="https://wa.me/5585988943216"
                target="_blank"
                rel="noreferrer"
              >
                Chamar no WhatsApp
              </a>

              <button className="btn-editar-absoluto btn-link-posicionado">
                <FaLink />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ContatoAdm;