import { Schema, model } from "mongoose";

const PlayerSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    global_name: {
      type: String,
      required: true,
    },

    id: {
      type: String,
    },
    maps: [],

    username: {
      type: String,
    },
    registered: {
      type: Boolean,
      default: true, // True = "Soy un usuario registrado" , False = "Soy un usuario temporal"
    },
  },
  { timestamps: true }
);

export default model("Player", PlayerSchema);
