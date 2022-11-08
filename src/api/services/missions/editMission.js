// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const editMission = async (mission) => {
  await fetch(API_ENDPOINT + "/missions/edit", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mission),
  });
};

export { editMission };
