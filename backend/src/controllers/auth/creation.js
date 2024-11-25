import Player from "../../models/player.js";

// Crear un nuevo usuario
const creation = async (req, res) => {
  try {
    const { global_name, username, password, avatarUrl, id } = req.body;

    if (!global_name) {
      return res.status(400).json({
        message: "Falta el nombre global (todo los usuarios lo ven)",
      });
    }

    if (!username) {
      return res.status(400).json({
        message: "Falta el nombre de usuario",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Falta la contraseña",
      });
    }

    if (!avatarUrl) {
      return res.status(400).json({
        message: "Falta el avatarUrl",
      });
    }

    if (!id) {
      return res.status(400).json({
        message: "Falta el ID",
      });
    }

    // Verifica si el usuario ya existe
    const existingUser = await Player.findOne({ id });

    if (existingUser) {
      return res.status(400).json({
        message: "El Usuario ya está registrado, intenta iniciando sesión",
      });
    }

    const newUser = new Player({
      global_name,
      avatarUrl,
      role: "user",
      username,
      password,
      id,
      playMaps: [],
      maps: [],
    });

    await newUser.save();

    res.status(201).json({
      message: `El usuario se creo correctamente: ${newUser._id}`,
      data: newUser,
    });
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario." });
  }
};

export default creation;
