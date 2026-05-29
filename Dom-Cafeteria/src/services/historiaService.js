const API_URL = "https://dom-cafeteria-api.vercel.app/api";

export async function getHistoria() {
  const resp = await fetch(`${API_URL}/historia`);
  if (!resp.ok) throw new Error("Erro ao buscar história.");
  return resp.json();
}

export async function updateHistoria(texto) {
  const resp = await fetch(`${API_URL}/historia`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });
  if (!resp.ok) throw new Error("Erro ao atualizar história.");
  return resp.json();
}