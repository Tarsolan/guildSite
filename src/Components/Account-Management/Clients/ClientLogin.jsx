import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/ClientLogin.module.css";
import { successToast, errorToast } from "../../../utils/hooks/useToast";
import { clientLogin } from "../../../api/services/clients/clientLogin";

const ClientLogin = ({ handleLogin }) => {
  const [orgName, setOrgName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const goToClientInfo = () => navigate("/clients/info");

  // STILL NEED PASSWORD VALIDATION
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
    <div className={styles.clientLogin}>
      <h2>Client Login</h2>
      <form className={styles.loginForm} onSubmit={confirmLogin} method="post">
        <div className="form-group">
          <label htmlFor="orgName">Organization Name</label>
          <input
            type="text"
            className="form-control"
            id="orgName"
            onChange={(e) => {
              setOrgName(e.target.value);
            }}
            value={orgName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword2">Password</label>
          <input
            type="password"
            className="form-control"
            id="InputPassword2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <small id="passwordHelp" className="form-text text-light">
            Forgot your password?
          </small>
        </div>
        {/* <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="gridCheck"
            onChange={() => {
              toggleRemember(!remember);
            }}
          />
          <label className="form-check-label" htmlFor="gridCheck">
            Remember Me
          </label>
        </div> */}
        <br />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <Link to="/clients/register">New here? Register as a new client!</Link>
    </div>
  );
};

export default ClientLogin;
