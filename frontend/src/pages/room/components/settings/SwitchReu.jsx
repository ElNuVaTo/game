import { Switch } from "@headlessui/react";
import { useState } from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";

const SwitchReu = ({ enabled, setEnabled, option, help }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between gap-5 px-5 py-3 bg-gray-800 rounded-lg w-72 m-auto">
        <div className="relative">
          <IoIosHelpCircleOutline
            className="absolute -right-4 bottom-4 cursor-pointer h-[18px] w-[18px] "
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
          {hovered && (
            <div className="absolute z-50 w-[150px] bottom-[30px] -right-[160px] p-3 bg-black text-white text-xs rounded-md shadow-lg opacity-95 transition-all transform scale-95 duration-300 ease-in-out hover:scale-100 hover:opacity-100">
              {help}
            </div>
          )}

          <p className="text-lg text-white font-semibold">{option}</p>
        </div>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
      </div>
    </>
  );
};

export default SwitchReu;
