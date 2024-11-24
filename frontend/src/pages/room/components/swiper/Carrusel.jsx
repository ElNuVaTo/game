import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

// Componentes
import Card from "@/components/Card";

const Carrusel = ({ position }) => {
  const x = useMotionValue(0);
  const sliderWrapperRef = useRef(null);

  const [xMotion, setMotion] = useState();

  // Usamos un useEffect que espere a que el ref esté disponible
  useEffect(() => {
    const width =
      sliderWrapperRef.current.scrollWidth -
      sliderWrapperRef.current.offsetWidth;

    setMotion(width);

    console.log(width);
  }, []);

  return (
    <>
      <div className="slider-container cursor-grab relative">
        <span className="h-full w-16 bg-black right-0 absolute z-[2] decorative-gradient-r opacity-80" />
        <span className="h-full w-16 bg-black left-0 absolute z-[2] decorative-gradient-l opacity-80" />

        <motion.div
          ref={sliderWrapperRef}
          drag="x"
          dragConstraints={{ right: 0, left: -xMotion }}
          className={`${position} slider-wrapper`}
          dragMomentum={false}
          dragElastic={0.2}
          style={{ touchAction: "none", x }}
          initial={{ x: position }}
        >
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </motion.div>
      </div>
    </>
  );
};

export default Carrusel;
