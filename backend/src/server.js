import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";

dotenv.config();

// Inicialización
const app = express();

// Configuraciones
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.100.63:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Configuración
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(process.cwd(), "views"));

// Rutas
app.use("/api", router);

export default app;
