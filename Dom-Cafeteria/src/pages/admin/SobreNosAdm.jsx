import { useState } from "react";
import "./SobreNosAdm.css";

function SobreNosAdm() {
  const [editing, setEditing] = useState(null);

  const handleEditClick = (campo) => {
    setEditing(campo);
  };

  const handleConfirmClick = () => {
    setEditing(null);
  };

  return (
    <main className="adm-sobre-page">
      <section className="adm-sobre-topo">
        <div className="adm-sobre-topo-texto">
          <h1>Uma história feita com amor, família e cuidado</h1>
          <p>
            Conheça a trajetória da Dom Divino e da Dom Cafeteria, construída
            com afeto, dedicação e o desejo de acolher bem em cada detalhe.
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

          <p>
            A história da <strong>Dom Divino</strong> começou de forma simples,
            cheia de carinho e sem grandes planos — apenas com amor.
          </p>

          <p>
            Tudo começou com <strong>Inês</strong>, que aprendeu a receita dos
            biscoitinhos dentro da própria família e passou a prepará-los para
            presentear pessoas especiais. Naquele momento, ainda não existia a
            intenção de transformar esse gesto em negócio. Era, antes de tudo,
            uma forma de demonstrar afeto.
          </p>

          <p>
            Durante a pandemia, um potinho simples de biscoitinhos decorados foi
            preparado como presente. O carinho colocado naquele gesto foi tão
            bem recebido que surgiu o incentivo para que aqueles sabores
            pudessem ser compartilhados com mais pessoas.
          </p>

          <p>
            Foi assim que nasceu a <strong>Dom Divino</strong>. Sua identidade
            carrega um significado especial: o símbolo do
            <strong> Divino Espírito Santo</strong>, segurando uma margarida,
            representa fé, amor, memória e gratidão.
          </p>

          <p>
            A partir daí, a trajetória foi sendo construída por
            <strong> Inês e Isabella</strong>, mãe e filha, com o apoio de
            familiares e amigos, preparando biscoitos, tortas e outras delícias
            sempre com muito cuidado e carinho.
          </p>

          <p>
            Com o passar do tempo, a marca conquistou clientes, reconhecimento e
            recebeu o prêmio de <strong>melhor biscoitaria de Fortaleza</strong>.
            Então, um novo capítulo começou. Ao completar quatro anos, surgiu um
            convite especial: abrir uma cafeteria dentro de uma clínica familiar
            de gastroenterologia. Em apenas quinze dias nasceu a
            <strong> Dom Cafeteria</strong>, na <strong>Clínica Progastro</strong>.
          </p>

          <p>
            Desde o início, a participação da família permaneceu como parte
            essencial dessa história. Muitos dos produtos são preparados por
            pessoas desse círculo próximo, em um trabalho construído com
            dedicação, qualidade, cuidado e procedência.
          </p>

          <p>
            Com a rotina da cafeteria, o cardápio foi sendo ampliado e adaptado
            de acordo com as necessidades dos clientes. Como nutricionista,
            <strong> Isabella</strong> acompanha de perto esse desenvolvimento,
            garantindo atenção e responsabilidade especialmente nas preparações
            voltadas para pessoas com restrições alimentares.
          </p>

          <p>
            Hoje, a <strong>Dom Cafeteria</strong> oferece uma linha saborosa
            pensada para diferentes necessidades alimentares, além de almoços
            caseiros, sopas, doces e lanches preparados com cuidado em cada
            detalhe.
          </p>

          <p>
            Mais do que servir alimentos, a <strong>Dom Divino</strong> e a
            <strong> Dom Cafeteria</strong> carregam em sua essência valores
            como <strong>família, acolhimento, cuidado e dedicação</strong>.
          </p>
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
              Enquanto as fotos finais não são adicionadas, você já pode deixar
              a estrutura visual pronta com placeholders elegantes.
            </p>
          </div>

          <div className="adm-sobre-cards">
            <article className="adm-sobre-card">
              <div className="adm-placeholder-img">Imagem do ambiente</div>

              <div className="adm-sobre-card-info">
                <h3>Ambiente aconchegante</h3>
                <p>
                  Um espaço elegante e confortável para aproveitar cada momento.
                </p>
              </div>
            </article>

            <article className="adm-sobre-card">
              <div className="adm-placeholder-img">Imagem da cafeteria</div>

              <div className="adm-sobre-card-info">
                <h3>Detalhes especiais</h3>
                <p>
                  Um ambiente planejado para unir charme, conforto e identidade.
                </p>
              </div>
            </article>

            <article className="adm-sobre-card">
              <div className="adm-placeholder-img">Imagem do espaço premium</div>

              <div className="adm-sobre-card-info">
                <h3>Experiência única</h3>
                <p>
                  Um lugar pensado para tornar cada visita mais marcante.
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