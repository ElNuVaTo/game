import CarruselFilters from "./components/swiper/CarruselFilters";
import CarruselPopular from "./components/swiper/CarruselPopular";
import RoomSettings from "./components/settings/RoomSettings";

const Sala = () => {
  return (
    <>
      <RoomSettings />

      <div className="flex flex-col gap-16 my-16">
        <CarruselPopular />
        <CarruselFilters />
      </div>
    </>
  );
};

export default Sala;
