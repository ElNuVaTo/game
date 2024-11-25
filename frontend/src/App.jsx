import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Layouts
import Bg from "./layout/bg/Bg";
import Nav from "./layout/navegacion/Nav";
import AuthNav from "./layout/auth-nav/AuthNav";

// Pages
import Guest from "@/pages/auth/Guest";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import Room from "@/pages/room/Room";
import Chat from "./layout/chat/Chat";
import Hud from "./layout/players/HUD";

const AuthLayout = () => {
  return (
    <>
      <AuthNav/>
      <Outlet />
    </>
  );
};

const RoomLayout = () => {
  return (
    <>
      <Nav />
      <Chat />
      <Hud />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Bg />

        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="" index element={<Guest />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="room" element={<RoomLayout />}>
            <Route path=":code" element={<Room />} />
            <Route path=":code/in-game" element={<Room />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
