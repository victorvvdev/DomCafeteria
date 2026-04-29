import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InfosPessoais2.css";

function InfosPessoais2() {
  const navigate = useNavigate();
  const [senhas, setSenhas] = useState({ atual: "", nova: "", confirmar: "" });
  const [sucesso, setSucesso] = useState(false);

  const senhaCurtaOuSimples = senhas.nova.length > 0 && 
    (senhas.nova.length < 8 || !/[A-Z]/.test(senhas.nova) || !/[a-z]/.test(senhas.nova));
  
  const senhasDiferentes = senhas.confirmar.length > 0 && senhas.nova !== senhas.confirmar;
  const camposVazios = !senhas.atual || !senhas.nova || !senhas.confirmar;

  const handleConfirmar = () => {
    if (camposVazios || senhaCurtaOuSimples || senhasDiferentes) return;
    setSucesso(true);
    setTimeout(() => navigate("/adm/infospessoais"), 3000);
  };

  return (
    <main className="senha-page">
      <section className="senha-wrapper">
        <div className="senha-card">
          <div className="senha-top">
            <h2 className="senha-title">Alterar Senha</h2>
          </div>

          <div className="senha-body">
            <div className="senha-form">
              <div className="senha-field">
                <label>Senha Atual</label>
                <input 
                  type="password" 
                  className="senha-input" 
                  placeholder="Digite a senha atual"
                  value={senhas.atual}
                  onChange={(e) => setSenhas({...senhas, atual: e.target.value})} 
                />
              </div>

              <div className="senha-field">
                <label>Nova Senha</label>
                <input 
                  type="password" 
                  className={`senha-input ${senhaCurtaOuSimples ? "error" : ""}`}
                  placeholder="Digite a nova senha"
                  value={senhas.nova}
                  onChange={(e) => setSenhas({...senhas, nova: e.target.value})} 
                />
              </div>

              <div className="senha-field">
                <label>Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  className={`senha-input ${senhasDiferentes ? "error" : ""}`}
                  placeholder="Confirme a nova senha"
                  value={senhas.confirmar}
                  onChange={(e) => setSenhas({...senhas, confirmar: e.target.value})} 
                />
                
                <div className="senha-avisos">
                  {senhaCurtaOuSimples && (
                    <span className="senha-error-msg">
                      A senha deve conter pelo menos 8 caracteres (A-z).
                    </span>
                  )}
                  {senhasDiferentes && (
                    <span className="senha-error-msg">
                      As senhas não coincidem.
                    </span>
                  )}
                </div>
              </div>

              <div className="senha-actions">
                <button 
                  className="senha-btn-confirm" 
                  onClick={handleConfirmar}
                  disabled={camposVazios || senhaCurtaOuSimples || senhasDiferentes}
                >
                  Confirmar Alteração
                </button>
                <button className="senha-btn-cancel" onClick={() => navigate(-1)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {sucesso && <div className="senha-toast">Senha alterada com sucesso!</div>}
    </main>
  );
}

export default InfosPessoais2;