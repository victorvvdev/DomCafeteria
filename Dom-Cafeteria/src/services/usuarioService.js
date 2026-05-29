const API_URL = "https://dom-cafeteria-api.vercel.app";

export async function createUsuario(nome, email, senha, telefone) {
  const response = await fetch(`${API_URL}/api/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha, telefone }),
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.erro || "Erro ao cadastrar usuário.");
  }

  return response.json();
}

export async function getUsuarioById(id) {
  const response = await fetch(`${API_URL}/api/usuarios/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar usuário.");
  return response.json();
}

export async function updateUsuario(id, data) {
  const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao atualizar usuário.");
  return response.json();
}