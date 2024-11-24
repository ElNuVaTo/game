import jwt from "jsonwebtoken";
import Room from "../models/room.js";

const secretKey = process.env.TOKEN_JWT;

const roomJoin = async (req, res) => {
  const { invitedCode } = req.body;
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(400)
      .json({ message: "Debes tener un token para ingresar" });
  }

  const decodedToken = jwt.verify(token, secretKey);
  const idPlayer = decodedToken.id;

  if (!invitedCode) {
    return res
      .status(400)
      .json({ message: "Debes proporcionar un código de invitación" });
  }

  const codeCookie = jwt.sign({ invitedCode }, secretKey, { expiresIn: "1h" });
  res.cookie("room_code", codeCookie, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60,
  });

  try {
    const existingRoom = await Room.findOne({ invitedCode });

    if (!existingRoom) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    // Verificar si el jugador ya está en la sala
    const alreadyInRoom = existingRoom.roomPlayers.some(
      (playerInfo) => playerInfo.toString() === idPlayer
    );

    if (alreadyInRoom) {
      return res.status(400).json({
        message: "Ya estás en esta sala",
      });
    }

    // Crear el objeto de jugador con la referencia al ID del jugador
    existingRoom.roomPlayers.push(idPlayer); // No hace falta envolverlo en un objeto, solo necesitamos el ObjectId

    // Guardar la sala actualizada
    const updatedRoom = await existingRoom.save();

    console.log(updatedRoom);

    return res.status(200).json({
      message: "Te has unido a la sala con éxito",
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({
      message: "Error al agregar un usuario a la sala",
    });
  }
};

export default roomJoin;
