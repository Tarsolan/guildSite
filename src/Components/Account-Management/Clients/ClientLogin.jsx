import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../../utils/hooks/useToast";
import { clientLogin } from "../../../api/services/clients/clientLogin";
import LoginForm from "../../UI/LoginForm";

const ClientLogin = ({ handleLogin }) => {
  const [orgName, setOrgName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const goToClientInfo = () => navigate("/clients/info");

  const confirmLogin = async (e) => {
    e.preventDefault();

    var orgNameFilter = orgName.replace(/'/g, "''");

    var client = await clientLogin({ orgName: orgNameFilter, password });

    if (client === "inactive") {
      errorToast(
        "Client is inactive. Please contact administration to get your account re-activated."
      );
      setPassword("");
      return false;
    } else if (client === "noClient") {
      errorToast("Invalid organization name. Please try again.");
      setPassword("");
      return false;
    } else if (client === "noPass") {
      errorToast("Invalid password. Please try again.");
      setPassword("");
      return false;
    } else {
      successToast(`Login verified. Welcome, ${orgName}.`);

      handleLogin(client);
      goToClientInfo();
    }
  };

  return (
    <LoginForm
      header="Client Login"
      label="Organization"
      username={orgName}
      setUsername={setOrgName}
      password={password}
      setPassword={setPassword}
      register="/clients/register"
      onSubmit={confirmLogin}
    />
  );
};

export default ClientLogin;
