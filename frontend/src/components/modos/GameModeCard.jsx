import React from "react";

const GameModeCard = ({
  title,
  children,
  imgSrc,

  onClick,

  className,
  style,
}) => {
  return (
    <div onClick={onClick} style={style} className={className}>
      <div className="p-3 z-20 bg-gray-900 w-full h-full">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className=" text-gray-400">Quiz</p>
            </div>

            <img
              src={imgSrc}
              alt="Imagen generada con inteligencia artificial"
              className="object-cover h-12 w-12 rounded"
            />
          </div>

          <p className="">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default GameModeCard;
