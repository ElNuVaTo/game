import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Player from "../../models/player.js";

const secretKey = process.env.TOKEN_JWT;

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Player.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const _id = user._id;
    const role = user.role;

    const token = jwt.sign({ id: _id, role }, secretKey, {
      expiresIn: "1h",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60,
    });

    // Responder con el token y el usuario
    return res.status(200).json({
      message: "Login exitoso",
    });
  } catch (error) {
    console.error("Error durante el login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export default login;
