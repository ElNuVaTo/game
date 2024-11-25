import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/gatito-pregunton.webp";
import axios from "axios";

// Componentes
import Input from "@/components/Input";

// Iconos
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

// Env
const backendUrl = import.meta.env.VITE_URL_BACKEND;
const JoinAccount = `${backendUrl}${import.meta.env.VITE_JOIN_ACCOUNT}`;
const CreationRoom = `${backendUrl}${import.meta.env.VITE_CREATION_ROOM}`;
const JoinRoom = `${backendUrl}${import.meta.env.VITE_JOIN_ROOM}`;

const generarSala = () => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codigo = "";
  for (let i = 0; i < 8; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indiceAleatorio];
  }
  return codigo;
};

const JoinAuthForm = () => {
  const navigate = useNavigate();
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const [buttonRoomStyle, setButtonRoomStyle] = useState(false);
  const [permitedSubmit, setPermitedSubmit] = useState(false);
  const [noRepeatCreationRoom, setNoRepeatCreationRoom] = useState(false);

  // Estados locales para el formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invitedCode, setInvitedCode] = useState("");

  useEffect(() => {
    setButtonRoomStyle(invitedCode !== "");
  }, [invitedCode]);

  useEffect(() => {
    setPermitedSubmit(username === "" || password === "");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    const user = { username, password };

    try {
      const playerResponse = await axios.post(JoinAccount, user, {
        headers,
        withCredentials: true,
      });
      console.log("Respuesta del usuario:", playerResponse.data);

      // Unirse a la sala si hay un código de invitación
      if (invitedCode) {
        const joinRoomResponse = await axios.patch(
          JoinRoom,
          { invitedCode },
          {
            headers,
            withCredentials: true,
          }
        );
        console.log("Respuesta de la sala:", joinRoomResponse.data);
        alert("Te has unido a la sala con éxito");
        navigate(`../cat/room/${invitedCode}`);
        return;
      }
    } catch (error) {
      console.error("Error durante el proceso:", error);
      alert("No se encontró ninguna coincidencia");
    }
  };

  const handleCreationRoom = async (code) => {
    if (noRepeatCreationRoom) {
      return;
    }

    setNoRepeatCreationRoom(true);
    setTimeout(() => setNoRepeatCreationRoom(false), 5000);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const roomResponse = await axios.post(
        CreationRoom,
        { invitedCode: code },
        {
          headers,
          withCredentials: true,
        }
      );

      console.log("Sala creada:", roomResponse.data);
    } catch (error) {
      console.error("Error al crear la sala:", error);
    }
  };

  return (
    <div className="relative items-center overflow-hidden">
      <span className="absolute top-0 left-0 z-10 w-[1.5px] h-full lineaLogin"></span>
      <span className="absolute top-0 right-0 z-10 w-[1.5px] h-full lineaLogin"></span>

      <header className="rounded-full w-max m-auto mb-10 relative photoHome bg-[#383737]">
        <img
          className="w-20 h-20 mx-auto rounded-full object-cover select-none p-2"
          src={Logo}
          draggable={false}
          alt="Profile"
          loading="eager"
        />
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <Input
          type="text"
          label="Nombre de usuario"
          name="username"
          required={true}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          // validation={err}
          // errMessage="Demasiado largo intenta otro!"
          padding="pr-9"
        >
          <FaUser className="absolute w-5 h-5 m-auto top-0 bottom-0 right-2.5 icons-color" />
        </Input>

        <Input
          type={hiddenPassword ? "text" : "password"}
          label="Contraseña"
          name="username"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          // validation={err}
          // errMessage="Demasiado largo intenta otro!"
          padding="pr-9"
        >
          {hiddenPassword ? (
            <FaEye
              className="absolute w-5 h-5 m-auto top-0 bottom-0 right-2.5 icons-color cursor-pointer"
              onClick={() => setHiddenPassword(!hiddenPassword)}
            />
          ) : (
            <FaEyeSlash
              className="absolute w-5 h-5 m-auto top-0 bottom-0 right-2.5 icons-color cursor-pointer"
              onClick={() => setHiddenPassword(!hiddenPassword)}
            />
          )}
        </Input>

        <Input
          type="text"
          label="Codigo para unirte"
          name="codigo"
          required={false}
          onChange={(e) => setInvitedCode(e.target.value)}
          value={invitedCode}
          // validation={err}
          // errMessage="Demasiado largo intenta otro!"
          padding="pr-[114px]"
        >
          <button
            onClick={async () => {
              const newCode = generarSala();
              setInvitedCode(newCode);
              await handleCreationRoom(newCode);
            }}
            type="button"
            className={`absolute w-20 h-6 m-auto top-0 bottom-0  rounded-sm right-1.5 icons-color text-white hover:bg-second-color-focus  ${
              buttonRoomStyle ? "bg-second-color-focus" : "bg-second-color"
            }`}
          >
            <p className="text-gray-800 font-semibold text-sm">Crear sala</p>
          </button>
        </Input>

        <input
          className={`w-full text-sm bg-slate-800 hover:bg-slate-700 rounded-md text-white font-semibold py-3 px-6 cursor-pointer mx-auto transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 ${
            permitedSubmit
              ? "bg-second-color brightness-50 cursor-not-allowed"
              : "bg-second-color-focus cursor-pointer"
          }`}
          type="submit"
          value={buttonRoomStyle ? "Unirme e iniciar sesion" : "Iniciar sesion"}
          disabled={permitedSubmit}
        />
      </form>
    </div>
  );
};

export default JoinAuthForm;
