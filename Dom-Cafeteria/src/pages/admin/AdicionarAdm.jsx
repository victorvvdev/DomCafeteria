import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdicionarAdm.css";
import { createUsuario } from "../../services/usuarioService";

function AdicionarAdm() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setSucesso(false);
    setCarregando(true);
    try {
      await createUsuario(nome, email, senha, telefone);
      setSucesso(true);
      setNome("");
      setTelefone("");
      setEmail("");
      setSenha("");
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="adicionar-adm-page">
      <section className="adicionar-adm-wrapper">
        <div className="adicionar-adm-card">
          <div className="adicionar-adm-top">
            <h2 className="adicionar-adm-title">Cadastre Novo Adm</h2>
          </div>
          <div className="adicionar-adm-body">
            <form className="adicionar-adm-form" onSubmit={handleSubmit}>
              <div className="adicionar-adm-field">
                <label>Nome Completo</label>
                <input
                  type="text"
                  placeholder="Digite o nome completo"
                  required
                  className="adicionar-adm-input"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="adicionar-adm-field">
                <label>Telefone</label>
                <input
                  type="tel"
                  placeholder="Digite o telefone"
                  required
                  className="adicionar-adm-input"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              <div className="adicionar-adm-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Digite o email"
                  required
                  className="adicionar-adm-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="adicionar-adm-field">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Digite a senha"
                  required
                  className="adicionar-adm-input"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              {erro && <p className="adicionar-adm-erro">{erro}</p>}
              {sucesso && <p className="adicionar-adm-sucesso">Administrador cadastrado com sucesso!</p>}
              <button type="submit" className="btn-confirmar-pessoal" disabled={carregando}>
                {carregando ? "Cadastrando..." : "Confirmar"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdicionarAdm;