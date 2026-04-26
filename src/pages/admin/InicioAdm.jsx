import { useState } from "react";
import "../admin/InicioAdm.css";

function InicioAdm() {
  const [editing, setEditing] = useState(null);
  const [textValues, setTextValues] = useState(() => {
    const savedData = localStorage.getItem("dadosInicio");
    return savedData ? JSON.parse(savedData) : {
      destaque: "Cafeteria com ambiente acolhedor e cardápio adaptado para diferentes necessidades alimentares.",
      subtitulo: "Desde 2024 marcando corações.",
      endereco: "Rua Coronel Alves Teixeira, 1578 - Fortaleza - CE",
      horarioSegSex: "Segunda a Sexta: 8h às 18h",
      horarioSabado: "Sábado: 8h às 12h",
      imagemUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      faqs: [
        { pergunta: "Vocês têm opções sem lactose?", resposta: "Sim, oferecemos diversas opções adaptadas para restrições alimentares." },
        { pergunta: "O ambiente é adequado para trabalhar?", resposta: "Sim, temos um espaço tranquilo e confortável para estudos e trabalho." },
        { pergunta: "É possível pedir para viagem?", resposta: "Sim, todos os produtos podem ser embalados para viagem." },
      ],
    };
  });

  const handleEditClick = (field) => setEditing(field);

  const handleConfirmClick = () => {
    setEditing(null);
    localStorage.setItem("dadosInicio", JSON.stringify(textValues));
  };

  const handleTextChange = (event, field) => {
    const { value } = event.target;
    setTextValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...textValues.faqs];
    updatedFaqs[index][field] = value;
    setTextValues((prev) => ({ ...prev, faqs: updatedFaqs }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTextValues((prev) => ({ ...prev, imagemUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="inicio">
      <section className="inicio-apresentacao container">
        <div className="inicio-texto">
          <button 
            className={editing === "texto" ? "btn-acao-confirmar" : "btn-acao-editar"} 
            onClick={editing === "texto" ? handleConfirmClick : () => handleEditClick("texto")}
          >
            {editing === "texto" ? "✓" : "✎"}
          </button>

          <div className="inicio-destaque-container">
            {editing === "texto" ? (
              <textarea
                className="inicio-destaque-textarea"
                value={textValues.destaque}
                onChange={(e) => handleTextChange(e, "destaque")}
              />
            ) : (
              <p className="inicio-destaque">{textValues.destaque}</p>
            )}
          </div>

          <div className="inicio-subtitulo">
            {editing === "texto" ? (
              <textarea
                className="inicio-destaque-textarea"
                value={textValues.subtitulo}
                onChange={(e) => handleTextChange(e, "subtitulo")}
              />
            ) : (
              <p>{textValues.subtitulo}</p>
            )}
          </div>

          <div className="inicio-barra"></div>

          <div className="inicio-info-bloco">
            {["endereco", "horarioSegSex", "horarioSabado"].map((field) => (
              <div key={field} style={{ width: "100%" }}>
                {editing === "texto" ? (
                  <textarea
                    className="inicio-info-textarea"
                    value={textValues[field]}
                    onChange={(e) => handleTextChange(e, field)}
                  />
                ) : (
                  <p className="inicio-info">{textValues[field]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="inicio-imagem">
          <button 
            className={editing === "imagem" ? "btn-acao-confirmar" : "btn-acao-editar"} 
            onClick={editing === "imagem" ? handleConfirmClick : () => handleEditClick("imagem")}
          >
            {editing === "imagem" ? "✓" : "✎"}
          </button>

          {editing === "imagem" ? (
            <div className="upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          ) : (
            <img src={textValues.imagemUrl} alt="Cafeteria" />
          )}
        </div>
      </section>

      <section className="inicio-faq container">
        <h3>Perguntas Frequentes</h3>
        {textValues.faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <button 
              className={editing === `faq-${index}` ? "btn-acao-confirmar" : "btn-acao-editar"} 
              onClick={editing === `faq-${index}` ? handleConfirmClick : () => handleEditClick(`faq-${index}`)}
            >
              {editing === `faq-${index}` ? "✓" : "✎"}
            </button>

            <div className="faq-header">
              {editing === `faq-${index}` ? (
                <textarea
                  className="inicio-info-textarea"
                  value={faq.pergunta}
                  onChange={(e) => handleFaqChange(index, "pergunta", e.target.value)}
                />
              ) : (
                <h4>{faq.pergunta}</h4>
              )}
            </div>
            <div className="faq-corpo">
              {editing === `faq-${index}` ? (
                <textarea
                  className="inicio-info-textarea"
                  value={faq.resposta}
                  onChange={(e) => handleFaqChange(index, "resposta", e.target.value)}
                />
              ) : (
                <p>{faq.resposta}</p>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default InicioAdm;