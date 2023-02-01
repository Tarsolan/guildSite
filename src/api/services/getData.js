import { API_ENDPOINT } from "../connection/server";
// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
// const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const getData = async (url) => {
  const res = await fetch(API_ENDPOINT + url);
  const data = await res.json();

  return data;
};

const getDataWithId = async (id, url) => {
  const res = await fetch(API_ENDPOINT + url + id);
  const data = await res.json();

  return data;
};

export { getData, getDataWithId };
