import React, { useState, useEffect } from "react";
import { useGetInformationLobby } from "./AxiosGetInformation";
import { io } from "socket.io-client";

import PlayerComponent from "./Player";

//Global
import { StoreRoom } from "../../global/Room";

// HUD del jugador
const PlayerHUD = () => {
  const { invitedLink, lobbyID } = StoreRoom(); // Asumí que lobbyCode está en el store
  const [dataPlayers, setDataPlayers] = useState([]);

  const [PlayerIzqHUD, setPlayerIzqHUD] = useState([]);
  const [PlayerDerHUD, setPlayerDerHUD] = useState([]);

  // Función para repartir a los jugadores
  const repartirJugadores = () => {
    const izquierda = [];
    const derecha = [];

    // Asignar jugadores de manera alternada
    dataPlayers.forEach((player, index) => {
      if (index % 2 === 0) {
        izquierda.push(player);
      } else {
        derecha.push(player);
      }
    });

    // Actualizar los estados con los jugadores repartidos
    setPlayerIzqHUD(izquierda);
    setPlayerDerHUD(derecha);
  };

  useEffect(() => {
    repartirJugadores(); // Repartir jugadores cuando dataPlayers cambie
  }, [dataPlayers]);

  // Llamada a la API cuando lobbyID cambia
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (invitedLink) {
          const data = await useGetInformationLobby(
            invitedLink,
            setDataPlayers
          );
          setDataPlayers(data.informationPlayers || []); // Asegúrate de que 'informationPlayers' exista
        }
      } catch (error) {
        console.error("Error al obtener los jugadores:", error);
      }
    };

    fetchData();
  }, [invitedLink]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Conectado al servidor");
      socket.emit("El ID de la sala es:", lobbyID);
    });

    // Escucha el evento 'actualizar-jugadores' cuando un jugador entra o sale
    socket.on("actualizar-jugadores", (players) => {
      // console.log("Jugadores actualizados:", players);
      setDataPlayers(players); // Actualiza la lista de jugadores
    });

    // Escucha el evento 'lobby-info' si es necesario
    socket.on("lobby-info", (data) => {
      // console.log("Información del lobby:", data);
      setDataPlayers(data.informationPlayers || []);
    });

    return () => {
      socket.disconnect(); // Limpia la conexión cuando el componente se desmonta
    };
  }, [invitedLink]);

  return (
    <>
      <div className="flex justify-end fixed bottom-5 w-max right-[50px] h-[50px]">
        <div className="absolute bottom-10 flex gap-6 flex-row-reverse">
          <span className="line-container w-full -bottom-6"></span>

          <div className="flex gap-6">
            <PlayerComponent dataPlayers={PlayerIzqHUD} />
            <PlayerComponent dataPlayers={PlayerIzqHUD} />
            <PlayerComponent dataPlayers={PlayerIzqHUD} />
            <PlayerComponent dataPlayers={PlayerIzqHUD} />
          </div>

          <div className="flex gap-6">
            <PlayerComponent dataPlayers={PlayerIzqHUD} />
            <PlayerComponent dataPlayers={PlayerIzqHUD} />
            <PlayerComponent dataPlayers={PlayerIzqHUD} />
            <PlayerComponent dataPlayers={PlayerIzqHUD} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerHUD;
