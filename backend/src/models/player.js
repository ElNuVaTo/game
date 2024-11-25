import { Schema, model } from "mongoose";

// Esquema principal del jugador
const PlayerSchema = new Schema(
  {
    avatarUrl: {
      type: String,
      required: [true, "Falta la foto del usuario"],
    },
    global_name: {
      type: String,
      required: [true, "Falta el nombre global (visible para todos)"],
    },
    role: {
      type: String,
      default: "guest",
    },

    password: {
      type: String,
    },
    id: {
      type: String,
    },
    username: {
      type: String,
    },

    playMaps: [],
    maps: [],
  },
  { timestamps: true }
);

export default model("Player", PlayerSchema);
