import { getMission } from "./getMissions";

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const addMission = async (mission) => {
  const res = await fetch(API_ENDPOINT + "/missions/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mission),
  });
  const data = await res.json();

  const newMission = await getMission(data.mission_num);

  return newMission;
};

export { addMission };
