import { useState } from "react";
import Input from "./Input";

// Función para separar el nombre y el mensaje
const getNameForColored = (value) => {
  // Separar el texto usando el primer `:` como delimitador
  const [name, ...messageParts] = value.split(":");
  // El resto después de ":" lo juntamos como el mensaje
  const message = messageParts.join(":").trim(); // En caso de que haya más de un `:`

  return { name, message };
};

const Chat = () => {
  const nombre = "Nuvato";
  const mensaje =
    "23safsdfds23safsdfds23safsdfds23s afsdfds23safsdfds2 3safsdfds23safs dfds23safsdfds23s afsdfds23safsdfds23sa fsdfds23safsdfds2 3safsdfds";

  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([
    {
      texto: `${nombre}: ${mensaje}`,
    },
  ]);

  return (
    <>
      <div className="flex flex-col gap-4 max-w-96 fixed bottom-6 left-6 z-30 text-white">
        {/* Contenedor de Mensajes */}
        <div className="flex flex-col gap-3 w-full">
          {history.map((msg, index) => {
            const { name, message } = getNameForColored(msg.texto); // Usar la función para obtener el nombre y mensaje

            return (
              <div key={index} className="flex w-full bg-black">
                <p className="chat-author-colored text-balance" data-before={`${name} :`}>
                  {" "}
                  {message}
                </p>
              </div>
            );
          })}
        </div>

        <Input inputValue={inputValue} setInputValue={setInputValue} />
      </div>
    </>
  );
};

export default Chat;
