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
    <section className="centralizado">
      <div className="inicio-texto">
        <h2 className="titulo">Alterar Senha</h2>
        <div className="inicio-barra"></div>
        
        <div className="form-container">
          <div className="input-wrapper">
            <label className="label-fixo">Senha Atual</label>
            <input 
              type="password" 
              className="info-input em-edicao" 
              value={senhas.atual}
              onChange={(e) => setSenhas({...senhas, atual: e.target.value})} 
            />
          </div>

          <div className="input-wrapper">
            <label className="label-fixo">Nova Senha</label>
            <input 
              type="password" 
              className={`info-input em-edicao ${senhaCurtaOuSimples ? "input-erro" : ""}`}
              value={senhas.nova}
              onChange={(e) => setSenhas({...senhas, nova: e.target.value})} 
            />
          </div>

          <div className="input-wrapper">
            <label className="label-fixo">Confirmar Nova Senha</label>
            <input 
              type="password" 
              className={`info-input em-edicao ${senhasDiferentes ? "input-erro" : ""}`}
              value={senhas.confirmar}
              onChange={(e) => setSenhas({...senhas, confirmar: e.target.value})} 
            />
            
            <div className="container-avisos">
              {senhaCurtaOuSimples && (
                <span className="erro-mensagem-senha">
                  A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula e uma letra minúscula.
                </span>
              )}
              {senhasDiferentes && (
                <span className="erro-mensagem-senha">
                  A Nova Senha e a Confirmação precisam ser iguais.
                </span>
              )}
            </div>
          </div>

          <div className="container-botoes-senha">
            <button 
              className="btn-acao-salvar" 
              onClick={handleConfirmar}
              disabled={camposVazios || senhaCurtaOuSimples || senhasDiferentes}
            >
              Confirmar
            </button>
            <button className="btn-acao-cancelar" onClick={() => navigate(-1)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
      {sucesso && <div className="alerta-sucesso">Senha alterada com sucesso</div>}
    </section>
  );
}

export default InfosPessoais2;