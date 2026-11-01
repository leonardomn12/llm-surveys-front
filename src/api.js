const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function analyzeFile(file) {
  const body = new FormData();
  body.append("file", file);

  let response;
  try {
    response = await fetch(`${API_URL}/api/v1/analysis/`, { method: "POST", body });
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = data?.detail;
    throw new Error(
      typeof detail === "string" ? detail : "Ocurrió un error al procesar el archivo"
    );
  }
  return data;
}
