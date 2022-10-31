import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/CreateClient.module.css";

const CreateClient = ({ onAdd, toast, clientLogin, setClient, setLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [orgName, setOrganization] = useState("");
  const [description, setDescription] = useState("");
  const [captcha, setCaptcha] = useState(false);

  const orgNames = async () => {
    let res = await fetch("http://localhost:3001/clients/orgNames");
    let data = res.json();

    return data;
  };

  const navigate = useNavigate();
  const goToClientInfo = () => navigate("/account/client/info");

  const addClient = async (e) => {
    let returnFlag = false;
    e.preventDefault();

    let orgs = await orgNames();

    // Validate what needs to be validated before saving anything!
    orgs.map((org) => org.organization === orgName && (returnFlag = true));

    if (returnFlag) {
      toast(
        "Sorry, that organization already has an account with us. Please log in or enter a different name.",
        "error"
      );
      return;
    }
    if (!captcha) {
      toast(
        "You, my friend, are a robot. We don't take kindly to your kind around here.",
        "error"
      );
      return;
    }

    if (password !== passwordConfirm) {
      toast("Invalid entry. The two passwords do not match.", "error");
      return;
    }

    var desc = description.replace(/'/g, "''");
    var orgNameFilter = orgName.replace(/'/g, "''");

    await onAdd({
      firstName,
      lastName,
      organization: orgNameFilter,
      description: desc,
      password,
    });

    toast("Client Account Created.", "success");
    var client = await clientLogin({ orgName, password });
    setLogin(true);
    setClient(client);
    goToClientInfo();
    // setTimeout(async () => {
    //   var client = await clientLogin({ orgName, password });
    //   setLogin(true);
    //   setClient(client);
    //   goToClientInfo();
    // }, 1000);
  };

  return (
    <div className={styles.accountSection}>
      <h2>New Client Information</h2>
      <form
        className={styles.createAccountForm}
        action="/newClient"
        method="post"
        onSubmit={addClient}
      >
        <div className={styles.formRow}>
          <div className="form-group col-md-6">
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
        <div className={styles.formRow}>
          <div className="form-group col-md-5">
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
          <div className="form-group col-md-5">
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
        <div className={styles.formRow}>
          <div className="form-group col-md-4">
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
          <div className="form-group col-md-4">
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
