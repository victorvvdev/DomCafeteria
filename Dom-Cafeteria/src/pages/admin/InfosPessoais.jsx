import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InfosPessoais.css";

function InfosPessoais() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({ nome: "", telefone: "", email: "" });
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
      setErros({...erros, telefone: validarTelefone(value) ? "" : "O telefone informado é inválido"});
    } else if (name === "email") {
      setErros({...erros, email: validarEmail(value) ? "" : "O email informado é inválido"});
    }
  };

  const handleAction = (campo) => {
    if (editando[campo]) {
      if (erros[campo]) return;
      setCampoParaSalvar(campo);
      setMostrarModal(true);
    } else {
      setEditando({ ...editando, [campo]: true });
    }
  };

  const confirmarSalvamento = () => {
    setEditando({ ...editando, [campoParaSalvar]: false });
    setMostrarModal(false);
    setAlertaSucesso(true);
    setTimeout(() => setAlertaSucesso(false), 3000);
  };

  return (
    <section className="centralizado-adm">
      <div className="card-pessoal">
        <h2 className="titulo-adm">Informações Pessoais</h2>
        <div className="barra-adm"></div>

        <div className="form-container">
          <div className="input-wrapper">
            <label className="label-fixo">Nome</label>
            <input type="text" value={dados.nome} className="info-input" readOnly />
          </div>

          <div className="input-wrapper">
            <label className="label-fixo">Telefone</label>
            <div className="input-com-botao">
              <input 
                name="telefone" value={dados.telefone} onChange={handleChange}
                readOnly={!editando.telefone}
                className={`info-input ${editando.telefone ? "em-edicao" : ""} ${erros.telefone ? "input-erro" : ""}`} 
              />
              <button 
                type="button" 
                className={editando.telefone ? "btn-acao-confirmar-input" : "btn-acao-editar-input"} 
                onClick={() => handleAction("telefone")} 
                disabled={editando.telefone && !!erros.telefone}
              >
                {editando.telefone ? "✓" : "✎"}
              </button>
              {editando.telefone && erros.telefone && <span className="erro-mensagem">{erros.telefone}</span>}
            </div>
          </div>

          <div className="input-wrapper">
            <label className="label-fixo">Email</label>
            <div className="input-com-botao">
              <input 
                name="email" value={dados.email} onChange={handleChange}
                readOnly={!editando.email}
                className={`info-input ${editando.email ? "em-edicao" : ""} ${erros.email ? "input-erro" : ""}`} 
              />
              <button 
                type="button" 
                className={editando.email ? "btn-acao-confirmar-input" : "btn-acao-editar-input"} 
                onClick={() => handleAction("email")} 
                disabled={editando.email && !!erros.email}
              >
                {editando.email ? "✓" : "✎"}
              </button>
              {editando.email && erros.email && <span className="erro-mensagem">{erros.email}</span>}
            </div>
          </div>

          <div className="input-wrapper">
            <label className="label-fixo">Senha</label>
            <div className="input-com-botao">
              <input type="password" value="********" className="info-input" readOnly />
              <button 
                type="button" 
                className="btn-acao-editar-input" 
                onClick={() => navigate("/adm/infospessoais2")}
              >
                ✎
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Deseja salvar o novo {campoParaSalvar === "telefone" ? "Telefone" : "Email"}?</p>
            <div className="modal-botoes">
              <button className="btn-confirmar" onClick={confirmarSalvamento}>Salvar</button>
              <button className="btn-cancelar" onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {alertaSucesso && <div className="alerta-sucesso">Informação salva com sucesso</div>}
    </section>
  );
}

export default InfosPessoais;