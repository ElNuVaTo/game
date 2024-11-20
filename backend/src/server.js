import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/router.js"; // Asegúrate de tener la extensión .js en el archivo
import dotenv from 'dotenv';

dotenv.config();

// Inicialización
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configura CORS para permitir el origen del frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.100.63:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Configuración
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(process.cwd(), "views")); // Cambié __dirname por process.cwd() para ES Modules

// Rutas
app.use("/api", router);

// Permisos de modificar la carpeta

export default app;
