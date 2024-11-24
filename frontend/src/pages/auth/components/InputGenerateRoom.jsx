const InputGenerateRoom = ({
  invitedCode,
  setInvitedCode,
  isCreationRoom,
  setIsCreationRoom,
}) => {

  return (
    <>
      <div className="w-full max-w-sm min-w-[200px]">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-transparent border-solid placeholder:text-slate-600 text-sm border border-slate-600 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-500 shadow-sm focus:shadow"
            placeholder="Ingresa un codigo"
            value={invitedCode}
            maxLength="8"
            autoComplete="one-time-code"
            onChange={(e) => setInvitedCode(e.target.value)}
            disabled={isCreationRoom}
          />
          <button
            className="cursor-pointer absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={generarSala}
            disabled={isCreationRoom}
          >
            Crear sala
          </button>
        </div>
      </div>
    </>
  );
};
export default InputGenerateRoom;
