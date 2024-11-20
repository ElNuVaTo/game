import Lobby from "../models/lobby.js";

const handleSocketEvents = (socket) => {
  console.log("Cliente conectado: Servidor", socket.id);

  // Cuando un jugador entra al lobby (esto podría estar en un evento de tipo 'join')
  socket.on("El ID de la sala es:", async (lobbyID) => {

    try {
      // Busca el lobby y actualiza la lista de jugadores
      const lobby = await Lobby.findById(lobbyID).populate(
        "informationPlayers"
      );
      if (lobby) {
        console.log("Sala encontrada:", lobby);
        // Emite el evento para notificar a todos los clientes en ese lobby
        socket.broadcast.emit("actualizar-jugadores", lobby.informationPlayers); // Enviar a todos excepto al cliente que emite el evento
        socket.emit("lobby-info", lobby); // Solo al cliente que ha emitido el evento
      } else {
        console.log("No se encontró la sala con ese ID");
        socket.emit("lobby-error", { message: "Sala no encontrada." });
      }
    } catch (error) {
      console.error("Error al buscar el lobby:", error);
      socket.emit("lobby-error", { message: "Error al obtener la sala." });
    }
  });

  // Evento cuando el cliente se desconecta
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
};

export default handleSocketEvents;
