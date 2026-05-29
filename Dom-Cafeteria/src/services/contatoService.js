const API_URL = "https://dom-cafeteria-api.vercel.app";

export async function getContatoHeader() {
  const response = await fetch(`${API_URL}/contato-header`);
  if (!response.ok) throw new Error("Erro ao buscar header do contato.");
  return response.json();
}

export async function updateContatoHeader(titulo, subtitulo) {
  const response = await fetch(`${API_URL}/contato-header`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, subtitulo }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar header do contato.");
  return response.json();
}

export async function getContatoInfo() {
  const response = await fetch(`${API_URL}/contato-info`);
  if (!response.ok) throw new Error("Erro ao buscar informações de contato.");
  return response.json();
}

export async function updateContatoInfo(whatsapp, whatsapp_link, instagram, localizacao) {
  const response = await fetch(`${API_URL}/contato-info`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ whatsapp, whatsapp_link, instagram, localizacao }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar informações de contato.");
  return response.json();
}

export async function getHorarios() {
  const response = await fetch(`${API_URL}/horario`);
  if (!response.ok) throw new Error("Erro ao buscar horários.");
  return response.json();
}

export async function updateHorario(id, dia, horario) {
  const response = await fetch(`${API_URL}/horario/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dia, horario }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar horário.");
  return response.json();
}