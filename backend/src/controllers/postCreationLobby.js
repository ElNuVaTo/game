import Lobby from "../models/lobby.js";

const postCreationLobby = async (req, res) => {
  const { invitedCode } = req.body;

  // Validación para asegurarse de que el código de invitación esté presente
  if (!invitedCode) {
    return res.status(400).json({ message: "Necesitas ingresar un código" });
  }

  try {
    // Buscar si ya existe una sala con el mismo invitedCode
    const existingRoom = await Lobby.findOne({ invitedCode });

    if (existingRoom) {
      // Si la sala ya existe, devolver mensaje que indique que ya fue creada
      return res.status(201).json({
        message: "Sala creada con éxito, puedes unirte a ella",
        exists: true,
        _id: existingRoom._id,
        invitedCode: existingRoom.invitedCode,
      });
    }

    // Crear una sala nueva si no existe
    const roomData = {
      invitedCode,
    };

    const newRoom = new Lobby(roomData);
    await newRoom.save();

    // Retornar la respuesta de la nueva sala creada
    res.status(201).json({
      message: "Sala creada con éxito, puedes unirte a ella",
      exists: true,
      _id: newRoom._id,
      invitedCode: newRoom.invitedCode,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ message: "Error al crear o actualizar la sala" });
  }
};

export default postCreationLobby;
