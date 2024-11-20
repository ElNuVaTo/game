import { Schema, model } from "mongoose";

// Esquema para las respuestas dentro de una pregunta
const replySchema = new Schema({
  text: { type: String, required: false },
  src: { type: String, required: true },
  correct: { type: Boolean, required: true },
});

// Esquema para las preguntas
const questionSchema = new Schema({
  title: { type: String, required: false },
  src: { type: String, required: true },
  reply: [replySchema], // Array de respuestas
});

// Esquema para la estructura principal
const mainContentSchema = new Schema({
  nameMap: { type: String, required: true },
  title: { type: String, required: false },
  src: { type: String, required: true },
});

// Esquema para el autor
const authorSchema = new Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
});

// Esquema completo para los datos del modelo
const quizSchema = new Schema({
  author: { type: authorSchema, required: true },
  mainContent: { type: mainContentSchema, required: true },
  questions: [questionSchema], // Array de preguntas
});

// Crear el modelo

export default model("Quiz", quizSchema);
