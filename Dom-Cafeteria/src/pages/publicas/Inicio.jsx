import { useState, useEffect } from "react";
import "./Inicio.css";
import { getHorarios, getContatoInfo } from "../../services/contatoService";
import { base64ParaSrc } from "../../utils/imageDisplay";

const API_URL = "https://dom-cafeteria-api.vercel.app";

function Inicio() {
  const [faqAberto, setFaqAberto] = useState(false);
  const [destaque, setDestaque] = useState("Cafeteria com ambiente acolhedor e cardápio adaptado para diferentes necessidades alimentares.");
  const [imagemBase64, setImagemBase64] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [endereco, setEndereco] = useState("Rua Coronel Alves Teixeira, 1578 - Fortaleza, CE");
  const [faqs, setFaqs] = useState([]);

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
          if (dadosInicio.texto) setDestaque(dadosInicio.texto);
          if (dadosInicio.foto) setImagemBase64(dadosInicio.foto);
        }
        if (Array.isArray(dadosHorarios)) setHorarios(dadosHorarios);
        if (dadosContato?.localizacao) setEndereco(dadosContato.localizacao);
        if (Array.isArray(dadosFaqs)) setFaqs(dadosFaqs);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    carregar();
  }, []);

  const toggleFaq = () => setFaqAberto(!faqAberto);

  return (
    <main className="inicio">
      <section className="inicio-apresentacao container">
        <div className="inicio-texto">
          <p className="inicio-destaque">{destaque}</p>
          <p className="inicio-subtitulo">Desde 2024 marcando corações.</p>
          <div className="inicio-barra"></div>
          <div className="inicio-info-bloco">
            <p className="inicio-info">{endereco}</p>
            {horarios.map((h) => (
              <p key={h.idHorario} className="inicio-info">{h.dia}: {h.horario}</p>
            ))}
          </div>
        </div>
        <div className="inicio-imagem">
          {imagemBase64 && (
            <img src={base64ParaSrc(imagemBase64)} alt="Cafeteria" />
          )}
        </div>
      </section>

      <section className={`inicio-faq container ${faqAberto ? "aberto" : "fechado"}`}>
        <div className="faq-header" onClick={toggleFaq}>
          <div className="faq-spacer"></div>
          <h3>Perguntas Frequentes</h3>
          <button className={`botao-toggle ${faqAberto ? "girar" : ""}`}>
            <span className="seta-faq"></span>
          </button>
        </div>
        <div className="faq-conteudo">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <div className="faq-item" key={faq.idDuvida}>
                <h4>{faq.pergunta}</h4>
                <p>{faq.resposta}</p>
              </div>
            ))
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Inicio;