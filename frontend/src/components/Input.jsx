import { useEffect, useState, useId } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Input = ({
  type, // Required!
  label, // Required!
  name, // Required!
  required, // Required!
  onChange, // Required!
  value, // Required!

  inputConfig, // Agregar mas propieades al input

  children, // Para mostrar el icono

  buttonActive, // Bool que indicara si se puede hacer click o no
  buttonText, // El texto que se mostrara en el boton

  iconComponent, // Bool ¿se usara un button o un icono?
}) => {
  if (!type) console.error('Falta el prop "type"');
  if (!label) console.error("Texto que actua como placeholder");
  if (!onChange) console.error("Falta una funcion de onchange");
  if (!name) console.error('Falta el prop "name"');
  if (typeof required !== "boolean") {
    console.error("Debes definir si el campo es requerido (True/False)");
  }

  const id = useId();
  const [motionLabel, setMotionLabel] = useState(false);

  useEffect(() => {
    setMotionLabel(value !== "");
  }, [value, motionLabel]);

  const styled = clsx({
    "-top-[23px] left-0 text-sm px-1 text-gray-400": motionLabel, // Posición al tener contenido
    "m-auto top-0 bottom-0  left-3 text-base text-gray-500": !motionLabel, // Posición inicial
  });

  return (
    <>
      <div className="bg-transparent w-full max-w-72 rounded-md relative">
        <input
          className={`${
            !motionLabel ? "border-second-color" : "border-second-color-focus"
          } py-2.5 px-3 w-full h-full rounded-md text-white bg-transparent border border-solid text-sm font-normal md:py-2`}
          type={type}
          id={id}
          name={name}
          required={required}
          onChange={onChange}
          value={value}
          {...inputConfig}
        />

        <label
          htmlFor={id}
          className={`${styled} h-max absolute text-sm transition-all duration-150 ease-in-out select-none cursor-text`} // También añadir font-medium al label
        >
          {label}
        </label>

        {!iconComponent ? (
          <button
            type="submit"
            className={`absolute top-0 right-0 h-full flex items-center justify-center rounded-r-md w-24 bg-second-color text-sm font-medium ${
              buttonActive ? "bg-second-color" : "bg-second-color-focus"
            }`}
          >
            {buttonText}
          </button>
        ) : (
          <span className="absolute right-3 m-auto top-0 bottom-0 h-max icons-color">
            {children}
          </span>
        )}
      </div>
    </>
  );
};

// PropTypes para validación básica y tipo esperado
Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,

  inputConfig: PropTypes.object,
  iconComponent: PropTypes.bool,
  buttonActive: PropTypes.bool,
  buttonText: PropTypes.string,
  children: PropTypes.node,
};

export default Input;
