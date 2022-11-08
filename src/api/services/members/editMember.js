import { getMember } from "./getMembers";
// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const editMember = async (member, specs) => {
  await fetch(API_ENDPOINT + "/members/edit", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
  });

  await fetch(API_ENDPOINT + "/members/edit/spec/" + member.member_id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(specs),
  });

  const newMem = await getMember(member.member_id);

  return newMem;
};

const editMemberPoints = async (point_total, member_id) => {
  await fetch(API_ENDPOINT + "/members/edit/points/" + member_id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ point_total }),
  });

  //const newMem = await getMember(member_id);

  // return newMem;
};

export { editMember, editMemberPoints };
