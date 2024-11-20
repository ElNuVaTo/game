import { useState } from "react";

import HUD from "@/layout/players/HUD";
import CarruselFilters from "./components/swiper/CarruselFilters";
import CarruselPopular from "./components/swiper/CarruselPopular";

const Sala = () => {
  const [searchForText, setSearchForText] = useState("");
  const [category, setcategory] = useState("");

  return (
    <>
      <HUD />

      <div className="flex  flex-col justify-center items-center mx-auto p-5">
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
