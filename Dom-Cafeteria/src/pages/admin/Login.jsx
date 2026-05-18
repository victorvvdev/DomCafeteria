import { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const usuario = await login(email, senha);
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      navigate("/adm/inicioadm");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-wrapper">
        <div className="login-card">
          <div className="login-top">
            <img src={logo} alt="Logo Dom Cafeteria" className="login-logo" />
          </div>
          <div className="login-body">
            <h1 className="login-title">Área Administrativa</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login-field">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              {erro && <p className="login-erro">{erro}</p>}
              <div className="login-actions">
                <Link to="/recuperarsenha" className="login-forgot">
                  Esqueceu a senha?
                </Link>
              </div>
              <button type="submit" className="login-button" disabled={carregando}>
                {carregando ? "Entrando..." : "Confirmar"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;