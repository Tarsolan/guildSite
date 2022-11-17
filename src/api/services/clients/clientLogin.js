// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
import { API_ENDPOINT } from "../../connection/server";
// const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const clientLogin = async (client) => {
  const res = await fetch(API_ENDPOINT + "/clients/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });
  const data = await res.json();
  return data;
};

export { clientLogin };
