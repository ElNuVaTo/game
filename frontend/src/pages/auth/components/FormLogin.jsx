import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Componentes
import Input from "@/components/Input";

// Iconos
import { FaUser } from "react-icons/fa";
import Logo from "@/assets/gatito-pregunton.webp";

// Env
const JoinAccount = import.meta.env.VITE_JOIN_ACCOUNT;

const JoinAuthForm = () => {
  const navigate = useNavigate();
  const [buttonActive, setButtonActive] = useState(false);

  // Estados locales para el formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setButtonActive(username === "" || password === "");
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

      navigate("../room/nose");
    } catch (error) {
      console.error("Error durante el proceso:", error);
      alert("No se encontró ninguna coincidencia");
    }
  };

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
          label="Nombre de usuario"
          name="username"
          required={true}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          inputConfig={{ autoComplete: "username" }}
          iconComponent={true}
        >
          <FaUser />
        </Input>

        <Input
          type="password"
          label="Contraseña"
          name="username"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          inputConfig={{ autoComplete: "current-password" }}
          iconComponent={false}
          buttonText={"Iniciar"}
          buttonActive={buttonActive}
        ></Input>
      </form>
    </>
  );
};

export default JoinAuthForm;
