# LLM Surveys - Frontend

Interfaz en React (Vite) para subir un cuestionario (PDF, Word o Excel), procesarlo con el backend y ver o descargar el JSON resultante.

- **Backend:** https://llm-surveys-back.onrender.com/ (repositorio `llm-surveys-back`)
- **Deploy:** https://llm-surveys-front.onrender.com/

## Instalación

```bash
npm install
```

## Variables de entorno

Copia `.env.example` a `.env`:

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL del backend (por defecto `http://localhost:8000`) |

## Ejecución local

```bash
npm run dev
```

Se abre en `http://localhost:5173`. Necesita el backend corriendo en la URL configurada.

## Build

```bash
npm run build
```
