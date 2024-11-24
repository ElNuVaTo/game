import { useState } from "react";

import admin from "@/assets/avatar/admin.png";
import mod from "@/assets/avatar/mod.png";

import youtube from "@/assets/avatar/admin.png";
import twitch from "@/assets/avatar/admin.png";
import kick from "@/assets/avatar/admin.png";

import verificado from "@/assets/avatar/verify.png";
import user from "@/assets/avatar/user.png";
import guest from "@/assets/avatar/guest.png";
import ModalPortal from "@/components/ModalPortal";

const colorReserverd = {
  admin: "#aed0f0", // Azul claro para administrador (admin)
  mod: "#ff9800", // Naranja para moderador (mod)
  youtube: "#ff0132", // Rojo para YouTube
  twitch: "#a871ff", // Morado para Twitch
  kick: "#53fd19", // Verde brillante para kick (expulsado)
  verificado: "#2196f3", // Azul para verificado
  user: "#4caf50", // Verde para usuario (user)
  guest: "#d3d3d3", // Gris claro para invitado (guest)
};

const variants = {
  initial: {
    opacity: 0,
    clipPath: "circle(0.0% at 50% 100%)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  animate: {
    opacity: 1,
    clipPath: "circle(111.6% at 50% 100%)",
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    clipPath: "circle(0.0% at 50% 100%)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const PlayerComponent = ({ dataPlayers }) => {
  const [openProfile, setOpenProfile] = useState(false);

  const avatar = (role) => {
    switch (role) {
      case "admin":
        return admin;
      case "mod":
        return mod;
      case "youtube":
        return youtube;
      case "twitch":
        return twitch;
      case "kick":
        return kick;
      case "verify":
        return verificado;
      case "user":
        return user;
      case "guest":
        return guest;
      default:
        return user;
    }
  };

  return (
    <>
      {dataPlayers.map((player) => {
        const role = player.role;
        const color = colorReserverd[role] || "#000000"; // Color según el rol

        return (
          <div
            key={player._id}
            onClick={() => setOpenProfile(!openProfile)}
            className="flex justify-center items-center relative cursor-pointer"
          >
            <ModalPortal
              open={openProfile}
              variants={variants}
              player={player}
            />
            <div className="h-20 w-20 flex justify-center items-center relative">
              <img
                src={avatar(role)}
                alt={player.username}
                className="w-[80px] h-[80px] object-cover absolute z-20"
                draggable={false}
              />

              <img
                src={player.avatar}
                alt={player.username}
                className="w-16 h-16 object-cover absolute z-10 rounded-sm"
                draggable={false}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PlayerComponent;
