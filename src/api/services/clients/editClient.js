// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
import { API_ENDPOINT } from "../../connection/server";
// const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const editClient = async (client) => {
  await fetch(API_ENDPOINT + "/clients/edit/" + client.client_id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });
};

export { editClient };
