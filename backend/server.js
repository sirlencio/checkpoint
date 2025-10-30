import "dotenv/config";

import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

import API from "./routes/API.js";
app.use("/api", API);

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
