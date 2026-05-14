import { useEffect, useState } from "react";
import "./SobreNosAdm.css";
import { getHistoria, updateHistoria } from "../../services/historiaService";

function SobreNosAdm() {
  const [editing, setEditing] = useState(null);
  const [historia, setHistoria] = useState("");

  useEffect(() => {
    async function carregarHistoria() {
      const dados = await getHistoria();

      if (dados && dados.texto) {
        setHistoria(dados.texto);
      }
    }

    carregarHistoria();
  }, []);

  const handleEditClick = (campo) => {
    setEditing(campo);
  };

  const handleConfirmClick = async () => {
    if (editing === "historia") {
      await updateHistoria({
        texto: historia,
      });

      alert("História atualizada com sucesso!");
    }

    setEditing(null);
  };

  return (
    <main className="adm-sobre-page">
      <section className="adm-sobre-topo">
        <div className="adm-sobre-topo-texto">
          <h1>Uma história feita com amor, família e cuidado</h1>

          <p>
            Conheça a trajetória da Dom Divino e da Dom Cafeteria,
            construída com afeto, dedicação e o desejo de acolher
            bem em cada detalhe.
          </p>
        </div>
      </section>

      <section className="adm-sobre-historia">
        <div className="adm-sobre-historia-texto">
          <div className="sobre-adm-titulo">
            <h2>Nossa história</h2>

            <button
              className={
                editing === "historia"
                  ? "btn-acao-confirmar"
                  : "btn-acao-editar"
              }
              onClick={
                editing === "historia"
                  ? handleConfirmClick
                  : () => handleEditClick("historia")
              }
            >
              {editing === "historia" ? "✓" : "✎"}
            </button>
          </div>

          {editing === "historia" ? (
            <textarea
              value={historia}
              onChange={(e) => setHistoria(e.target.value)}
              rows="16"
              className="adm-campo-edicao-historia"
            />
          ) : (
            <div
              className="adm-historia-formatada"
              dangerouslySetInnerHTML={{
                __html:
                  historia || "<p>Nenhuma história cadastrada.</p>",
              }}
            />
          )}
        </div>
      </section>

      <section className="adm-sobre-espaco">
        <div className="adm-sobre-espaco-conteudo">
          <div className="adm-sobre-espaco-topo">
            <div className="sobre-adm-titulo">
              <h2>Nosso espaço</h2>

              <button
                className={
                  editing === "espaco"
                    ? "btn-acao-confirmar"
                    : "btn-acao-editar"
                }
                onClick={
                  editing === "espaco"
                    ? handleConfirmClick
                    : () => handleEditClick("espaco")
                }
              >
                {editing === "espaco" ? "✓" : "✎"}
              </button>
            </div>

            <p>
              Enquanto as fotos finais não são adicionadas,
              você já pode deixar a estrutura visual pronta
              com placeholders elegantes.
            </p>
          </div>

          <div className="adm-sobre-cards">
            <article className="adm-sobre-card">
              <div className="adm-placeholder-img">
                Imagem do ambiente
              </div>

              <div className="adm-sobre-card-info">
                <h3>Ambiente aconchegante</h3>

                <p>
                  Um espaço elegante e confortável para
                  aproveitar cada momento.
                </p>
              </div>
            </article>

            <article className="adm-sobre-card">
              <div className="adm-placeholder-img">
                Imagem da cafeteria
              </div>

              <div className="adm-sobre-card-info">
                <h3>Detalhes especiais</h3>

                <p>
                  Um ambiente planejado para unir charme,
                  conforto e identidade.
                </p>
              </div>
            </article>

            <article className="adm-sobre-card">
              <div className="adm-placeholder-img">
                Imagem do espaço premium
              </div>

              <div className="adm-sobre-card-info">
                <h3>Experiência única</h3>

                <p>
                  Um lugar pensado para tornar cada visita
                  mais marcante.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SobreNosAdm;