// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const getClient = async (id) => {
  const res = await fetch(API_ENDPOINT + "/clients" + id);
  const data = await res.json();

  return data;
};

const getClients = async () => {
  const res = await fetch(API_ENDPOINT + "/clients");
  const data = await res.json();

  return data;
};

export { getClient, getClients };
