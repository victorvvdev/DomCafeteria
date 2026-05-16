export function base64ParaSrc(base64) {
  return base64 ? `data:image/jpeg;base64,${base64}` : null;
}