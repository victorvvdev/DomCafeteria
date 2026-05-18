export function converterParaBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const tipo = file.type;
      const base64 = dataUrl.split(",")[1];
      resolve({ base64, tipo });
    };
    reader.onerror = () => reject(new Error("Erro ao converter imagem."));
    reader.readAsDataURL(file);
  });
}