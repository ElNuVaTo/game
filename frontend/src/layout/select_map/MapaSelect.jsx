import React, { useState, useRef } from "react";
import { IoLogoDiscord } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import Settings from "./Settings";
import useClickOutside from "../../utils/CerrarPanel";

const MapaSelect = () => {

  const [isOpen, setIsOpen] = useState(false); // Controla si el panel está abierto
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  useClickOutside(panelRef, buttonRef, setIsOpen);

  return (
    <>
      {/* <button
        onClick={toggleOpen} // Llama a toggleOpen al hacer clic
        className="z-50 absolute left-5 bottom-5 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center"
        type="button"
        ref={buttonRef}
      >
        <IoMdAdd className="h-5 w-5" />
      </button> */}

      {isOpen && (
        <div
          id="select-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="bg-black/90 h-screen overflow-y-auto fixed top-0 right-0 left-0 z-40 flex justify-center items-center"
        >
          <a
            href=""
            ref={panelRef}
            target="_blank"
            className="absolute bottom-5 right-5 flex justify-between items-center p-3 gap-3 text-white bg-gray-800 border border-transparent rounded-lg cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                Únete a nuestro Discord
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Último pensamiento
              </span>
            </div>
            <IoLogoDiscord className="h-16 w-16 text-blue-600" />
          </a>

          <div
            ref={panelRef}
            className="relative bg-white rounded-lg shadow dark:bg-gray-800"
          >
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Configuración de la sala
              </h3>
              <button
                type="button"
                onClick={toggleOpen} // Cerrar modal al hacer clic en el botón de cierre
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>

            <div className="p-4">
              <div className="flex justify-between mb-6">
                <p className="text-gray-500 dark:text-gray-400">
                  Mapas seleccionados
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Configuración
                </p>
              </div>
              <ul className="flex mb-4 gap-20">
                <div className="flex flex-col gap-4">
         
                </div>
                <li className="flex flex-col gap-6 ">
                  <Settings>Respuestas en anonimato</Settings>
                  <Settings>Todos los usuarios seleccionan mapas</Settings>
                  <Settings>Activar tiempo | 0s - 60s</Settings>
                  <Settings>Nuevo enlace de invitación</Settings>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapaSelect;
