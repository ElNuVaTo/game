import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const getColor = (life, maxLife) => {
  const percentage = (life / maxLife) * 100;

  // Usamos una escala de tonalidades dentro del mismo rango de colores (verde, naranja, rojo)
  if (percentage >= 70) {
    return `rgba(87, 183, 59, 1)`; // Verde cálido
  } else if (percentage >= 30) {
    return `rgba(255, 147, 35, 1)`; // Naranja cálido
  } else {
    return `rgba(255, 70, 40, 1)`; // Rojo cálido
  }
};

const LifeCircle = ({ life, maxLife }) => {
  const [colors, setColors] = useState(getColor(life, maxLife)); // Inicializa el color

  // Actualiza el color cuando cambia la vida
  useEffect(() => {
    setColors(getColor(life, maxLife));
  }, [life, maxLife]);

  return (
    <CircularProgressbar
      className="absolute rounded-full overflow-hidden"
      counterClockwise={false}
      value={life}
      maxValue={maxLife}
      strokeWidth={7} // Grosor del borde
      animate // Activar animación
      styles={buildStyles({
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: "butt",

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Can specify path transition in more detail, or remove it entirely
        // pathTransition: 'none',

        // Colors
        pathColor: `${colors}, ${life / maxLife})`,
        trailColor: "#0b1220",
        backgroundColor: "#3e98c7",
      })}
    />
  );
};

export default LifeCircle;
