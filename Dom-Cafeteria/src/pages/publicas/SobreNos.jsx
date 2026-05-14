import { useEffect, useState } from "react";
import "./SobreNos.css";
import { getHistoria } from "../../services/historiaService";

function SobreNos() {
  const [historia, setHistoria] = useState("");

  useEffect(() => {
    async function carregarHistoria() {
      try {
        const dados = await getHistoria();

        if (dados && dados.texto) {
          setHistoria(dados.texto);
        }
      } catch (error) {
        console.error("Erro ao carregar história:", error);
      }
    }

    carregarHistoria();
  }, []);

  return (
    <main className="sobre">
      <section className="sobre-topo">
        <div className="sobre-topo-texto">
          <h1>Uma história feita com amor, família e cuidado</h1>

          <p>
            Conheça a trajetória da Dom Divino e da Dom Cafeteria,
            construída com afeto, dedicação e o desejo de acolher bem
            em cada detalhe.
          </p>
        </div>
      </section>

      <section className="sobre-historia">
        <div className="sobre-historia-texto">
          <h2>Nossa história</h2>

          {historia ? (
            <div
              className="historia-formatada"
              dangerouslySetInnerHTML={{ __html: historia }}
            />
          ) : (
            <p>Nenhuma história cadastrada.</p>
          )}
        </div>
      </section>

      <section className="sobre-espaco">
        <div className="sobre-espaco-conteudo">
          <div className="sobre-espaco-topo">
            <h2>Nosso espaço</h2>

            <p>
              Enquanto as fotos finais não são adicionadas,
              você já pode deixar a estrutura visual pronta
              com placeholders elegantes.
            </p>
          </div>

          <div className="sobre-cards">
            <article className="sobre-card">
              <div className="placeholder-img">
                Imagem do ambiente
              </div>

              <div className="sobre-card-info">
                <h3>Ambiente aconchegante</h3>

                <p>
                  Um espaço elegante e confortável para
                  aproveitar cada momento.
                </p>
              </div>
            </article>

            <article className="sobre-card">
              <div className="placeholder-img">
                Imagem da cafeteria
              </div>

              <div className="sobre-card-info">
                <h3>Detalhes especiais</h3>

                <p>
                  Um ambiente planejado para unir charme,
                  conforto e identidade.
                </p>
              </div>
            </article>

            <article className="sobre-card">
              <div className="placeholder-img">
                Imagem do espaço premium
              </div>

              <div className="sobre-card-info">
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

export default SobreNos;