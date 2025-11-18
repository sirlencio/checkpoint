import "dotenv/config";
import express from "express";
import cors from "cors";
import API from "./routes/API.js";

const app = express();

// Permitir requests desde cualquier origen (desarrollo)
app.use(cors());
app.use(express.json());

// Todas las rutas del backend bajo /api
app.use("/api", API);

// Cambiar el puerto a 4000
const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
