import "./Login.css";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); 
    navigate("/adm/inicioadm")
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
                <label htmlFor="usuario">Usuário</label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Digite seu usuário"
                />
              </div>

              <div className="login-field">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                />
              </div>

              <div className="login-actions">
                <Link to="/recuperarsenha" className="login-forgot">
                  Esqueceu a senha?
                </Link>
              </div>

              <button type="submit" className="login-button">
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;