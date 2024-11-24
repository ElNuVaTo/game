import { useState } from "react";

import HUD from "@/layout/players/HUD";
import CarruselFilters from "./components/swiper/CarruselFilters";
import CarruselPopular from "./components/swiper/CarruselPopular";
import RoomSettings from "./components/settings/RoomSettings";
import Chat from "@/layout/chat/Chat";

const Sala = () => {
  const [searchForText, setSearchForText] = useState("");
  const [category, setcategory] = useState("");

  return (
    <>
      <HUD />
      <RoomSettings />
      <Chat />

      <div className="flex flex-col gap-16 my-16">
        <CarruselPopular />
        <CarruselFilters
          category={category}
          setcategory={setcategory}
          searchForText={searchForText}
          setSearchForText={setSearchForText}
        />
      </div>
    </>
  );
};

export default Sala;
