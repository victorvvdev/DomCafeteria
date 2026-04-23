import "./Inicio.css";

function Inicio() {
  return (
    <main className="inicio">
      <section className="inicio-apresentacao container">
        <div className="inicio-texto">
          <p className="inicio-destaque">
            Cafeteria com ambiente acolhedor e cardápio adaptado para diferentes necessidades alimentares.
          </p>

          <p className="inicio-subtitulo">
            Desde 2024 marcando corações.
          </p>

          <div className="inicio-barra"></div>

          <div className="inicio-info-bloco">
            <p className="inicio-info">
              Rua Coronel Alves Teixeira, 1578 - Fortaleza - CE
            </p>

            <p className="inicio-info">
              Segunda a Sexta: 8h às 18h
            </p>

            <p className="inicio-info">
              Sábado: 8h às 12h
            </p>
          </div>
        </div>

        <div className="inicio-imagem"></div>
      </section>

      <section className="inicio-faq container">
        <h3>Perguntas frequentes</h3>

        <div className="faq-item">
          <h4>Vocês têm opções sem lactose?</h4>
          <p>Sim, oferecemos diversas opções adaptadas para restrições alimentares.</p>
        </div>

        <div className="faq-item">
          <h4>O ambiente é adequado para trabalhar?</h4>
          <p>Sim, temos um espaço tranquilo e confortável para estudos e trabalho.</p>
        </div>

        <div className="faq-item">
          <h4>É possível pedir para viagem?</h4>
          <p>Sim, todos os produtos podem ser embalados para viagem.</p>
        </div>
      </section>
    </main>
  );
}

export default Inicio;