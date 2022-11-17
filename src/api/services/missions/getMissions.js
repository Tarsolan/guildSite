import { API_ENDPOINT } from "../../connection/server";

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
// const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const getMission = async (id) => {
  const res = await fetch(API_ENDPOINT + "/missions/" + id);
  const data = await res.json();

  return data;
};

const getMissions = async () => {
  const res = await fetch(API_ENDPOINT + "/missions");
  const data = await res.json();

  return data;
};

export { getMission, getMissions };
