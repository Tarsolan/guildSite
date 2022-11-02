const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const addClient = async (client) => {
  const resID = await fetch(API_ENDPOINT + "/register/client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });

  const data = resID.json();

  return data;
};

export { addClient };
