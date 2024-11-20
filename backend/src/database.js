import mongoose from "mongoose"; // Usar la importación de ES Module

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("DataBase funcionando"))
  .catch((err) => console.log(err));

export default mongoose; // Exporta mongoose como default
