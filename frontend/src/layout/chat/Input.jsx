import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const Input = ({ inputValue, setInputValue }) => {
  const myRefs = useRef(null); // Referencia al input

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && myRefs.current) {
        // Si el input no tiene el foco, darle el foco al presionar Enter
        if (document.activeElement !== myRefs.current) {
          myRefs.current.focus();
          e.preventDefault(); // Evitar la acción por defecto del Enter
        } else {
          // Si ya está en foco, enviar el formulario si cumple las condiciones
          handleSubmit(e);
        }
      }
    };

    // Agregar el listener al evento "keydown"
    window.addEventListener("keydown", handleKeyDown);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado de enviar el formulario

    // Verificar si el campo no está vacío y no comienza con "#"
    if (inputValue === "") {
      return;
    }

    if (inputValue.startsWith("#")) {
      // Guardar en una variable global para buscar por categoria
      alert("No se puede enviar un valor que empiece con #");
      return;
    }

    // Mandar al chat en vivo
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="category">
        <input
          ref={myRefs}
          className="w-full border-none text-current placeholder-gray-400 py-2 px-3  text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          id="category"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Como usar el chat"
        />
      </label>
    </form>
  );
};

Input.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
};

export default Input;
