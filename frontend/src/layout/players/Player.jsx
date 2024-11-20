import React, { useState, useEffect } from "react";
import LifeCircle from "./LifeCircle";

const PlayerComponent = ({ dataPlayers }) => {
  const [life, setLife] = useState(4); // Vida actual
  const [maxLife, setMaxLife] = useState(4); // Vida máxima

  useEffect(() => {
    // Lógica para cambiar la vida (ejemplo de reducción gradual)
    const interval = setInterval(() => {
      setLife((prevLife) => (prevLife > 0 ? prevLife - 1 : prevLife));
    }, 1000); // Resta un punto de vida cada segundo (puedes ajustarlo)

    return () => clearInterval(interval); // Limpiar intervalo cuando el componente se desmonte
  }, []);

  return (
    <>
      {dataPlayers.map((player, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-between relative rounded-2xl shadow-lg"
        >
          {/* Círculo de vida con animación */}
          <div className="relative w-16 h-16 flex items-center justify-center z-10">
            <LifeCircle life={life} maxLife={maxLife} />
            <img
              src={player.avatar}
              alt={player.username}
              className="w-14 h-14 object-cover rounded-full"
            />
          </div>

          {/* Información del jugador */}
          <div className="bg-[#0c1427] px-4 py-3 rounded-lg border-t-[1px] border-b dark relative shadow-md">
            <span
              className="bg-[#0c1427] absolute -top-12 left-1 h-16 w-16 rounded-lg "
              style={{
                clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
              }}
            ></span>
            <span
              className="bg-[#0c1427] absolute -top-12 right-1 h-16 w-16 rounded-lg "
              style={{
                clipPath: "polygon(0 0, 0% 100%, 100% 100%)",
              }}
            ></span>
            <p className="text-white text-sm text-center truncate">
              {player.global_name}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default PlayerComponent;
