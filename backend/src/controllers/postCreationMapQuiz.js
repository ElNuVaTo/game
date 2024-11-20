import Quiz from "../models/quiz.js";

const createQuiz = async (req, res) => {
  // Obtener los datos del cuerpo de la solicitud
  const { author, mainContent, questions } = req.body;

  // Validaciones de los datos en mainContent
  if (!author.name || !author.src) {
    return res.status(400).json({ message: "Faltan rellenar el usuario" });
  }

  // Validar que todos los campos necesarios estén presentes en `mainContent`
  if (!mainContent.nameMap) {
    return res.status(400).json({ message: "Falta el nombre del mapa" });
  }

  if (!mainContent.title) {
    return res.status(400).json({ message: "Falta el titulo del banner" });
  }

  if (!mainContent.src) {
    return res.status(400).json({ message: "Agrega una imagen al banner" });
  }

  if (!questions || questions.length === 0) {
    return res.status(400).json({ message: "Faltan preguntas" });
  }

  try {
    // Crear un nuevo objeto Quiz con los datos del formulario
    const newQuiz = new Quiz({
      author,
      mainContent,
      questions,
    });

    // Guardar el quiz en la base de datos
    const savedQuiz = await newQuiz.save();

    // Responder con el quiz creado
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error("Error al guardar el quiz:", error);
    res.status(500).json({ message: "Error al crear el quiz" });
  }
};

export default createQuiz;
