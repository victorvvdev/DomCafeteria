const PRATOS_INICIAIS = [
  { id: 1, nome: "nome do prato..." },
  { id: 2, nome: "nome do prato..." },
  { id: 3, nome: "nome do prato..." },
  { id: 4, nome: "nome do prato..." },
  { id: 5, nome: "nome do prato..." },
];

export function getPratos() {
  const dados = localStorage.getItem("pratos");
  return dados ? JSON.parse(dados) : PRATOS_INICIAIS;
}

export function setPratos(pratos) {
  localStorage.setItem("pratos", JSON.stringify(pratos));
}

export function getLinkCardapio() {
  return localStorage.getItem("linkCardapio") || "#";
}

export function setLinkCardapio(link) {
  localStorage.setItem("linkCardapio", link);
}
