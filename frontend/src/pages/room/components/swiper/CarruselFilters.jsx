import { Field, Select } from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";

import Carrusel from "@/pages/room/components/swiper/Carrusel";

const CarruselFilters = ({
  searchForText,
  setSearchForText,
  category,
  setcategory,
}) => {
  return (
    <>
      <Carrusel position={-28}>
        <div className="flex gap-[50px] items-end">
          {/* Buscar por nombre */}
          <div className="relative w-full max-w-56">
            <input
              type="text"
              className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-600 text-white text-sm border border-slate-600 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-500 shadow-sm focus:shadow"
              placeholder="Buscar por titulo"
              required
              value={searchForText}
              onChange={(e) => setSearchForText(e.target.value)}
            />

            <IoChevronDown className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600" />
          </div>

          {/* Selcciona una categoria */}
          <Field className="w-full max-w-56">
            <div className="relative">
              <Select
                name="category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                className={clsx(
                  "mt-3 block appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 pr-10 text-sm/6 text-white w-full",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  "*:text-black"
                )}
              >
                <option value="" className="hidden">
                  Selecciona una categoria
                </option>
                <option value="videojuegos">Videojuegos</option>
                <option value="cine">Cine y Series</option>
                <option value="musica">Música</option>
                <option value="cultura-general">Cultura General</option>
                <option value="psicologia">Personalidad y Psicología</option>
                <option value="deportes">Deportes</option>
                <option value="ciencia">Ciencia y Tecnología</option>
                <option value="naturaleza">Naturaleza</option>
                <option value="historia">Historia</option>
                <option value="comida">Comida y Bebidas</option>
                <option value="arte">Arte y Literatura</option>
                <option value="geografia">Geografía</option>
                <option value="matematicas">Matemáticas</option>
                <option value="adivinanzas">Adivinanzas</option>
              </Select>
              <IoChevronDown
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>
      </Carrusel>
    </>
  );
};

export default CarruselFilters;
