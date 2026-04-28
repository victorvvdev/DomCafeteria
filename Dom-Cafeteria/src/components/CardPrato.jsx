import React from "react";
import "../styles/CardPrato.css";

function CardPrato({ prato }) {
  return (
    <div className="card-prato">
      <div className="card-prato-img-wrapper">
        {prato.imagem_url && prato.imagem_url !== "" ? (
          <img src={prato.imagem_url} alt={prato.nome} />
        ) : (
          <span className="card-prato-img-placeholder">imagem aqui...</span>
        )}
      </div>
      <p className="card-prato-nome">{prato.nome}</p>
    </div>
  );
}

export default CardPrato;