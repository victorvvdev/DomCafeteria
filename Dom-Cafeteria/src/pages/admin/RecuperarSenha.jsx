import "./RecuperarSenha.css";
import { Link } from "react-router-dom";

function RecuperarSenha() {
  return (
    <main className="recuperar-page">
      <section className="recuperar-wrapper">
        <div className="recuperar-card">
          <div className="recuperar-voltar">
            <Link to="/login" className="voltar-link">
              ← Voltar
            </Link>
          </div>

          <div className="recuperar-top">
            <h1>Esqueceu a senha?</h1>
          </div>

          <div className="recuperar-body">
            <p className="recuperar-texto">
              Informe seu e-mail e enviaremos um link para recuperação de senha.
            </p>

            <form className="recuperar-form">
              <div className="recuperar-field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <button type="submit" className="recuperar-button">
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RecuperarSenha;