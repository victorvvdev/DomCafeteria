<<<<<<< Updated upstream
const API_URL = "http://localhost:3000/api";
=======
const API_URL = "https://dom-cafeteria-api.vercel.app";
>>>>>>> Stashed changes

export async function getPratos() {
  const response = await fetch(`${API_URL}/pratos`);
  if (!response.ok) throw new Error("Erro ao buscar pratos.");
  return response.json();
}

export async function createPrato(nome, foto_url) {
  const response = await fetch(`${API_URL}/pratos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, foto_url }),
  });
  if (!response.ok) throw new Error("Erro ao criar prato.");
  return response.json();
}

export async function updatePrato(id, nome, foto_url) {
  const response = await fetch(`${API_URL}/pratos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, foto_url }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar prato.");
  return response.json();
}

export async function deletePrato(id) {
  const response = await fetch(`${API_URL}/pratos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao remover prato.");
  return response.json();
}

export async function getLinkCardapio() {
  const response = await fetch(`${API_URL}/link-cardapio`);
  if (!response.ok) throw new Error("Erro ao buscar link.");
  return response.json();
}

export async function updateLinkCardapio(link) {
  const response = await fetch(`${API_URL}/link-cardapio`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar link.");
  return response.json();
}

export async function removeLinkCardapio() {
  const response = await fetch(`${API_URL}/link-cardapio`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao remover link.");
  return response.json();
}