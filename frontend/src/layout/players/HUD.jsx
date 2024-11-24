import { useState, useEffect } from "react";
import { fetchRoomInfo } from "./RoomInfo";
import PlayerComponent from "./Player";

const PlayerHUD = () => {
  const [dataPlayers, setDataPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRoomInfo();
        setDataPlayers(data.roomPlayers || []);
      } catch (error) {
        console.error("Error al obtener los jugadores:", error);
      }
    };

    fetchData();
  }, []);

  console.log(dataPlayers);

  return (
    <>
      <div className="fixed w-max m-auto left-0 right-0  bottom-10">
        <div className="flex gap-10">
          <PlayerComponent dataPlayers={dataPlayers} />
        </div>
      </div>
    </>
  );
};

export default PlayerHUD;
