import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

// Pages
import Auth from "@/pages/auth/Auth";
import Room from "@/pages/room/Room";
import InGame from "@/pages/room-in-game/InGame";

// Routers Frontend
import ROUTER from "@/router/Router";
import Chat from "./layout/chat/Chat";

// Layout Global
const LayoutGlobal = () => {
  const location = useLocation(); // Usa una constante en lugar de sobrescribir location

  // Ejemplo: Lógica condicional para personalizar el layout según la ruta
  const Auth = location.pathname === ROUTER.AUTH;

  return (
    <>
      {!Auth && <Chat />}

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
        path: ROUTER.AUTH,
        element: <Auth />,
      },
      {
        path: ROUTER.ROOM,
        element: <Room />,
      },
      {
        path: ROUTER.ROOM_IN_GAME,
        element: <InGame />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
