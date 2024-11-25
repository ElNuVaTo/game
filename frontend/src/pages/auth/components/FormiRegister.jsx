import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Componentes
import Input from "@/components/Input";

// Hooks
import { useDiscordAuth } from "@/services/Discord";

// Iconos
import { FaUser } from "react-icons/fa";
import Logo from "@/assets/gatito-pregunton.webp";

// Env
const CreationAccount = import.meta.env.VITE_AUTH_CREATION;

const Register = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const { userData } = useDiscordAuth(code);

  const [buttonActive, setButtonActive] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userData && userData.username && password) {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  }, [userData, password]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get("code");

    if (codeFromUrl) {
      setCode(codeFromUrl);

      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, "", cleanUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { avatarUrl, global_name, id, username } = userData;

    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      avatarUrl,
      global_name,
      id,
      username,
      password,
    };

    console.log(data);

    try {
      const playerResponse = await axios.post(CreationAccount, data, {
        headers,
      });
      console.log(playerResponse);

      alert("¡Cuenta creada!, Inicia sesion");
      navigate(`/login`);
    } catch (error) {
      console.error("Error durante el proceso:", error);
      alert("Esta cuenta ya se encuentra registrada!");
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
          value={userData && userData.username ? userData.username : ""}
          inputConfig={{ autoComplete: "off" }}
          onChange={() => {}}
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
          inputConfig={{ autoComplete: "new-password" }}
          iconComponent={false}
          buttonText={"Registrarse"}
          buttonActive={buttonActive}
        />
      </form>
    </>
  );
};

export default Register;
