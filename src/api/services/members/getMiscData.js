// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
import { API_ENDPOINT } from "../../connection/server";
//const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const getRaces = async () => {
  const res = await fetch(API_ENDPOINT + "/races");
  const data = await res.json();

  return data;
};

const getRanks = async () => {
  const res = await fetch(API_ENDPOINT + "/races/ranks");
  const data = await res.json();

  return data;
};

const getSpecs = async () => {
  const res = await fetch(API_ENDPOINT + "/specs");
  const data = await res.json();

  return data;
};

export { getRaces, getRanks, getSpecs };
