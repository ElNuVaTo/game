import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Hooks
import useDiscordAuth from "../services/DiscordAuth";

// Componentes
import Input from "@/components/Input";

// Iconos
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import Logo from "@/assets/gatito-pregunton.webp";

// Env
const backendUrl = import.meta.env.VITE_URL_BACKEND;
const Creation = `${backendUrl}${import.meta.env.VITE_AUTH_DISCORD_CREATION}`;

const Register = () => {
  const navigate = useNavigate();
  const [hiddenPassword, setHiddenPassword] = useState(false);

  // Estados locales para el formulario
  const [globalName, setGlobalName] = useState("");
  const [ID, setID] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const fetchData = async () => {
        try {
          const { id, username, avatar, global_name } = await useDiscordAuth(
            code
          );
          setID(id);
          setUsername(username);
          setAvatar(`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`);
          setGlobalName(global_name);

          console.log(id, username, avatar, global_name);

          // Limpiar la URL eliminando el parámetro "code"
          const cleanUrl = window.location.origin + window.location.pathname;

          // Reemplazar la URL sin el parámetro "code"
          window.history.replaceState(null, "", cleanUrl);
        } catch (error) {
          console.error("Error while fetching user data:", error);
        }
      };

      fetchData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      global_name: globalName,
      id: ID,
      username: username,
      password: password,
      avatar: avatar,
    };

    console.log(data);

    try {
      // Crear al usuario
      const playerResponse = await axios.post(Creation, data, { headers });
      console.log(playerResponse);

      alert("¡Cuenta creada!, Inicia sesion");
      navigate(`/cat/login`);
    } catch (error) {
      console.error("Error durante el proceso:", error);
      alert("Algo fallo pero no se que fue dx");
    }
  };

  return (
    <div className="relative p-5 px-8 py-10 w-[320px] flex flex-col items-center overflow-hidden">
      <span className="absolute top-0 left-0 z-10 w-[1.5px] h-full lineaLogin"></span>
      <span className="absolute top-0 right-0 z-10 w-[1.5px] h-full lineaLogin"></span>

      <header className="rounded-full w-22 h-22 m-auto mb-10 relative photoHome bg-[#383737]">
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

        <input
          className="w-full text-sm bg-slate-800 hover:bg-slate-700 rounded-md text-white font-semibold py-3 px-6 cursor-pointer mx-auto transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500"
          type="submit"
          value="Crear cuenta"
        />
      </form>

      <a
        href="/cat/login"
        className="absolute top-[60%] gap-2  -left-20 flex justify-center items-center  rounded-full shadow-md transition duration-200 ease-in-out text-white text-lg font-bold"
        aria-label="Volver"
        draggable={false}
      >
        <IoMdArrowRoundBack />
        <p className="text-sm">Volver</p>
      </a>
    </div>
  );
};

export default Register;
