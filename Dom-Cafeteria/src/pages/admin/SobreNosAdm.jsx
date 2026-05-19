import { useEffect, useState, useRef } from "react";
import "./SobreNosAdm.css";
import { getHistoria, updateHistoria } from "../../services/historiaService";
import { getEspacos, createEspaco, updateEspaco } from "../../services/espacoService";
import { converterParaBase64 } from "../../utils/imageUtils";
import { base64ParaSrc } from "../../utils/imageDisplay";

const CARDS_PADRAO = [
  { titulo: "Ambiente aconchegante", descricao: "Um espaço elegante e confortável para aproveitar cada momento.", foto_url: "" },
  { titulo: "Detalhes especiais", descricao: "Um ambiente planejado para unir charme, conforto e identidade.", foto_url: "" },
  { titulo: "Experiência única", descricao: "Um lugar pensado para tornar cada visita mais marcante.", foto_url: "" },
];

function SobreNosAdm() {
  const [editing, setEditing] = useState(null);
  const [historia, setHistoria] = useState("");
  const [cardsEspaco, setCardsEspaco] = useState(CARDS_PADRAO);
  const [idsEspaco, setIdsEspaco] = useState([null, null, null]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alertaSucesso, setAlertaSucesso] = useState(false);
  const [alertaErro, setAlertaErro] = useState(false);
  const inputFotoRefs = useRef({});

  useEffect(() => {
    async function carregar() {
      try {
        const [dadosHistoria, dadosEspacos] = await Promise.all([
          getHistoria(),
          getEspacos(),
        ]);
        if (dadosHistoria?.texto) setHistoria(dadosHistoria.texto);
        if (Array.isArray(dadosEspacos) && dadosEspacos.length > 0) {
          setIdsEspaco(CARDS_PADRAO.map((_, i) => dadosEspacos[i]?.idEspaco || null));
          setCardsEspaco(
            CARDS_PADRAO.map((padrao, i) => ({
              titulo: dadosEspacos[i]?.titulo || padrao.titulo,
              descricao: dadosEspacos[i]?.descricao || padrao.descricao,
              foto_url: dadosEspacos[i]?.foto_url || padrao.foto_url,
            }))
          );
        }
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
      if (editing === "historia") {
        await updateHistoria(historia);
      }

      if (editing === "espaco") {
        const novosIds = [...idsEspaco];
        await Promise.all(
          cardsEspaco.map(async (card, i) => {
            if (novosIds[i]) {
              await updateEspaco(novosIds[i], card.foto_url, card.titulo, card.descricao);
            } else {
              const criado = await createEspaco(card.foto_url, card.titulo, card.descricao);
              novosIds[i] = criado.idEspaco;
            }
          })
        );
        setIdsEspaco(novosIds);
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

  const alterarCampo = (index, campo, valor) => {
    const novos = [...cardsEspaco];
    novos[index] = { ...novos[index], [campo]: valor };
    setCardsEspaco(novos);
  };

  const alterarImagem = async (index, arquivo) => {
    if (!arquivo) return;
    try {
      const { base64 } = await converterParaBase64(arquivo);
      alterarCampo(index, "foto_url", base64);
    } catch {
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 4000);
    }
  };

  return (
    <main className="adm-sobre-page">
      <section className="adm-sobre-topo">
        <div className="adm-sobre-topo-texto">
          <h1>Uma história feita com amor, família e cuidado</h1>
          <p>
            Conheça a trajetória da Dom Divino e da Dom Cafeteria,
            construída com afeto, dedicação e o desejo de acolher
            bem in cada detalhe.
          </p>
        </div>
      </section>

      <section className="adm-sobre-historia">
        <div className="adm-sobre-historia-texto">
          <div className="sobre-adm-titulo">
            <h2>Nossa história</h2>
            <button
              className={editing === "historia" ? "btn-sobre-confirmar" : "btn-sobre-editar"}
              onClick={editing === "historia" ? gatilhoConfirmacao : () => handleEditClick("historia")}
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
                __html: historia || "<p>Nenhuma história cadastrada.</p>",
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
                className={editing === "espaco" ? "btn-sobre-confirmar" : "btn-sobre-editar"}
                onClick={editing === "espaco" ? gatilhoConfirmacao : () => handleEditClick("espaco")}
              >
                {editing === "espaco" ? "✓" : "✎"}
              </button>
            </div>
          </div>

          <div className="adm-sobre-cards">
            {cardsEspaco.map((card, index) => (
              <article className="adm-sobre-card" key={index}>
                {editing === "espaco" ? (
                  <>
                    <input
                      ref={(el) => (inputFotoRefs.current[index] = el)}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => alterarImagem(index, e.target.files[0])}
                    />
                    <button
                      className="btn-editar-foto-espaco"
                      onClick={() => inputFotoRefs.current[index]?.click()}
                    >
                      ✎ Foto
                    </button>
                    {card.foto_url && (
                      <img
                        src={base64ParaSrc(card.foto_url)}
                        alt={card.titulo}
                        className="adm-card-img"
                      />
                    )}
                    <input
                      type="text"
                      value={card.titulo}
                      onChange={(e) => alterarCampo(index, "titulo", e.target.value)}
                      className="adm-campo-edicao"
                    />
                    <textarea
                      value={card.descricao}
                      onChange={(e) => alterarCampo(index, "descricao", e.target.value)}
                      className="adm-campo-edicao"
                    />
                  </>
                ) : (
                  <>
                    {card.foto_url ? (
                      <img
                        src={base64ParaSrc(card.foto_url)}
                        alt={card.titulo}
                        className="adm-card-img"
                      />
                    ) : (
                      <div className="adm-sem-imagem">Sem imagem</div>
                    )}
                    <div className="adm-sobre-card-info">
                      <h3>{card.titulo}</h3>
                      <p>{card.descricao}</p>
                    </div>
                  </>
                )}
              </article>
            ))}
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

export default SobreNosAdm;