import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const url1 =
  "https://s1.elespanol.com/2020/09/04/actualidad/actualidad_518208270_159105344_1706x960.jpg";
const ulr2 =
  "https://www.cuartomundo.cl/wp-content/uploads/2018/02/Avengers-gif-2.gif";
const url3 = "https://cdn.pfps.gg/pfps/2333-hu-tao-13.png";

const variants = {
  initial: {
    opacity: 0,
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)", // Sombra inicial
  },
  animate: {
    opacity: 1,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)", // Sombra más intensa
    transition: {
      opacity: { duration: 0.8 },
      scale: { type: "spring", stiffness: 200, damping: 20 },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: { duration: 0.8 },
      scale: { type: "spring", stiffness: 200, damping: 20 },
    },
  },
};
const variantsClick = {
  initial: {
    scale: 0.3,
    opacity: 0,
  },
  animate: {
    opacity: 0.5,
    scale: 1.2,
    transition: {
      opacity: { duration: 0.5 },
      scale: { type: "spring", stiffness: 200, damping: 20 },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: { duration: 0.5 },
      scale: { type: "spring", stiffness: 200, damping: 20 },
    },
  },
};
// const variantsADD = {
//   initial: {
//     opacity: 0, // Empieza invisible
//   },
//   animate: {
//     opacity: 1, // Se hace visible
//     transition: {
//       scale: { type: "spring", stiffness: 200, damping: 25 },
//       opacity: { duration: 0.5 },
//     },
//   },
//   exit: {
//     opacity: 0, // Vuelve a ser invisible
//     transition: {
//       scale: { type: "spring", stiffness: 200, damping: 25 },
//       opacity: { duration: 0.5 },
//     },
//   },
// };
const variantsInfo = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const Card = ({ data }) => {
  const animationClick = useRef();
  const [entranceMouse, setEntranceMouse] = useState(false);
  const [add, setAddd] = useState(false);
  const [positionXY, setPositionXY] = useState({
    y: -80,
    x: -80,
    hidden: true,
  });
  const mouseEnter = () => setEntranceMouse(true);
  const mouseLeave = () => setEntranceMouse(false);

  const handleClick = (e) => {
    const rect = animationClick.current.getBoundingClientRect(); // Obtiene las coordenadas y dimensiones del contenedor

    // Calcula las posiciones relativas del clic dentro del contenedor
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const circleSize = 160; // Tamaño del círculo
    x = x - circleSize / 2; // Centra el círculo en el clic
    y = y - circleSize / 2; // Centra el círculo en el clic

    setPositionXY({
      x,
      y,
      hidden: false,
    });

    setTimeout(() => {
      setPositionXY((prev) => ({
        ...prev,
        hidden: true,
      }));
    }, 100);

    setAddd(!add);
  };

  // Posible idea para agregar
  // Jalar hacia abajo al llegar a cierto punto se elimina  para agregarlo
  // dragg framer

  // Quitar el fondo en movimiento
  // Da la sensacion de cansar la vista es incomodo
  // de parte del backned son imagenes que se cargan y no son visible
  // puede ser una carga extra

  // Detectar cuando se esta moviendo el slider
  // True = No se activa el style del click
  // False = Se activa el style del click

  return (
    <article
      ref={animationClick}
      onMouseLeave={mouseLeave}
      onMouseEnter={mouseEnter}
      onClick={handleClick}
      className="aspect-video w-full max-w-72 rounded-sm relative cursor-pointer overflow-hidden select-none slider-item"
    >
      {/* <AnimatePresence>
        {add && (
          <motion.span
            key="Add"
            variants={variantsADD}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute w-full h-20 pointer-events-none z-[11] rounded-sm border-t-4 border-l-4 border-r-4 border-emerald-500"
          ></motion.span>
        )}
      </AnimatePresence> */}

      <AnimatePresence>
        {!positionXY.hidden && (
          <motion.picture
            key="Click"
            variants={variantsClick}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white/50 absolute w-40 h-40 z-[11] -top-[160px] -left-[160px]  pointer-events-none rounded-full"
            style={{
              position: "absolute",
              left: `${positionXY.x}px`,
              top: `${positionXY.y}px`,
            }}
          ></motion.picture>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entranceMouse && (
          <motion.span
            key="Info"
            variants={variantsInfo}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute h-full rounded-md w-full pointer-events-none z-[10] flex justify-center items-center bg-black/90"
          >
            <p className="text-white">Click para agregar</p>
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entranceMouse ? (
          <>
            <motion.picture
              key="gif"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <img
                src={ulr2}
                alt=""
                draggable={false}
                className="mask-card-img rounded-md absolute object-cover aspect-video w-full max-w-80 select-none"
              />
            </motion.picture>
          </>
        ) : (
          <motion.figure
            key="image"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute h-full w-full"
          >
            <img
              src={url1}
              alt=""
              draggable={false}
              className="mask-card-img rounded-md absolute object-cover select-none"
            />
          </motion.figure>
        )}
      </AnimatePresence>

      <figure className="w-full p-2 flex gap-3 justify-start items-center flex-row-reverse relative">
        <img
          src={url3}
          alt="Foto del autor Nebelous"
          className="h-12 w-12 rounded-md z-[2] select-none"
          draggable={false}
        />
        <figcaption className="text-white z-[3] flex flex-col text-end">
          <p className="font-medium text-sm text-gray-300">Nebelous</p>
          <time
            dateTime="2024-11-25T15:30:00"
            className="text-gray-300 italic font-medium text-xs"
          >
            24/11/2024
          </time>
        </figcaption>

        <span className="card-author-gradient h-12 w-2/3 absolute rounded-r-md z-[1]"></span>
      </figure>

      <h3 className="absolute p-2 bottom-0 z-[2]  w-full  text-white font-semibold text-md text-center">
        Descubre los secretos mejor guardados de los Vengadores
      </h3>
    </article>
  );
};

Card.propTypes = {
  data: PropTypes.string,
};

export default Card;
