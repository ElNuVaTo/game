import jwt from "jsonwebtoken";
import Room from "../models/room.js";

const secretKey = process.env.TOKEN_JWT;

const roomInformation = async (req, res) => {
  const tokenRoom = req.cookies?.room_code;

  if (!tokenRoom) {
    return res
      .status(400)
      .json({ message: "No se proporcionó el código de la sala" });
  }

  try {
    const decodedroomID = jwt.verify(tokenRoom, secretKey);
    const roomDecodedID = decodedroomID.invitedCode;

    // Busca la sala y hace el populate de los jugadores
    const populatedRoom = await Room.findOne({ invitedCode: roomDecodedID })
      .populate("roomPlayers") // Aquí solo pasas el campo 'roomPlayers'
      .exec();

    if (!populatedRoom) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    if (!populatedRoom.roomPlayers || populatedRoom.roomPlayers.length === 0) {
      return res.status(404).json({
        message: "No se encontraron jugadores en esta sala",
      });
    }

    // Devuelve la sala con los jugadores poblados
    console.log("Sala con jugadores poblados:", populatedRoom);
    res.status(200).json(populatedRoom);
  } catch (error) {
    console.error("Error al obtener los datos de los jugadores:", error);
    res.status(500).json({
      message: "Error al obtener los datos de los jugadores",
    });
  }
};

export default roomInformation;
