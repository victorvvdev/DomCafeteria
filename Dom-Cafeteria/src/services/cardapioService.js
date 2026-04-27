const API_URL = "https://API";

export async function fetchPratos() {
  const response = await fetch(`${API_URL}/pratos`);
  if (!response.ok) throw new Error("Erro ao buscar pratos");
  return response.json();
}

export async function fetchLinkCardapio() {
  const response = await fetch(`${API_URL}/link-cardapio`);
  if (!response.ok) throw new Error("Erro ao buscar link do cardápio");
  return response.json();
}