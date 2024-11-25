import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Componentes
import Input from "@/components/Input";
import Logo from "@/assets/gatito-pregunton.webp";

//Hooks
import { randomPhoto } from "./randomPhoto";

// Iconos
import { FaUser } from "react-icons/fa";

// Env
const Creation = import.meta.env.VITE_AUTH_TEMP;
const JoinRoom = import.meta.env.VITE_JOIN_ROOM;

const InvitedForm = () => {
  const navigate = useNavigate();

  // Estados locales para el formulario
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
      avatarUrl: randomPhoto,
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
    <>
      <header className="rounded-full w-20 h-20 m-auto mb-10 relative photoHome bg-[#383737]">
        <span className="absolute top-0 left-0 z-10 w-[1.5px] h-full lineaLogin"></span>
        <span className="absolute top-0 right-0 z-10 w-[1.5px] h-full lineaLogin"></span>
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
          label="Apodo"
          name="username"
          required={true}
          onChange={(e) => setGlobalName(e.target.value)}
          value={globalName}
          inputConfig={{ autoComplete: "apodo" }}
          iconComponent={true}
        >
          <FaUser />
        </Input>

        <Input
          type="text"
          label="Ingresa el codigo"
          name="codigo"
          required={true}
          onChange={(e) => setInvitedCode(e.target.value)}
          inputConfig={{ autoComplete: "off" }}
          value={invitedCode}
          iconComponent={false}
          buttonText={"Unirse"}
          buttonActive={buttonActive}
        ></Input>
      </form>
    </>
  );
};

export default InvitedForm;
