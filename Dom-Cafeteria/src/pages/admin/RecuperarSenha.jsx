import { useState } from "react";
import "./RecuperarSenha.css";
import { Link } from "react-router-dom";
import { recuperarSenha } from "../../services/authService";

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setSucesso(false);
    setCarregando(true);
    try {
      await recuperarSenha(email);
      setSucesso(true);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

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
            <form className="recuperar-form" onSubmit={handleSubmit}>
              <div className="recuperar-field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {erro && <p className="recuperar-erro">{erro}</p>}
              {sucesso && (
                <p className="recuperar-sucesso">
                  Email encontrado. Entre em contato com o administrador para redefinir sua senha.
                </p>
              )}
              <button type="submit" className="recuperar-button" disabled={carregando}>
                {carregando ? "Verificando..." : "Confirmar"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RecuperarSenha;