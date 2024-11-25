import Player from "../../models/player.js";

const createUser = async (req, res, next) => {
  const { global_name, avatarUrl, type } = req.body;

  try {
    const newUser = new Player({
      global_name,
      avatarUrl,
    });

    // Guardamos al usuario
    await newUser.save();

    (req.user = newUser), type;

    next();
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({
      message: "Error interno al crear el usuario",
    });
  }
};

export default createUser;
