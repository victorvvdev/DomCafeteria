import React from "react";
import { base64ParaSrc } from "../utils/imageDisplay";
import "../styles/CardPrato.css";

function CardPrato({ prato }) {
  const imagemSrc = base64ParaSrc(prato.foto_url);

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