import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { Outlet } from "react-router-dom"; // Importamos Outlet
import Path from "./Path";

const i = import.meta.env;

const ROUTER = {
  room: i.VITE_ROOM,
  roomIngame: "",

  profile: "",
  creation: i.VITE_CREATION,

  admin: "",
};

// Variants para la animación
const variants = {
  initial: {
    y: -100, // Oculto en la parte superior
    opacity: 0,
  },
  animate: {
    y: 0, // Posición visible
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
    },
  },
  hidden: {
    y: -100, // Oculto nuevamente
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
    },
  },
};

const variantsArrow = {
  animate: {
    y: 3, // Desplazarse hacia abajo
    rotate: 180, // Girar
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
    },
  },
  hidden: {
    y: -5, // Regresar a su posición inicial
    rotate: 0, // Girar a su rotación inicial
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
    },
  },
};

const Nav = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <motion.div
        variants={variantsArrow}
        initial="hidden"
        animate={isVisible ? "animate" : "hidden"}
        exit="hidden"
        className="absolute top-2 m-auto left-0 right-0 z-50 cursor-pointer w-11 h-11 text-white rounded-full p-2 select-none"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <IoIosArrowDown className="h-full w-full" />
      </motion.div>

      {/* Barra de navegación */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            className="bg-[#242424] text-white m-2 rounded-md absolute top-1 left-4 right-4 shadow-lg z-40 overflow-hidden"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="hidden"
          >
            <ul className="flex items-center justify-between w-full h-10 overflow-hidden">
              <Path href={ROUTER.creation} label="Crear mi mapa" />
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <Outlet />
    </>
  );
};

export default Nav;
