import { useEffect, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import clsx from "clsx";

const Input = ({
  type,
  label,
  name,
  required,
  onChange,
  value,
  validation,
  errMessage,
  inputConfig,
  children,
  padding,
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
    "-top-[23px] left-0 text-sm px-1 text-gray-400":
      motionLabel, // Posición al tener contenido
    "top-[8px] left-3 text-base text-gray-500  bg-transparent ": !motionLabel, // Posición inicial
  });

  return (
    <>
      <div className="bg-transparent w-full max-w-72 rounded-md relative">
        <input
          className={`${children ? padding : "pr-0"} ${
            !motionLabel ? "border-second-color" : "border-second-color-focus"
          } p-2 px-3 w-full h-full rounded-md text-white bg-transparent border border-solid text-sm font-normal`}
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
          className={`${styled} absolute text-sm transition-all duration-150 ease-in-out select-none cursor-text`} // También añadir font-medium al label
        >
          {label}
        </label>

        {children && <>{children}</>}

        <AnimatePresence>
          {validation && (
            <motion.span
              key="Alert"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              layout
              className="absolute text-wrap  text-red-500  top-12 text-normal w-full left-0 text-center  text-sm"
            >
              <p className="font-normal">{errMessage}</p>
            </motion.span>
          )}
        </AnimatePresence>
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
  validation: PropTypes.bool,
  errMessage: PropTypes.string,
  inputConfig: PropTypes.object,
  children: PropTypes.node,
  padding: PropTypes.node,
};

// Ejemplo de uso del componente con `inputConfig`
// const inputConfig = {
//   maxLength: 50,
//   placeholder: "Introduce tu nombre",
//   readOnly: true,
// };

// <Input
//   type="text"
//   label="Nombre"
//   id="username"
//   name="username"
//   required={true}
//   onChange={handleChange}
//   value={inputValue}
//   inputConfig={inputConfig}
// />

// Resultado final
// <input
// class="p-2 w-full h-full rounded-md text-white"
// type="text"
// id="username"
// name="username"
// required
// onChange="..."
// value="..."
// maxLength="50"
// placeholder="Introduce tu nombre"
// readOnly
// />

export default Input;
