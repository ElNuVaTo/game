import { Schema, model } from "mongoose";

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
    informationPlayers: [
      {
        type: Schema.Types.ObjectId, // Esto es correcto para referirse al modelo Player
        ref: "Player", // Referencia al modelo de jugadores (debe ser 'Player', si ese es el nombre de tu modelo)
      },
    ],
    mapsSelect: [
      {
        mapId: {
          type: String,
          // required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model("Room", RoomSchema);
