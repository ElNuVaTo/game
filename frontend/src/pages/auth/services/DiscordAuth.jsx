import axios from "axios";

const useDiscordAuth = async (code) => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUrl,
  });

  const headers = { "Content-Type": "application/x-www-form-urlencoded" };

  try {
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      params,
      { headers }
    );

    const userResponse = await axios.get(
      "https://discord.com/api/v10/users/@me",
      {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      }
    );

    const { id, username, avatar, global_name } = userResponse.data;
    return { id, username, avatar, global_name };
  } catch (error) {
    console.error("Error fetching Discord user data:", error);
    throw error; // Re-throw to be caught in the component
  }
};

export default useDiscordAuth;
