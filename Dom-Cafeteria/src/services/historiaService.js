const API_URL = "http://localhost:3000/api/historia";

export async function getHistoria() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar história");
  }

  return await response.json();
}

export async function updateHistoria(dados) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar história");
  }

  return await response.json();
}