import axios from "axios";

const UrlLobbyInfo = import.meta.env.VITE_API_GET_INFORMATION_LOBBY;

// Datos estaticos

const useGetInformationLobby = async (LobbyInvited, setValue) => {
  try {
    const response = await axios.get(`${UrlLobbyInfo}${LobbyInvited}`, {
      headers: { "Content-Type": "application/json" },
    });
    return setValue(response.data);
  } catch (error) {
    console.error("Error al obtener la información de la sala", error);
    throw error;
  }
};

export { useGetInformationLobby };
