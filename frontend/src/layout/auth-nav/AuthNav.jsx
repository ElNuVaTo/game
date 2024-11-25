import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { useEffect, useState } from "react";

const AuthDiscord = import.meta.env.VITE_AUTHORIZE_URL;

const AuthNav = () => {
  const location = useLocation();
  const [discordActive, setDiscordActive] = useState(false);

  useEffect(() => {
    if (location.pathname === "/register") {
      setDiscordActive(true);
    } else {
      setDiscordActive(false);
    }
  }, [location.pathname]);

  useEffect;

  return (
    <>
      <nav className="w-full max-w-64 xl:max-w-2xl flex flex-col xl:justify-evenly xl:flex-row gap-5 p-5 rounded-xl z-40 m-auto left-0 right-0 transition-all duration-500 ease-in-out xl:bottom-8 absolute bottom-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white w-full max-w-52 ${
              isActive ? "bg-blue-600" : "bg-slate-600"
            } py-2 px-4 font-medium text-sm w-full text-center rounded-xl`
          }
          aria-label="Comienza como invitado"
          draggable={false}
        >
          Comienza como invitado
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-white w-full max-w-52 ${
              isActive ? "bg-blue-600" : "bg-slate-600"
            } py-2 px-4 font-medium text-sm w-full text-center rounded-xl`
          }
          aria-label="Iniciar sesión"
          draggable={false}
        >
          Entrar a mi cuenta
        </NavLink>

        <NavLink
          to={AuthDiscord}
          className={`flex items-center justify-center gap-2 w-full max-w-52 ${
            discordActive ? "bg-blue-600" : "bg-slate-600"
          } text-white font-medium text-sm py-2 px-4 rounded-xl`}
          draggable={false}
        >
          <FaDiscord className="w-5 h-5" />
          Registrarse
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
};

export default AuthNav;
