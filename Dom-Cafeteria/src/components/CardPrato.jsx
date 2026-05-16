import React from "react";
import "../styles/CardPrato.css";

function CardPrato({ prato }) {
  const imagemSrc = prato.foto_url
    ? `data:image/jpeg;base64,${prato.foto_url}`
    : null;

  return (
    <div className="card-prato">
      <div className="card-prato-img-wrapper">
        {imagemSrc ? (
          <img src={imagemSrc} alt={prato.nome} />
        ) : (
          <span className="card-prato-img-placeholder">imagem aqui...</span>
        )}
      </div>
      <p className="card-prato-nome">{prato.nome}</p>
    </div>
  );
}

export default CardPrato;