import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/ClientLogin.module.css";

const ClientLogin = ({ clientLogin, setClient, setLogin, toast }) => {
  const [orgName, setOrgName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const goToClientInfo = () => navigate("/account/client/info");

  // STILL NEED PASSWORD VALIDATION
  const confirmLogin = async (e) => {
    e.preventDefault();

    var orgNameFilter = orgName.replace(/'/g, "''");

    var client = await clientLogin({ orgName: orgNameFilter, password });

    if (client === "inactive") {
      toast(
        "Client is inactive. Please contact administration to get your account re-activated.",
        "error"
      );
      setPassword("");
      return false;
    } else if (client === "noClient") {
      toast("Invalid organization name. Please try again.", "error");
      setPassword("");
      return false;
    } else if (client === "noPass") {
      toast("Invalid password. Please try again.", "error");
      setPassword("");
      return false;
    } else {
      toast(`Login verified. Welcome, ${orgName}.`, "success");
      setLogin(true);
      setClient(client);
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
      <Link to="/register/client">New here? Register as a new client!</Link>
    </div>
  );
};

export default ClientLogin;
