const API_URL = "https://dom-cafeteria-api.vercel.app/api";

export async function getHistoria() {
<<<<<<< Updated upstream
  const response = await fetch(`${API_URL}/historia`);
=======
  const response = await fetch(`${API_URL}/api/historia`);
>>>>>>> Stashed changes
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