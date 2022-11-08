import { getMember } from "./getMembers";
// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const addMember = async (member, specArr) => {
  const resID = await fetch(API_ENDPOINT + "/register/member", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
  });
  const newID = await resID.json();

  await fetch(API_ENDPOINT + "/register/member/spec/" + newID.member_id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(specArr),
  });

  const newMem = await getMember(newID.member_id);

  return newMem;
};

export { addMember };
