import { React, useState } from "react";
import { successToast, errorToast } from "../../../utils/hooks/useToast";
import { useNavigate } from "react-router-dom";
import styles from "./css/EditClient.module.css";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const EditClient = ({ client, onEdit }) => {
  const {
    client_id,
    first_name,
    last_name,
    organization,
    description,
    missions,
    status,
  } = client;

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [newOrgName, setOrganization] = useState(organization);
  const [newDescription, setDescription] = useState(description);
  const [captcha, setCaptcha] = useState(false);

  const orgNames = async () => {
    let res = await fetch(API_ENDPOINT + "/clients/orgNames");
    let data = res.json();

    return data;
  };

  const navigate = useNavigate();
  const goToClientInfo = () => navigate("/clients/info");

  const editClient = async (e) => {
    let returnFlag = false;
    e.preventDefault();

    // Validate what needs to be validated before saving anything!
    let orgs = await orgNames();
    orgs.forEach((org) => {
      if (org.organization === newOrgName && newOrgName !== organization) {
        returnFlag = true;
      }
    });

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

    // var desc = newDescription.replace(/'/g, "''");
    //var orgNameFilter = newOrgName.replace(/'/g, "''");

    await onEdit({
      client_id,
      first_name: firstName,
      last_name: lastName,
      organization: organization,
      description: description,
      status: status,
      missions: missions,
    });

    successToast("Client Account Edited.");
    goToClientInfo();
  };

  return (
    <div className={styles.accountSection}>
      <h2>Edit Client</h2>
      <form
        className={styles.createAccountForm}
        action="/newClient"
        method="post"
        onSubmit={editClient}
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
              value={newOrgName}
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
            value={newDescription}
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
          Confirm Account Edits!
        </button>
      </form>
    </div>
  );
};

export default EditClient;
