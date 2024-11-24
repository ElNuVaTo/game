import axios from "axios";

const backendUrl = import.meta.env.VITE_URL_BACKEND;
const JoinAccount = `${backendUrl}${import.meta.env.VITE_INFORMATION_ROOM}`;

// Función para obtener la información del lobby
const fetchRoomInfo = async () => {
  try {
    const response = await axios.get(`${JoinAccount}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de la sala", error);
    throw error;
  }
};

export { fetchRoomInfo };
