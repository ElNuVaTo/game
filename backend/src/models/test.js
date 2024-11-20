import { Schema, model } from "mongoose";

const TestSchema = new Schema({
  mainContent: {
    title: { type: String, required: true },
    photo: { type: String, required: true },
    author: { type: String, required: true },
    oficialOrComunitty: { type: String, enum: ["Oficial", "Community"], required: true },
    type: { type: String, enum: ["test"], required: true }
  },
  review: {
    timesPlayed: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
  },
  inGame: [
    {
      title: { type: String, required: true },
      correctAnswer: { type: String, required: true }, // Solo una respuesta correcta
      options: [
        {
          text: { type: String, required: true }
        }
      ]
    }
  ]
});

// Crear el modelo basado en el esquema
export default model("Test", TestSchema);
