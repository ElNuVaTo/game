import React, {useState}  from "react";

import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";

const Settings = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-10">
        <p>{children}</p>
        <label className="flex cursor-pointer select-none items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            {/* Background of the toggle */}
            <div
              className={`block h-8 w-14 rounded-full transition-colors ${
                isChecked ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            {/* Dot inside the toggle */}
            <div
              className={`dot absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all duration-300 ${
                isChecked ? "left-7" : "left-1"
              }`}
            >
              {isChecked ? (
                <IoIosCheckmark className="w-6 h-6 text-green-600" />
              ) : (
                <IoIosClose className="w-6 h-6 text-gray-500" />
              )}
            </div>
          </div>
        </label>
      </div>
    </>
  );
};

export default Settings;
