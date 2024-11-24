// Lib
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

// Archivos
import dataBase from "./database.js";
import app from "./server.js";
import handleSocketEvents from "./controllers/socket.js";

// Mantenimiento de la base de datos
dotenv.config();

// Crear el servidor HTTP usando la app de Express
const server = http.createServer(app);

// Configurar Socket.IO para que use el servidor HTTP
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.100.63:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => handleSocketEvents(socket));

// Iniciar el servidor en el puerto configurado
server.listen(app.get("port"), () => {
  console.log("Servidor en el puerto", app.get("port"));
});
