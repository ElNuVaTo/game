import { create } from "zustand";

const StoreDiscord = create((set) => ({
  // Estado para el ID de usuario (inicia con "Discord-" + un valor por defecto)
  userId: localStorage.getItem("Discord_ID") || "",
  setUserId: (newId) => {
    localStorage.setItem("Discord_ID", newId);
    set({ userId: newId });
  },

  // Estado para el nombre de usuario
  username: localStorage.getItem("Discord_Username") || "",
  setUsername: (newUsername) => {
    localStorage.setItem("Discord_Username", newUsername);
    set({ username: newUsername });
  },

  // Estado para el avatar (URL)
  avatar: localStorage.getItem("Discord_Avatar") || "",
  setAvatar: (newAvatar) => {
    localStorage.setItem("Discord_Avatar", newAvatar);
    set({ avatar: newAvatar });
  },

  // Estado para el nombre global (puede ser un nombre visible en varias partes de la app)
  globalName: localStorage.getItem("Discord_globalName") || "",
  setGlobalName: (newGlobalName) => {
    localStorage.setItem("Discord_globalName", newGlobalName);
    set({ globalName: newGlobalName });
  },
}));

export { StoreDiscord };
