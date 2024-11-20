import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate


const GameMode = () => {
  const navigate = useNavigate(); // Inicializa el hook useNavigate
  const [selectedMode, setSelectedMode] = useState(null); // Mantiene el modo seleccionado

  const handleModeSelect = (mode) => {
    setSelectedMode(mode); // Cambia el modo seleccionado al que se hace clic
  };

  const handleConfirmSelection = () => {
    if (selectedMode) {
      navigate(import.meta.env.VITE_LOBBY_ROUTE); // Redirigir a la ruta de lobby
    }
  };

  return (
    <>
      <section className="py-5 sm:py-10 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
            <div
              onClick={() => handleModeSelect("Enfrentate a la IA")}
              className={`bg-gray-800 cursor-pointer rounded p-5 border-2 border-gray-700${
                selectedMode === "Enfrentate a la IA" ? " border-green-500" : ""
              }`}
            >
              <div className="relative flex items-start justify-between">
                <div className="flex flex-col justify-between items-start">
                  <h3 className=" text-xl font-semibold text-white">
                    Enfrentate a la IA
                  </h3>
                  <b className="text-sm text-gray-400">Quiz</b>
                  
                </div>

                <img
                  src={""}
                  alt="Modo Desafío IA"
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>

              <p className="mt-2 text-base text-gray-100">
                Modificadores cada 5 preguntas | Generacion procedural | Modo
                cooperativo | 3 Vidas
              </p>
            </div>

            <div
              onClick={() => handleModeSelect("Modo clasico")}
              className={`cursor-pointer rounded p-5 border-2 border-gray-800${
                selectedMode === "Modo clasico" ? " border-green-500" : ""
              }`}
            >
              <div className="relative flex items-center justify-center mx-auto">
                <img
                  src="https://noticias-pe.laiglesiadejesucristo.org/media/960x540/Crecer-en-paciencia-y-sabiduria.jpeg"
                  className="w-36 h-20 object-cover rounded"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                Modo clasico
              </h3>
              <p className="mt-2 text-base text-gray-100">
                Enfrentamiento | Selecciona mapas | Vidas
              </p>
            </div>

            <div
              onClick={() => handleModeSelect("Streamer")}
              className={`cursor-pointer rounded p-5 border-2 border-gray-800${
                selectedMode === "Streamer" ? " border-green-500" : ""
              }`}
            >
              <div className="relative flex items-center justify-center mx-auto">
                <img
                  src="https://pbs.twimg.com/media/F6p5wfOW0AAH_4B.jpg"
                  alt="Modo Streamer"
                  className="w-36 h-20 object-cover rounded"
                />
              </div>
              <h3 className="relative flex justify-center mt-5 text-lg font-semibold text-white">
                Streamer
                <p className="absolute text-[10px] top-5 text-gray-300">
                  Youtube | Kick | Twtich
                </p>
              </h3>
              <p className="mt-3 text-base text-gray-100">
                VS la comunidad | Vidas | Chat Integrado |
              </p>
            </div>

            <div
              onClick={() => handleModeSelect("Chill moment")}
              className={`cursor-pointer rounded p-5 border-2 border-gray-800${
                selectedMode === "Chill moment" ? " border-green-500" : ""
              }`}
            >
              <div className="relative flex items-center justify-center mx-auto">
                <img
                  src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84cf33878980e0ae7b4b6e5381"
                  className="w-36 h-20 object-cover rounded"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                Chill moment
              </h3>
              <p className="mt-3 text-base text-gray-100">
                ¡No existen respuestas incorrectas! <br /> Conoce a tus amigos
                con estos tests
              </p>
            </div>

            <div
              onClick={() => handleModeSelect("Modo competitivo")}
              className={`cursor-pointer rounded p-5 border-2 border-gray-800${
                selectedMode === "Modo competitivo" ? " border-green-500" : ""
              }`}
            >
              <div className="relative flex items-center justify-center mx-auto">
                <img
                  src="https://static.wixstatic.com/media/770026_b6e203a6867047b59af87b9ddfad721e~mv2.jpg/v1/fill/w_696,h_711,al_c,q_85,enc_auto/770026_b6e203a6867047b59af87b9ddfad721e~mv2.jpg"
                  className="w-36 h-20 object-cover rounded"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                Modo competitivo
              </h3>
              <p className="mt-3 text-base text-gray-100">
                Cada jugador selecciona su fortaleza <br /> Solo 3 Vidas con
                gente aleatoria
              </p>
            </div>

            <div
              onClick={() => handleModeSelect("Chill Streamer")}
              className={`cursor-pointer rounded p-5 border-2 border-gray-800${
                selectedMode === "Chill Streamer" ? " border-green-500" : ""
              }`}
            >
              <div className="relative flex items-center justify-center mx-auto">
                <img
                  src="https://www.dexerto.com/cdn-image/wp-content/uploads/2024/08/01/kick-twitch-youtube-stats-2024.jpg"
                  className="w-36 h-20 object-cover rounded"
                />
              </div>
              <h3 className="relative flex justify-center mt-5 text-lg font-semibold text-white">
                Chill Streamer
                <p className="absolute text-[10px] top-5 text-gray-300">
                  Youtube | Kick | Twtich
                </p>
              </h3>
              <p className="mt-3 text-base text-gray-100">
                Conoce que tipo de comunidad tienes <br /> Chat Integrado
              </p>
            </div>
          </div>
          {/* Botón de Confirmar elección */}
          <div className="mt-12 text-center">
            <button
              onClick={handleConfirmSelection}
              className={`inline-flex px-5 py-2 font-medium text-white transition-all duration-200 rounded ${
                selectedMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              disabled={!selectedMode} // Deshabilitar si no hay modo seleccionado
            >
              Confirmar elección
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default GameMode;
