import { useEffect } from "react";

const useClickOutside = (ref1, ref2, setChange) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verificar que ref1 está definido y que el clic fue fuera de él
      const isOutsideRef1 = ref1.current && !ref1.current.contains(event.target);
      // Verificar que ref2 está definido y que el clic fue fuera de él
      const isOutsideRef2 = ref2 && ref2.current && !ref2.current.contains(event.target);

      // Cambia el estado solo si el clic fue fuera de ambos (o solo ref1 si ref2 no está definido)
      if (isOutsideRef1 && (ref2 ? isOutsideRef2 : true)) {
        setChange(false);
      }
    };

    // Agregar el listener al montar
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el listener al desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref1, ref2, setChange]); // Dependencias para asegurarse de que se actualice correctamente
};

export default useClickOutside;
