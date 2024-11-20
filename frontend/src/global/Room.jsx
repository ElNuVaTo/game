import { create } from "zustand";

const StoreRoom = create((set) => ({
  // Estado para el ID de la sala
  lobbyID: localStorage.getItem("Lobby-ID") || "",
  setLobbyID: (newID) => {
    localStorage.setItem("Lobby-ID", newID);
    set({ lobbyID: newID });
  },

  // Estado para el enlace de invitación
  roomCode: localStorage.getItem("Lobby-Invited-Link") || "",
  setRoomCode: (newLink) => {
    localStorage.setItem("Lobby-Invited-Link", newLink);
    set({ roomCode: newLink });
  },
}));

export { StoreRoom };
