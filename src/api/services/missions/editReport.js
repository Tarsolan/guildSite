import { getMission } from "./getMissions";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const editReport = async (details, report) => {
  console.log(report);
  await fetch(API_ENDPOINT + `/missions/reports/edit/${report.report_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });

  const newMission = await getMission(report.mission_num);

  return newMission;
};

export { editReport };
