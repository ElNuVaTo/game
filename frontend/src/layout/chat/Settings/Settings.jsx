import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import SwitchReu from "./SwitchReu";

export default function Example({ setOpen, open }) {
  const [anonymous, setAnonymous] = useState(false);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/80 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="p-6 bg-gray-900 text-white rounded-lg ">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Configuración de la sala
              </h2>

              <div className="space-y-4">
                <SwitchReu
                  anonymous={anonymous}
                  setAnonymous={setAnonymous}
                  option="Anonymous"
                  help="Las respuestas del jugador son invisible "
                />
                <SwitchReu
                  anonymous={anonymous}
                  setAnonymous={setAnonymous}
                  option="Comunidad"
                  help="Podras ver mapas de usuarios que no estan verificados, no nos hacemos cargo."
                />
                <SwitchReu
                  anonymous={anonymous}
                  setAnonymous={setAnonymous}
                  option="Juegos clasicos"
                  help="Podras pobrar una variedad de modos relacionados con Quiz y Tests"
                />

                <SwitchReu
                  anonymous={anonymous}
                  setAnonymous={setAnonymous}
                  option="Modo IA"
                  help="Prueba 3 tipos de modo lucha contra la ia en una carrera donde se van generando lso datos a medida que pasa el tiempo"
                />
                <SwitchReu
                  anonymous={anonymous}
                  setAnonymous={setAnonymous}
                  option="Modo Streamer"
                  help="Interactua contra el chat, introducir el codigo de stremaer, el chat podra responder diciendo escribiendo las letras en miniscula o mayuscula"
                />
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
