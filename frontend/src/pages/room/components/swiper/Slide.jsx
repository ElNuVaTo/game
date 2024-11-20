import React, { useState, useEffect } from "react";
import {
  IoMdCheckmarkCircleOutline,
  IoMdAddCircleOutline,
} from "react-icons/io";

const Card = ({ index, authorData, bannerData }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [imageSrc, setImageSrc] = useState(bannerData.src);

  const handleIconClick = () => {
    setIsAdded((prev) => !prev);
    if (!isAdded) {
      clickAdd(); // Agrega el ítem
    } else {
      clickDelete(); // Elimina el ítem
    }
  };

  useEffect(() => {
    // Verificamos si la imagen es un GIF
    if (bannerData.src.endsWith(".gif")) {
      const img = new Image();
      img.src = bannerData.src;
      img.crossOrigin = "Anonymous"; // Esto es necesario para que la imagen se cargue correctamente en un canvas

      img.onload = () => {
        // Crear canvas para convertir a WebP o PNG
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Establecer el tamaño del canvas
        canvas.width = img.width;
        canvas.height = img.height;

        // Dibujar la imagen en el canvas
        ctx.drawImage(img, 0, 0);

        // Convertir a WebP
        const webpUrl = canvas.toDataURL("image/webp");
        setImageSrc(webpUrl); // Actualizar el estado con la URL WebP
      };

      img.onerror = (error) => {
        console.error(
          "Error al cargar la imagen, probablemente por CORS",
          error
        );
      };
    }
  }, [bannerData.src]);

  return (
    <div
      key={index}
      className="relative group w-full max-w-56 aspect-[3/2] bg-gray-800 rounded-lg shadow-md cursor-grab transition-transform duration-300 hover:scale-105 overflow-hidden select-none "
    >
      {/* Imagen de fondo */}
      <img
        src={imageSrc}
        alt={bannerData.nameMap}
        className="w-full h-full object-cover brightness-50 rounded-lg transform transition-transform duration-300 hover:scale-105 "
        draggable={false}
        loading="lazy"
      />

      <div className="absolute top-0 left-0 flex justify-center items-center h-[60%] w-full">
        <p className="text-white text-xl font-semibold text-center px-4 drop-shadow-md">
          {bannerData.title}
        </p>
      </div>

      {/* Capa de contenido */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent rounded-lg">
        {/* Información con más elementos */}
        <div className="flex justify-between items-center px-3 py-2 bg-black/80 rounded-b-lg gap-3 mt-auto">
          <div className="flex items-center gap-3">
            <img
              src={authorData.src}
              alt={`${authorData.name}'s avatar`}
              draggable={false}
              className="h-10 w-10 rounded-full border-2 border-gray-500"
              loading="lazy"
            />
            <p className="text-gray-300 text-sm font-medium truncate">
              {authorData.name}
            </p>
          </div>

          <div className="text-gray-300 text-xs flex flex-col gap-1">
            <span className="bg-green-600 text-white text-[10px] px-2 py-1 rounded-full w-max">
              {bannerData.tag || "VIDEOJUEGOS"}
            </span>
          </div>
        </div>

        <div className="absolute top-2 right-2 transition-transform duration-300 group-hover:scale-110">
          {isAdded ? (
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-sm">Agregado</span>
              <IoMdCheckmarkCircleOutline
                onClick={handleIconClick}
                className="w-8 h-8 text-green-500 transition-transform duration-300 transform hover:rotate-12 cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-white text-sm">Agregar</span>
              <IoMdAddCircleOutline
                onClick={handleIconClick}
                className="w-8 h-8 text-white hover:text-green-400 transition-transform duration-300 transform hover:rotate-12 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
