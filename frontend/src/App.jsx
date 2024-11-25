import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Invited from "@/pages/auth/Invited";
import AuthJoin from "@/pages/auth/AuthJoin";
import AuthRegister from "@/pages/auth/AuthRegister";
import Room from "@/pages/room/Room";

import Bg from "./layout/bg/Bg";
import Nav from "./layout/navegacion/Nav";
import AuthNav from "./layout/auth-nav/AuthNav";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Bg />

        <Routes>
          <Route element={<AuthNav/>}>
            <Route path="" index element={<Invited />} />
            <Route path="login" element={<AuthJoin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          <Route path="room" element={<Nav />}>
            <Route path=":code" element={<Room />} />
            <Route path=":code/in-game" element={<Room />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
