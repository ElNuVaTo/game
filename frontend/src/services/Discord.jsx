import { useState, useEffect } from "react";
import axios from "axios";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

const useDiscordAuth = (code) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (code) {
      const fetchData = async () => {
        const params = new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUrl,
        });

        const headers = { "Content-Type": "application/x-www-form-urlencoded" };

        try {
          // Obtiene el token de acceso
          const response = await axios.post(
            "https://discord.com/api/oauth2/token",
            params,
            { headers }
          );

          // Obtiene los datos del usuario
          const userResponse = await axios.get(
            "https://discord.com/api/v10/users/@me",
            {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          );

          const { id, username, avatar, global_name } = userResponse.data;
          setUserData({
            id,
            username,
            avatarUrl: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
            global_name,
          });
        } catch (error) {
          console.error("Error fetching Discord user data:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [code]);

  return { userData, loading, error };
};

export { useDiscordAuth };
