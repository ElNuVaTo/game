import Lobby from "../models/lobby.js";

const patchJoin = async (req, res) => {
  const { invitedCode, informationPlayers } = req.body;

  // Validaciones para asegurarse de que los datos sean correctos
  if (!invitedCode) {
    return res.status(400).json({ message: "Debes proporcionar un código de invitación" });
  }

  if (!informationPlayers || !Array.isArray(informationPlayers)) {
    return res.status(400).json({ message: "Debes proporcionar una lista de jugadores" });
  }

  try {
    // Buscar una sala que tenga el código de invitación
    const existingRoom = await Lobby.findOne({ invitedCode });

    if (existingRoom) {
      // Si la sala existe, se actualizan los jugadores
      existingRoom.informationPlayers.push(...informationPlayers); // Agregar jugadores a la lista
      const updatedRoom = await existingRoom.save(); // Guardar los cambios

      return res.status(200).json({
        message: "Se agregó un usuario a la sala",
        _id: updatedRoom._id,
        informationPlayers: updatedRoom.informationPlayers,
      });
    }

    // Si no se encuentra la sala, devolver un error
    res.status(404).json({ message: "Sala no encontrada" });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ message: "Error al agregar un usuario a la sala" });
  }
};

export default patchJoin;
