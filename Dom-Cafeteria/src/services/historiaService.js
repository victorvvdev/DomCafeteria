const API_URL = "http://localhost:3000/api";

export async function getHistoria() {
  const response = await fetch(`${API_URL}/historia`);
  if (!response.ok) throw new Error("Erro ao buscar história.");
  return response.json();
}

export async function updateHistoria(texto) {
  const response = await fetch(`${API_URL}/historia`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar história.");
  return response.json();
}