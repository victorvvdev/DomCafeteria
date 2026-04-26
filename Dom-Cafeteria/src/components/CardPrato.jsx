import React from "react";
import "../styles/CardPrato.css";
 
function CardPrato({ prato }) {
  return (
    <div className="card-prato">
      <div className="card-prato-img-wrapper">
        <img src={prato.imagem_url} alt={prato.nome} />
      </div>
      <p className="card-prato-nome">{prato.nome}</p>
    </div>
  );
}
 
export default CardPrato;
