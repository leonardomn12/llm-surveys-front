import { useState } from "react";
import { analyzeFile } from "./api.js";

const ACCEPTED = ".pdf,.docx,.xlsx";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSelect = (e) => {
    setFile(e.target.files[0] ?? null);
    setResult(null);
    setError("");
  };

  const onProcess = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      setResult(await analyzeFile(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.[^.]+$/, "")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      <h1>Análisis de cuestionarios</h1>
      <p className="hint">Sube un PDF, Word o Excel y obtén los ítems en JSON.</p>

      <div className="card">
        <input type="file" accept={ACCEPTED} onChange={onSelect} disabled={loading} />
        <button onClick={onProcess} disabled={!file || loading}>
          {loading ? "Procesando..." : "Procesar"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {result && (
        <section>
          <div className="result-header">
            <h2>
              {result.titulo ?? "Sin título"} · {result.idioma} · {result.total_items} ítems
            </h2>
            <button onClick={onDownload}>Descargar JSON</button>
          </div>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}
