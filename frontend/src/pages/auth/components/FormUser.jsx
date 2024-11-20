import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Estados gloables
import { StoreRoom } from "@/global/Room";
import { StoreDiscord } from "@/global/Discord";
import { StoreIDUser } from "@/global/UserIDwithDB";

// Iconos
import { FaDiscord, FaUser } from "react-icons/fa";

// Hooks
import randomPhoto from "./InitialPhoto";
import useDiscordAuth from "../services/DiscordAuth";

// Env
const discordAuthUrl = import.meta.env.VITE_URL;
const PostCreationUser = import.meta.env.VITE_API_POST_USER;
const PostCreationLobby = import.meta.env.VITE_API_POST_LOBBY;
const PatchJoinLobby = import.meta.env.VITE_API_PATCH_LOBBY;

const Inicio = () => {
  const navigate = useNavigate();
  const randomImage = randomPhoto();

  const { setUserId, setUsername, setAvatar, setGlobalName } = StoreDiscord();
  const { userId, username, avatar, globalName } = StoreDiscord();
  const { setLobbyID, setRoomCode } = StoreRoom();
  const { setUseridDB } = StoreIDUser();

  // Datos del usuario
  const [avatarPhoto, setAvatarPhoto] = useState(randomImage);
  const [global_name, setGlobal_name] = useState("");
  const [usernameDC, setUsernameDC] = useState("");
  const [id, setID] = useState("");

  // Codigo de invitacion
  const [invitedCode, setInvitedCode] = useState("");
  const [idRoom, setIDRoom] = useState("");

  // Sincronizar datos en estados globales
  useEffect(() => {
    if (invitedCode) setRoomCode(invitedCode);
    if (idRoom) setLobbyID(idRoom);

    if (userId) setID(userId);
    if (globalName) setGlobal_name(globalName);
    if (username) setUsernameDC(username);
    if (avatar) setAvatarPhoto(avatar);
  }, [invitedCode, idRoom, userId, username, avatar, globalName]);

  // Usar el parametro para hacer una llamada
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const fetchData = async () => {
        try {
          // Llamada a tu función de autenticación
          const { id, username, avatar, global_name } = await useDiscordAuth(
            code
          );
          setUserId(id);
          setUsername(username);
          setAvatar(`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`);
          setGlobalName(global_name);

          // Elimina los parámetros de la URL después de usarlos
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        } catch (error) {
          console.error("Error while fetching user data:", error);
        }
      };

      fetchData();
    }
  }, []);

  const generarSala = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < 8; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indiceAleatorio];
    }
    return setInvitedCode(codigo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    const user = {
      avatar,
      global_name,
      ...(usernameDC && { username }),
      ...(id && { id }),
    };

    try {
      // Crear al usuario
      const userResponse = await axios.post(PostCreationUser, user, {
        headers,
      });
      const databaseID = userResponse.data._id;

      // Crear o validar la existencia del lobby
      const lobbyResponse = await axios.post(
        PostCreationLobby,
        { invitedCode },
        { headers }
      );

      setUseridDB(lobbyResponse.data._id);
      // Unirse al lobby
      const joinResponse = await axios.patch(
        PatchJoinLobby,
        {
          invitedCode,
          informationPlayers: [databaseID],
        },
        { headers }
      );

      const lobbyID = lobbyResponse.data._id;
      setIDRoom(lobbyID);
      setUseridDB(databaseID);

      // Navegar a la sala
      navigate(`/room/${invitedCode}`);
    } catch (error) {
      console.error("Error durante el proceso:", error);
      // Manejo de errores genérico
      alert("Hubo un problema. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="relative p-8 w-[320px]">
      <span className="bg-white absolute top-0 left-0 z-10 w-[1.5px] h-full lineaLogin"></span>
      <span className="bg-white absolute top-0 right-0 z-10 w-[1.5px] h-full lineaLogin"></span>

      <header className="rounded-full w-20 h-20 m-auto mb-10 relative">
        <img
          className="w-20 h-20 mx-auto mb-5 rounded-full object-cover"
          src={avatarPhoto}
          alt="Profile"
          loading="eager"
        />
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="w-full max-w-sm min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-600 text-white text-sm border border-slate-600 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-500 shadow-sm focus:shadow"
              placeholder="Nombre de usuario"
              value={global_name}
              required
              onChange={(e) => {
                if (!id) setGlobal_name(e.target.value); // Permitir cambios solo si `id` no está definido.
              }}
            />

            <FaUser className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600" />
          </div>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <div className="relative">
            <input
              type="password"
              className="w-full bg-transparent  placeholder:text-slate-600 text-sm border border-slate-600 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-500 shadow-sm focus:shadow"
              placeholder="Codigo"
              value={invitedCode}
              maxLength="8"
              onChange={(e) => setInvitedCode(e.target.value)}
              required
              autoComplete="one-time-code"
            />
            <button
              className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={generarSala}
            >
              Generar sala
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center overflow-hidden rounded-lg">
          <input
            className="flex-1 text-sm bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4  cursor-pointer "
            type="submit"
            value="A Jugar"
          />

          <a
            href={discordAuthUrl}
            className="flex items-center gap-2 bg-indigo-600 text-white text-nowrap text-sm py-2 px-4 font-bold hover:bg-indigo-700  "
          >
            <FaDiscord className="w-5 h-5" />
            Iniciar con discord
          </a>
        </div>
      </form>
    </div>
  );
};

export default Inicio;
