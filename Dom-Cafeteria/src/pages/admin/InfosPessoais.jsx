import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InfosPessoais.css";

function InfosPessoais() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({ nome: "", telefone: "", email: "" });
  const [valorOriginal, setValorOriginal] = useState("");
  const [editando, setEditando] = useState({ telefone: false, email: false });
  const [erros, setErros] = useState({ telefone: "", email: "" });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [campoParaSalvar, setCampoParaSalvar] = useState("");
  const [alertaSucesso, setAlertaSucesso] = useState(false);

  useEffect(() => {
    setDados({
      nome: "Administrador",
      telefone: "(85) 99999-9999",
      email: "admin@email.com"
    });
  }, []);

  const validarTelefone = (v) => /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(v);
  const validarEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
    if (name === "telefone") {
      setErros({ ...erros, telefone: validarTelefone(value) ? "" : "O telefone informado é inválido" });
    } else if (name === "email") {
      setErros({ ...erros, email: validarEmail(value) ? "" : "O email informado é inválido" });
    }
  };

  const handleAction = (campo) => {
    if (editando[campo]) {
      if (erros[campo]) return;
      setCampoParaSalvar(campo);
      setMostrarModal(true);
    } else {
      setValorOriginal(dados[campo]);
      setEditando({ ...editando, [campo]: true });
    }
  };

  const confirmarSalvamento = () => {
    setEditando({ ...editando, [campoParaSalvar]: false });
    setMostrarModal(false);
    setAlertaSucesso(true);
    setTimeout(() => setAlertaSucesso(false), 3000);
  };

  const cancelarEdicao = () => {
    setDados({ ...dados, [campoParaSalvar]: valorOriginal });
    setErros({ ...erros, [campoParaSalvar]: "" });
    setEditando({ ...editando, [campoParaSalvar]: false });
    setMostrarModal(false);
  };

  return (
    <main className="pessoal-page">
      <section className="pessoal-wrapper">
        <div className="pessoal-card">
          <div className="pessoal-top">
            <h2 className="pessoal-title">Informações Pessoais</h2>
          </div>

          <div className="pessoal-body">
            <div className="pessoal-form">
              <div className="pessoal-field">
                <label>Nome</label>
                <input type="text" value={dados.nome} className="pessoal-input readonly" readOnly />
              </div>

              <div className="pessoal-field">
                <label>Telefone</label>
                <div className="input-group">
                  <input
                    name="telefone"
                    value={dados.telefone}
                    onChange={handleChange}
                    readOnly={!editando.telefone}
                    className={`pessoal-input ${editando.telefone ? "editing" : ""} ${erros.telefone ? "error" : ""}`}
                  />
                  <button
                    type="button"
                    className={editando.telefone ? "btn-save" : "btn-edit"}
                    onClick={() => handleAction("telefone")}
                    disabled={editando.telefone && !!erros.telefone}
                  >
                    {editando.telefone ? "✓" : "✎"}
                  </button>
                </div>
                {editando.telefone && erros.telefone && <span className="pessoal-error-msg">{erros.telefone}</span>}
              </div>

              <div className="pessoal-field">
                <label>Email</label>
                <div className="input-group">
                  <input
                    name="email"
                    value={dados.email}
                    onChange={handleChange}
                    readOnly={!editando.email}
                    className={`pessoal-input ${editando.email ? "editing" : ""} ${erros.email ? "error" : ""}`}
                  />
                  <button
                    type="button"
                    className={editando.email ? "btn-save" : "btn-edit"}
                    onClick={() => handleAction("email")}
                    disabled={editando.email && !!erros.email}
                  >
                    {editando.email ? "✓" : "✎"}
                  </button>
                </div>
                {editando.email && erros.email && <span className="pessoal-error-msg">{erros.email}</span>}
              </div>

              <div className="pessoal-field">
                <label>Senha</label>
                <div className="input-group">
                  <input type="password" value="********" className="pessoal-input readonly" readOnly />
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => navigate("/adm/infospessoais2")}
                  >
                    ✎
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {mostrarModal && (
        <div className="pessoal-modal-overlay">
          <div className="pessoal-modal-content">
            <p>Deseja salvar o novo {campoParaSalvar === "telefone" ? "Telefone" : "Email"}?</p>
            <div className="pessoal-modal-actions">
              <button className="btn-modal-confirm" onClick={confirmarSalvamento}>Salvar</button>
              <button className="btn-modal-cancel" onClick={cancelarEdicao}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {alertaSucesso && <div className="pessoal-toast">Informação salva com sucesso</div>}
    </main>
  );
}

export default InfosPessoais;