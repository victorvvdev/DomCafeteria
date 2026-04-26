
const API_URL = "https://futuroLinkAqui/pratos";

export async function fetchPratos() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar pratos");
  return response.json();
}