import { useState, useEffect } from "react";
import PlayerComponent from "./Player";
import axios from "axios";

const GetInfoRoom = import.meta.env.VITE_INFORMATION_ROOM;

const PlayerHUD = () => {
  const [dataPlayers, setDataPlayers] = useState([]);

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const response = await axios.get(`${GetInfoRoom}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        return setDataPlayers(response.data);
      } catch (error) {
        console.error("Error al obtener la información de la sala", error);
        throw error;
      }
    };

    fetchRoomInfo();
  }, []);

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
