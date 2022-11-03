import { getMission } from "./getMissions";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const addReport = async (report) => {
  await fetch(API_ENDPOINT + "/missions/reports/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });

  const newMission = await getMission(report.mission_num);

  return newMission;
};

export { addReport };
