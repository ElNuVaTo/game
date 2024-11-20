import { create } from "zustand";

const StoreIDUser = create((set) => ({
  // Estado para el ID de la sala
  useridDB: localStorage.getItem("User_DB_ID") || "",
  setUseridDB: (newID) => {
    localStorage.setItem("User_DB_ID", newID);
    set({ useridDB: newID });
  },
}));

export { StoreIDUser };
