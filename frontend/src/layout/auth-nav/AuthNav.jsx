import { Link, Outlet, useLocation } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";

const AuthURL = import.meta.env.VITE_REDIRECT_URL;

const AuthNav = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      <nav className="absolute bottom-5 left-0 w-full select-none flex flex-col items-center py-4 z-10 gap-6">
        {/* Botón de "Jugar como invitado" */}
        {pathName !== "/" && (
          <Link
            to="/"
            className="text-white bg-slate-800 font-medium text-sm px-3 py-2 rounded-md shadow hover:bg-slate-700 hover:shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            aria-label="Volver al inicio"
            draggable={false}
          >
            Jugar como invitado
          </Link>
        )}

        {/* Botón de "Iniciar sesión" */}
        {pathName !== "/login" && (
          <Link
            to="/login"
            className="text-white bg-slate-600 font-medium text-sm px-3 py-2 rounded-md shadow hover:bg-blue-700 hover:shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            aria-label="Iniciar sesión"
            draggable={false}
          >
            Iniciar sesión
          </Link>
        )}

        {/* Botón de "Registrarse con Discord" */}
        <Link
          to={AuthURL}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 px-4 rounded-md shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400"
          draggable={false}
        >
          <FaDiscord className="w-5 h-5" />
          Registrarse con Discord
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default AuthNav;
