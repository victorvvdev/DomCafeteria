function detectarTipo(base64) {
  if (base64.startsWith("/9j/")) return "image/jpeg";
  if (base64.startsWith("iVBOR")) return "image/png";
  if (base64.startsWith("R0lGO")) return "image/gif";
  if (base64.startsWith("UklGR")) return "image/webp";
  return "image/jpeg";
}

export function base64ParaSrc(base64) {
  if (!base64) return null;
  const tipo = detectarTipo(base64);
  return `data:${tipo};base64,${base64}`;
}