import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/gatito-pregunton.webp";
import axios from "axios";
import clsx from "clsx";
import { randomPhoto } from "./randomPhoto";

// Componentes
import Input from "@/components/Input";

// Iconos
import { FaUser } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

// Env
const backendUrl = import.meta.env.VITE_URL_BACKEND;
const Creation = `${backendUrl}${import.meta.env.VITE_AUTH_TEMP}`;
const JoinRoom = `${backendUrl}${import.meta.env.VITE_JOIN_ROOM}`;

const InvitedForm = () => {
  const navigate = useNavigate();

  // Estados locales para el formulario
  const [avatar, setAvatar] = useState(randomPhoto);
  const [globalName, setGlobalName] = useState("");
  const [invitedCode, setInvitedCode] = useState("");
  const [buttonActive, setButtonActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    const user = {
      global_name: globalName,
      avatar,
    };

    try {
      const playerResponse = await axios.post(Creation, user, {
        headers,
        withCredentials: true,
      });

      const joinRoomResponse = await axios.patch(
        JoinRoom,
        { invitedCode },
        {
          headers,
          withCredentials: true,
        }
      );

      console.log(joinRoomResponse);
      console.log(playerResponse);

      navigate(`cat/room/${invitedCode}`);
    } catch (error) {
      console.error("Error durante el proceso:", error);
      alert("No se encontró ninguna coincidencia");
    }
  };

  useEffect(() => {
    setButtonActive(globalName === "" || invitedCode === "");
  }, [globalName, invitedCode]);

  return (
    <div className="relative p-5 px-8 py-10 w-[320px] flex flex-col items-center overflow-hidden">
      <span className="absolute top-0 left-0 z-10 w-[1.5px] h-full lineaLogin"></span>
      <span className="absolute top-0 right-0 z-10 w-[1.5px] h-full lineaLogin"></span>

      <form onSubmit={handleSubmit} className="mb-5 w-22 h-22 rounded-full">
        <header className="rounded-full w-20 h-20 m-auto mb-5 relative photoHome bg-[#383737]">
          <img
            className="w-20 h-20 mx-auto mb-5 rounded-full object-cover select-none p-2"
            src={Logo}
            draggable={false}
            alt="Profile"
            loading="eager"
          />
        </header>
      </form>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <Input
          type="text"
          label="Apodo"
          name="username"
          required={true}
          onChange={(e) => setGlobalName(e.target.value)}
          value={globalName}
          // validation={err}
          // errMessage="Demasiado largo intenta otro!"
          padding="pr-9"
        >
          <FaUser className="absolute w-5 h-5 m-auto top-0 bottom-0 right-2.5 icons-color" />
        </Input>

        <Input
          type="text"
          label="Ingresa el codigo"
          name="codigo"
          required={true}
          onChange={(e) => setInvitedCode(e.target.value)}
          value={invitedCode}
          // validation={err}
          // errMessage="Demasiado largo intenta otro!"
          padding="pr-[102px]"
        >
          <button
            disabled={buttonActive}
            type="submit"
            className={`absolute w-20 h-6 m-auto top-0 bottom-0  rounded-sm right-1.5 icons-color bg-black text-white hover:bg-second-color-focus ${
              buttonActive
                ? "bg-second-color brightness-50 cursor-not-allowed"
                : "bg-second-color-focus cursor-pointer"
            }`}
          >
            <p className="text-gray-800 font-semibold text-sm">Unirse</p>
          </button>
        </Input>
      </form>
    </div>
  );
};

export default InvitedForm;
