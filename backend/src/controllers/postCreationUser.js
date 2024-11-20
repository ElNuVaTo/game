import Player from "../models/users.js";

const postCreationUser = async (req, res) => {
  const { avatar, global_name, username, id } = req.body;

  // Validaciones de los datos
  if (!avatar) {
    return res.status(400).json({ message: "Faltan agregar una foto" });
  }

  if (!global_name) {
    return res.status(400).json({ message: "Falta un nombre" });
  }

  // Condición para verificar si el id está presente
  const temp = id ? true : false;

  const playerData = {
    avatar,
    global_name,
    username: username || null, // Solo incluye 'username' si está presente
    id: id || null, // Solo incluye 'id' si está presente
    registered: temp, // Usamos 'temp' para determinar si se registra o no
  };

  try {
    let savedPlayer;

    // Si el id no es null o undefined, buscar jugador
    if (id) {
      const jugador = await Player.findOne({ id: id });

      if (jugador) {
        // Si el jugador ya existe, se actualizan sus datos
        jugador.avatar = avatar;
        jugador.global_name = global_name;
        jugador.username = username || jugador.username; // No sobreescribe si 'username' no se proporciona

        // Guardar los cambios
        savedPlayer = await jugador.save();

        return res.status(200).json({
          message: "Ya estas registrado :p",
          _id: savedPlayer._id,
        });
      }
    }

    // Si el jugador no existe o no se proporcionó id, crear uno nuevo
    const player = new Player(playerData);
    savedPlayer = await player.save();

    // Si 'registered' es false, programamos la eliminación
    if (!savedPlayer.registered) {
      setTimeout(async () => {
        try {
          // Borrar el jugador después de 1 segundo
          await Player.findByIdAndDelete(savedPlayer._id);
          console.log(
            `Jugador con id ${savedPlayer._id} eliminado después de 1 segundo.`
          );
        } catch (error) {
          console.error("Error al eliminar el jugador:", error);
        }
      }, 6000000); 
    }

    return res.status(201).json({
      message: "Jugador creado con éxito",
      _id: savedPlayer._id,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res
      .status(500)
      .json({ message: "Error interno al procesar la solicitud" });
  }
};

export default postCreationUser;
