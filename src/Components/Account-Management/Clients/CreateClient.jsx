import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import accountStyles from "../css/AccountInfo.module.css";

import { successToast, errorToast } from "../../../utils/hooks/useToast";
// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
import { API_ENDPOINT } from "../../../api/connection/server";
// const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const CreateClient = ({ onAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [orgName, setOrganization] = useState("");
  const [description, setDescription] = useState("");
  const [captcha, setCaptcha] = useState(false);

  const orgNames = async () => {
    let res = await fetch(API_ENDPOINT + "/clients/orgNames");
    let data = res.json();

    return data;
  };

  const navigate = useNavigate();
  const goToClientInfo = () => navigate("/clients/info");

  const addClient = async (e) => {
    let returnFlag = false;
    e.preventDefault();

    let orgs = await orgNames();

    // Validate what needs to be validated before saving anything!
    orgs.map((org) => org.organization === orgName && (returnFlag = true));

    if (returnFlag) {
      errorToast(
        "Sorry, that organization already has an account with us. Please log in or enter a different name."
      );
      return;
    }

    if (!captcha) {
      errorToast(
        "You, my friend, are a robot. We don't take kindly to your kind around here."
      );
      return;
    }

    if (password !== passwordConfirm) {
      errorToast("Invalid entry. The two passwords do not match.");
      return;
    }

    var desc = description.replace(/'/g, "''");
    var orgNameFilter = orgName.replace(/'/g, "''");

    await onAdd({
      first_name: firstName,
      last_name: lastName,
      organization: orgNameFilter,
      description: desc,
      password,
    });

    successToast("Client Account Created.");

    goToClientInfo();
  };

  return (
    <div className={accountStyles.accountSection}>
      <h2>New Client Information</h2>
      <form action="/newClient" method="post" onSubmit={addClient}>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="inputOrg">Organization Name</label>
            <input
              type="text"
              className="form-control"
              id="inputOrg"
              onChange={(e) => {
                setOrganization(e.target.value);
              }}
              value={orgName}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="inputFirstName4">First Name</label>
            <input
              type="text"
              className="form-control"
              id="inputFirstName4"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
            />
          </div>
          <div className="form-group col">
            <label htmlFor="inputLastName4">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="inputLastName4"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
            />
          </div>
        </div>
        <hr />
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <div className="form-group col">
            <label htmlFor="inputPassword5"> Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword5"
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              value={passwordConfirm}
            />
          </div>
        </div>

        <hr />
        <div>
          <h3>Other Information</h3>
        </div>
        <div className="form-group">
          <label htmlFor="inputDesc">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="inputDesc"
            rows="4"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
        </div>
        <hr />
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
              onChange={() => {
                setCaptcha(!captcha);
              }}
            />
            <label className="form-check-label" htmlFor="gridCheck">
              I am not a robot!
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Account!
        </button>
      </form>
    </div>
  );
};

export default CreateClient;
