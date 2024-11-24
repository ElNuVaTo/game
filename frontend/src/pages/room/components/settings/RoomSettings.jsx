import { useState } from "react";

// Iconos
import { MdSettings } from "react-icons/md";

// Componentes
import ModalPortal from "@/components/ModalPortal";

const variants = {
  initial: {
    opacity: 0,
    clipPath: "circle(0.0% at 100% 100%)",
    transition: {
      duration: 0.4,
      ease: "easeOut", // Salida suave
    },
  },
  animate: {
    opacity: 1,
    clipPath: "circle(141.4% at 100% 100%)",
    transition: {
      duration: 0.6,
      type: "spring", // Animación tipo resorte
      stiffness: 300,
      damping: 25, // Rebote controlado
    },
  },
  exit: {
    opacity: 0,
    clipPath: "circle(0.0% at 100% 100%)",
    transition: {
      duration: 0.3,
      ease: "easeIn", // Entrada rápida para cerrar
    },
  },
};

const RoomSettings = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MdSettings
        className={`fixed bottom-8 right-8 h-8 w-8 text-[#ddd] cursor-pointer 
      transition-transform duration-300 ease-in-out 
      hover:rotate-12 hover:scale-110
      ${open ? "rotate-[360deg]" : "rotate-0"}`}
        onClick={() => setOpen(!open)}
      />

      <ModalPortal open={open} variants={variants}>
        123
      </ModalPortal>
    </>
  );
};
export default RoomSettings;
