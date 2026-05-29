<<<<<<< Updated upstream
const API_URL = "http://localhost:3000/api";
=======
const API_URL = "https://dom-cafeteria-api.vercel.app";
>>>>>>> Stashed changes

export async function getEspacos() {
  const response = await fetch(`${API_URL}/espaco`);
  if (!response.ok) throw new Error("Erro ao buscar espaços.");
  return response.json();
}

export async function getEspacoById(id) {
  const response = await fetch(`${API_URL}/espaco/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar espaço.");
  return response.json();
}

export async function createEspaco(foto_url, titulo, descricao) {
  const response = await fetch(`${API_URL}/espaco`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ foto_url, titulo, descricao }),
  });
  if (!response.ok) throw new Error("Erro ao criar espaço.");
  return response.json();
}

export async function updateEspaco(id, foto_url, titulo, descricao) {
  const response = await fetch(`${API_URL}/espaco/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ foto_url, titulo, descricao }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar espaço.");
  return response.json();
}

export async function deleteEspaco(id) {
  const response = await fetch(`${API_URL}/espaco/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao remover espaço.");
  return response.json();
}