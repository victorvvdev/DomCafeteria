import "./AdicionarAdm.css";

function AdicionarAdm() {
  return (
    <main className="adicionar-adm-page">
      <section className="adicionar-adm-wrapper">
        <div className="adicionar-adm-card">
          <div className="adicionar-adm-top">
            <h2 className="adicionar-adm-title">Cadastre Novo Adm</h2>
          </div>

          <div className="adicionar-adm-body">
            <form className="adicionar-adm-form">
              
              <div className="adicionar-adm-field">
                <label>Nome Completo</label>
                <input type="text" placeholder="Digite o nome completo" required className="adicionar-adm-input" />
              </div>

              <div className="adicionar-adm-field">
                <label>Telefone</label>
                <input type="tel" placeholder="Digite o telefone" required className="adicionar-adm-input" />
              </div>

              <div className="adicionar-adm-field">
                <label>Email</label>
                <input type="email" placeholder="Digite o email" required className="adicionar-adm-input" />
              </div>

              <div className="adicionar-adm-field">
                <label>Senha</label>
                <input type="password" placeholder="Digite a senha" required className="adicionar-adm-input" />
              </div>

              <button type="submit" className="btn-confirmar-pessoal">
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdicionarAdm;