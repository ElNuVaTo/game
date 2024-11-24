import express from "express";

import createPlayerWithDiscord from "../controllers/auth/creation.js";
import JoinAccount from "../controllers/auth/login.js";

import createPlayerTemp from "../controllers/temp/creation.js";

import roomCreation from "../controllers/roomCreation.js";
import roomJoin from "../controllers/roomJoin.js";
import roomInfomation from "../controllers/roomInfomation.js";

import createQuiz from "../controllers/postCreationMapQuiz.js";
import getAllQuizzes from "../controllers/getQuiz.js";

import { useBcrypt } from "../middlewares/passwordBcrypt.js";

// Middles
import { middleTokenTemp } from "../middlewares/tokenPlayerInvited.js";

const router = express.Router();

// Usuarios de discord
router.post("/discord/creation/player", useBcrypt, createPlayerWithDiscord);
router.post("/discord/join/player", JoinAccount);

// Usuario temporal
router.post("/temp/creation/player", createPlayerTemp, middleTokenTemp);

// Room
router.post("/creation/room", roomCreation);
router.patch("/join/room", roomJoin);
router.get("/info/room/", roomInfomation);

//Maps
router.get("/quizzes", getAllQuizzes);

// InGame
router.post("/creation/quiz", createQuiz);

export default router;
