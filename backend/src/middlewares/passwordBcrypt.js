import bcrypt from "bcrypt";

// Asegúrate de tener el número de saltRounds definido
const saltRounds = 10;

// Middleware para encriptar la contraseña
const useBcrypt = async (req, res, next) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { username, password } = req.body;

    // Verifica que ambos campos estén presentes
    if (!username || !password) {
      return res.status(400).json({
        message: "Faltan el nombre de usuario o la contraseña",
      });
    }

    // Hash del password con bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Reemplaza el password en claro con el hashedPassword
    req.body.password = hashedPassword;

    // Llama a next() para continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    console.error("Error al encriptar la contraseña:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export { useBcrypt };
