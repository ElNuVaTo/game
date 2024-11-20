import express from "express";
import createUser from "../controllers/postCreationUser.js";

import getLobbyInfo from "../controllers/getLobbyInfo.js";
import createLobby from "../controllers/postCreationLobby.js";
import joinLobby from "../controllers/patchJoinRoom.js"

import createQuiz from "../controllers/postCreationMapQuiz.js";
import getAllQuizzes from "../controllers/getQuiz.js"

const router = express.Router();

// Asignar la ruta al controlador
router.post("/creation/user", createUser);

// Room
router.get("/information/lobby/:invitedCode", getLobbyInfo);
router.post("/creation/lobby", createLobby);
router.patch("/join/lobby", joinLobby)

//Maps 
router.get("/quizzes", getAllQuizzes);

// InGame
router.post("/creation/quiz", createQuiz);

export default router;
