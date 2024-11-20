import mongoose from "mongoose";
import Quiz from "../models/quiz.js";

const getAllQuizzes = async (req, res) => {
  try {
    // Obtener todos los quizzes de la base de datos
    const quizzes = await Quiz.find();

    // Verificar si no hay quizzes en la base de datos
    if (!quizzes.length) {
      return res.status(404).json({ message: "No hay quizzes disponibles" });
    }

    // Enviar todos los quizzes encontrados
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los quizzes" });
  }
};

export default getAllQuizzes;
