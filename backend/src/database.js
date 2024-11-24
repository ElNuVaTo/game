import mongoose from "mongoose"; // Usar la importación de ES Module

import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log(MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("DataBase funcionando"))
  .catch((err) => console.log(err));

export default mongoose; // Exporta mongoose como default
