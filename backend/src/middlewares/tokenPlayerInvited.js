import jwt from "jsonwebtoken";

// Clave secreta del JWT
const secretKey = process.env.TOKEN_JWT;

const middleTokenTemp = (req, res) => {
  const { _id, role, type } = req.user;

  if (!_id || !role) {
    return res
      .status(400)
      .json({ message: "Faltan datos para generar el token." });
  }

  const token = jwt.sign({ id: _id, role, type }, secretKey, {
    expiresIn: "1h",
  });

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60,
  });

  // Enviar una respuesta al cliente
  res
    .status(200)
    .json({ message: "Token generado y cookie configurada correctamente." });
};

export { middleTokenTemp };
