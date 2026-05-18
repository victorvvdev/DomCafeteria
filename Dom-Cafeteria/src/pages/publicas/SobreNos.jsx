import { useEffect, useState } from "react";
import "./SobreNos.css";
import { getHistoria } from "../../services/historiaService";
import { getEspacos } from "../../services/espacoService";
import { base64ParaSrc } from "../../utils/imageDisplay";

function SobreNos() {
  const [historia, setHistoria] = useState("");
  const [espacos, setEspacos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [dadosHistoria, dadosEspacos] = await Promise.all([
          getHistoria(),
          getEspacos(),
        ]);
        if (dadosHistoria?.texto) setHistoria(dadosHistoria.texto);
        if (Array.isArray(dadosEspacos)) setEspacos(dadosEspacos);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <main className="sobre">
      <section className="sobre-banner">
        <div className="sobre-banner-texto">
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
          {carregando ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "var(--light)" }} role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : historia ? (
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
          </div>
          <div className="sobre-cards">
            {carregando ? (
              <div className="text-center py-5">
                <div className="spinner-border" style={{ color: "var(--light)" }} role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </div>
            ) : espacos.length > 0 ? (
              espacos.map((espaco) => (
                <article key={espaco.idEspaco} className="sobre-card">
                  <div className="sobre-card-img-wrapper">
                    {espaco.foto_url ? (
                      <img
                        src={base64ParaSrc(espaco.foto_url)}
                        alt={espaco.titulo}
                      />
                    ) : (
                      <div className="placeholder-img">Imagem do espaço</div>
                    )}
                  </div>
                  <div className="sobre-card-info">
                    <h3>{espaco.titulo}</h3>
                    <p>{espaco.descricao}</p>
                  </div>
                </article>
              ))
            ) : (
              <p>Nenhum espaço cadastrado.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default SobreNos;