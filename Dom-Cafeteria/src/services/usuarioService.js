const API_URL = "http://localhost:3000/api";

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