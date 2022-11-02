const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const memberLogin = async (member) => {
  // Returns true if password is valid for given member
  const res = await fetch(API_ENDPOINT + "/members/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
  });
  const data = await res.json();
  return data;
};

export { memberLogin };
