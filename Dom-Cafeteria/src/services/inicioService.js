const API_URL = "https://dom-cafeteria-api.vercel.app";

export async function getInicio() {
  const response = await fetch(`${API_URL}/api/inicio`);
  if (!response.ok) throw new Error("Erro ao buscar dados da página inicial.");
  return response.json();
}

export async function updateInicio(texto, foto) {
  const response = await fetch(`${API_URL}/api/inicio`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto, foto }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar página inicial.");
  return response.json();
}

export async function getDuvidas() {
  const response = await fetch(`${API_URL}/api/duvidas`);
  if (!response.ok) throw new Error("Erro ao buscar dúvidas.");
  return response.json();
}

export async function updateDuvida(id, pergunta, resposta) {
  const response = await fetch(`${API_URL}/api/duvidas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pergunta, resposta }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar dúvida.");
  return response.json();
}

export async function createDuvida(pergunta, resposta) {
  const response = await fetch(`${API_URL}/api/duvidas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pergunta, resposta }),
  });
  if (!response.ok) throw new Error("Erro ao criar dúvida.");
  return response.json();
}
