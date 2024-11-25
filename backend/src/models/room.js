import { Schema, model } from "mongoose";

// Definir el esquema de la sala
const RoomSchema = new Schema(
  {
    invitedCode: {
      type: String,
      required: true,
      unique: true,
    },
    mode: {
      type: String,
      enum: ["clasico", "ranked", "ia", "streamerChill", "streamerVs", "chill"],
    },
    roomPlayers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    chat: [],
    mapsSelect: [
      {
        mapId: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Modelo de Room
export default model("Room", RoomSchema);
