import React, { useState } from "react";
import { IoMdSettings, IoIosSend } from "react-icons/io";
import Settings from "./Settings/Settings";

const Chat = () => {
  const [messages, setMessages] = useState("");

  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([
    {
      global_name: "ElNuVato",
      message: "JSDKFJDSKFJSDKJFDSKFJSDKFJDSKFJDSKFJDKFDSJ",
    },
    { global_name: "Nebelous", message: "Helou mi gente" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messages.trim() === "") return;

    setHistory([...history, { global_name: "You", message: messages }]);
    setMessages("");
  };

  return (
    <>
      <Settings open={open} setOpen={setOpen} />
      <div className="flex flex-col gap-3 max-w-96 fixed bottom-[30px] left-[50px] z-30">
        {/* Contenedor de Mensajes */}
        <div className="flex flex-col gap-3  overflow-y-auto max-h-[400px] w-full px-1.5">
          {history.map((msg, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-sm font-semibold text-blue-500">
                {msg.global_name}
              </span>
              <div className=" rounded-md ">
                <span className="text-sm text-gray-200 break-words ">
                  {msg.message}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Barra de Entrada */}
        <form className="flex items-center" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-slate-600 text-sm border border-slate-600 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-500 shadow-sm focus:shadow"
              placeholder="Escribe un mensaje!"
              value={messages}
              maxLength="100"
              onChange={(e) => setMessages(e.target.value)}
              required
            />

            <IoMdSettings
              onClick={() => setOpen(!open)}
              className={`cursor-pointer absolute top-1/2 transform -translate-y-1/2  h-[20px] w-[20px]  -right-8 transition-transform duration-300 ease-in-out ${
                open ? "rotate-180 scale-110" : "rotate-0 scale-100"
              }`}
            />

            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded bg-slate-500  p-1 text-center text-sm text-white transition-all shadow-sm hover:bg-slate-600 focus:bg-slate-600 active:bg-slate-700 disabled:opacity-50"
              type="submit"
            >
              <IoIosSend className="h-[16px] w-[16px] relative" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
