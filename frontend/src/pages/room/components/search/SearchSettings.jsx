import React, { useState } from "react";


import { IoSearchSharp } from "react-icons/io5";

const SearchSettings = () => {
  const [text, setText] = useState("")


  return (
    <div className="flex items-center gap-10 h-[64px] my-4">
      <div className=" flex items-center relative w-full  ">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          placeholder="Introduce el nombre del Quiz/Test que buscas"
          className="w-full p-2 px-5 rounded bg-gray-900 border border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800"
        />
        <IoSearchSharp
          className="absolute right-4 text-gray-400 cursor-pointer"
          size={20}
        />
      </div>

      {/* Buscar por oficial o comunidad */}
      <div className="flex items-center justify-between   min-w-[250px]">
        <label className="flex items-center text-white cursor-pointer">
          <input
            type="radio"
            name="selection"
            id="community"
            className="appearance-none w-5 h-5 border-2 border-gray-700 rounded-full checked:bg-green-500 mr-2 focus:outline-none"
          />
          Comunidad
        </label>
        <label className="flex items-center text-white cursor-pointer">
          <input
            type="radio"
            name="selection"
            id="official"
            className="appearance-none w-5 h-5 border-2 border-gray-700 rounded-full checked:bg-green-500 mr-2 focus:outline-none"
          />
          Oficial
        </label>
      </div>
    </div>
  );
};

export default SearchSettings;
