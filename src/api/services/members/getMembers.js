// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
import { API_ENDPOINT } from "../../connection/server";
//const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const getMembers = async () => {
  const res = await fetch(API_ENDPOINT + "/members");
  const data = await res.json();

  return data;
};

const getMember = async (id) => {
  const res = await fetch(API_ENDPOINT + "/members/" + id);
  const data = await res.json();

  return data;
};

export { getMember, getMembers };
