import React from "react";

const Enunciado = () => {
  const pregunta = "¿Cuál es la capital de Francia?";
  const respuestas = [
    { letra: "A", texto: "Berlín" },
    { letra: "B", texto: "Madrid" },
    { letra: "C", texto: "París" },
    { letra: "D", texto: "Lisboa" },
  ];

  return (
    <div className="flex  items-center bg-black w-full min-h-[720px]">
      <div className="flex flex-col space-y-6 justify-center h-full">
        {respuestas.map((respuesta) => (
          <div
            key={respuesta.letra}
            className="bg-gray-800 rounded-lg p-4 text-center text-white cursor-pointer hover:bg-gray-700 transition"
          >
            {respuesta.letra}. {respuesta.texto}
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold mb-4">{pregunta}</h2>
    </div>
  );
};

export default Enunciado;
