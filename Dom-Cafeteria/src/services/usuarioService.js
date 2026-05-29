const API_URL = "https://dom-cafeteria-api.vercel.app/api";

export async function createUsuario(nome, email, senha, telefone) {
  const response = await fetch(`${API_URL}/usuarios`, {
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
  const response = await fetch(`${API_URL}/usuarios/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar usuário.");
  return response.json();
}

export async function updateUsuario(id, dados) {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error("Erro ao atualizar usuário.");
  return response.json();
}