import Lobby from "../models/room.js";

const roomCreation = async (req, res) => {
  const { invitedCode } = req.body;

  console.log(invitedCode);

  if (!invitedCode) {
    return res.status(400).json({ message: "Necesitas ingresar un código" });
  }

  try {
    const existingRoom = await Lobby.findOne({ invitedCode });

    if (existingRoom) {
      return res.status(201).json({
        message: "Nose pudo crear la sala, ya existe",
      });
    }

    const roomData = {
      invitedCode,
    };

    const newRoom = new Lobby(roomData);
    await newRoom.save();

    res.status(201).json({
      message: "Sala creada con éxito, puedes unirte a ella",
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ message: "Error al crear o actualizar la sala" });
  }
};

export default roomCreation;
