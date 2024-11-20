import mongoose from "mongoose";
import Room from "../models/lobby.js";

const getLobbyInfo = async (req, res) => {
  const { invitedCode } = req.params;





  try {
    // Busca el lobby por el 'invitedCode'
    const room = await Room.findOne({ invitedCode })
      .select("informationPlayers") // Solo selecciona el campo 'informationPlayers'
      .populate("informationPlayers"); // Pobla los datos del jugador relacionado

      console.log("Sala encontrada" ,room)

    if (!room) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    if (!room.informationPlayers || room.informationPlayers.length === 0) {
      return res.status(404).json({ message: "No se encontraron jugadores en esta sala" });
    }

    // Devuelve solo los jugadores relacionados
    res.status(200).json(room.informationPlayers);
  } catch (error) {
    console.error("Error al obtener los datos de los jugadores:", error);
    res.status(500).json({ message: "Error al obtener los datos de los jugadores" });
  }
};

export default getLobbyInfo;
