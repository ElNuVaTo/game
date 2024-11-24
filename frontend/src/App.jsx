import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

// Pages
import Invited from "@/pages/auth/Invited";
import AuthJoin from "@/pages/auth/AuthJoin";
import AuthRegister from "@/pages/auth/AuthRegister";

import Room from "@/pages/room/Room";

// Routers Frontend
import Chat from "./layout/chat/Chat";
import Bg from "./layout/bg/Bg";
import Nav from "./layout/navegacion/Nav";
import Card from "./components/Card";

const i = import.meta.env;

const ROUTER = {
  home: i.VITE_HOME,
  login: i.VITE_LOGIN,
  register: i.VITE_REGISTER,

  //Despues de iniciar sesion  de cualquier forma
  room: i.VITE_ROOM,
  roomIngame: "",

  profile: "",
  creation: i.VITE_CREATION,

  admin: "",
};

// Layout Global
const LayoutGlobal = () => {
  const location = useLocation();

  // Verifica las rutas
  console.log("Current Path:", location.pathname);
  console.log("Home Path:", ROUTER.home);

  // Verifica si la ruta actual es home, login o register
  const isAuthRoute = [ROUTER.home, ROUTER.login, ROUTER.register].includes(
    location.pathname
  );

  return (
    <>
      {!isAuthRoute && <Nav />}

      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutGlobal />, // Renderiza LayoutGlobal como contenedor
    children: [
      {
        path: ROUTER.home,
        element: <Invited />,
      },
      {
        path: ROUTER.login,
        element: <AuthJoin />,
      },
      {
        path: ROUTER.register,
        element: <AuthRegister />,
      },
      {
        path: ROUTER.room,
        element: <Room />,
      },

      {
        path: ROUTER.creation,
        element: <Room />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Bg />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
