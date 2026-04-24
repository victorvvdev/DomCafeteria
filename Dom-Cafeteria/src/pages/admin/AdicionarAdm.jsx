import "./AdicionarAdm.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdicionarAdm() {
  return (
    <main className="adicionar-adm-container">
      <Link to="/adm/contato" className="btn-voltar">
        <FaArrowLeft />
        Voltar
      </Link>

      <section className="card-adicionar-adm">
        <div className="card-titulo">
          <h1>Cadastre um novo adm</h1>
        </div>

        <form className="form-adm">
          <input type="text" placeholder="Nome completo" />
          <input type="tel" placeholder="Telefone" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />

          <button type="submit">Confirmar</button>
        </form>
      </section>
    </main>
  );
}

export default AdicionarAdm;