const API_URL = "https://dom-cafeteria-api.vercel.app";

export async function login(email, senha) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.erro || "Erro ao fazer login.");
  }

  return response.json();
}

export async function recuperarSenha(email) {
  const response = await fetch(`${API_URL}/auth/recuperar-senha`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.erro || "Erro ao verificar email.");
  }

  return response.json();
}