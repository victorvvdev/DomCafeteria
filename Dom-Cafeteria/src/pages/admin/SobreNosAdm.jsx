import { useEffect, useState } from "react";
import "./SobreNosAdm.css";
import { getHistoria, updateHistoria } from "../../services/historiaService";

function SobreNosAdm() {
  const [editing, setEditing] = useState(null);
  const [historia, setHistoria] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [alertaSucesso, setAlertaSucesso] = useState(false);
  const [alertaErro, setAlertaErro] = useState(false);

  const [cardsEspaco, setCardsEspaco] = useState([
    {
      titulo: "Ambiente aconchegante",
      descricao: "Um espaço elegante e confortável para aproveitar cada momento.",
      imagem: "",
    },
    {
      titulo: "Detalhes especiais",
      descricao: "Um ambiente planejado para unir charme, conforto e identidade.",
      imagem: "",
    },
    {
      titulo: "Experiência única",
      descricao: "Um lugar pensado para tornar cada visita mais marcante.",
      imagem: "",
    },
  ]);

  const alterarImagem = (index, arquivo) => {
  const leitor = new FileReader();

  leitor.onloadend = () => {
    const novosCards = [...cardsEspaco];
    novosCards[index].imagem = leitor.result;
    setCardsEspaco(novosCards);
  };

  if (arquivo) {
    leitor.readAsDataURL(arquivo);
  }
};

  useEffect(() => {
    async function carregarHistoria() {
      try {
        const dados = await getHistoria();
        if (dados && dados.texto) {
          setHistoria(dados.texto);
        }
      } catch (error) {
        console.error(error);
      }
    }

    carregarHistoria();
  }, []);

  const handleEditClick = (campo) => {
    setEditing(campo);
  };

  const gatilhoConfirmacao = (e) => {
    if (e) e.preventDefault();
    setMostrarModal(true);
  };

  const confirmarSalvamento = async () => {
    try {
      if (editing === "historia") {
        await updateHistoria({
          texto: historia,
        });
      }

      if (editing === "espaco") {
        console.log("Cards do espaço atualizados:", cardsEspaco);
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

  const cancelarEdicao = () => {
    setMostrarModal(false);
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
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        alterarImagem(index, e.target.files[0])
                      }
                    />

                    <input
                      type="text"
                      value={card.titulo}
                      onChange={(e) => {
                        const novosCards = [...cardsEspaco];
                        novosCards[index].titulo = e.target.value;
                        setCardsEspaco(novosCards);
                      }}
                      className="adm-campo-edicao"
                    />

                    <textarea
                      value={card.descricao}
                      onChange={(e) => {
                        const novosCards = [...cardsEspaco];
                        novosCards[index].descricao = e.target.value;
                        setCardsEspaco(novosCards);
                      }}
                      className="adm-campo-edicao"
                    />
                  </>
                ) : (
                  <>
                    {card.imagem ? (
                      <img
                        src={card.imagem}
                        alt={card.titulo}
                        className="adm-card-img"
                      />
                    ) : (
                      <div className="adm-sem-imagem">
                        Sem imagem
                      </div>
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