import cron from "node-cron";
import PlayerTemp from "../models/typeUsers/temp.js";

cron.schedule("* * * * *", async () => {
  // Se ejecuta cada minuto
  try {
    const result = await PlayerTemp.deleteMany({
      createdAt: { $lt: new Date(Date.now() - 15 * 1000) }, // Elimina usuarios creados hace más de 15 segundos
    });
    console.log(`${result.deletedCount} usuarios temporales eliminados.`);
  } catch (error) {
    console.error("Error al eliminar usuarios temporales:", error);
  }
});
