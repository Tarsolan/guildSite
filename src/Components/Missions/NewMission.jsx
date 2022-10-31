import { React, useState } from "react";
import styles from "./css/NewMission.module.css";
import { useNavigate } from "react-router-dom";

const NewMission = ({ onAdd, client, toast }) => {
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDesc, setMissionDesc] = useState("");
  const [missionDeadline, setMissionDeadline] = useState("");
  const [missionPayout, setMissionPayout] = useState(0);

  const navigate = useNavigate();
  const goToMissionBoard = () => navigate("/missions/all");

  const submitMissionData = (e) => {
    e.preventDefault();
    let client_id = client.client_id;
    onAdd({
      missionTitle,
      missionDesc,
      missionPayout,
      missionDeadline,
      client_id,
    });
    toast("Mission Created.", "success");
    goToMissionBoard();
  };

  return (
    <div className={styles.createMissionSection}>
      <h2>Create Mission</h2>
      <form
        action="/missions"
        method="post"
        className={styles.createMissionForm}
        onSubmit={submitMissionData}
      >
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="inputMissionTitle">Mission Title</label>
            <input
              type="text"
              className="form-control"
              id="inputMissionTitle"
              name="job_name"
              onChange={(e) => setMissionTitle(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="inputJobDescription">Description:</label>
            <textarea
              type="text"
              className="form-control"
              id="inputJobDescription"
              rows="5"
              name="job_description"
              onChange={(e) => setMissionDesc(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className="form-group col-md-4">
            <label htmlFor="inputDeadlineDate">Deadline Date:</label>
            <input
              type="date"
              name="deadline_date"
              id="inputDeadlineDate"
              className="form-control"
              onChange={(e) => setMissionDeadline(e.target.value)}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputPayout">Payout:</label>
            <input
              type="text"
              name="payout"
              id="inputPayout"
              className="form-control"
              onChange={(e) => setMissionPayout(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Mission!
        </button>
      </form>
    </div>
  );
};

export default NewMission;

/* 
<div className="new-form-row">
          <label htmlFor="inputMissionTitle">Mission Title:</label>
          <input type="text" className="" id="inputMissionTitle" />
        </div>
        <div className="new-form-row">
          <label htmlFor="inputMissionType">Mission Type:</label>
          <input type="text" className="" id="inputMissionType" />
        </div>
        <div className="new-form-row">
          <label htmlFor="inputOrganization">Organization:</label>
          <input type="text" className="" id="inputOrganization" />
        </div>


<div className="account-section">
      <h2 className="create-acc-heading">Create Account</h2>
      <form className="create-account-form" onSubmit={submitData}>
        <div className="form-row">
          <div className="form-group col-md-6">
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
          <div className="form-group col-md-6">
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
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="inputEmail4">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
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

        <div className="form-group">
          <label htmlFor="inputAddress2">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <hr />
        <div>
          <h3>Shipping Information</h3>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">Province</label>
            <select
              id="inputState"
              className="form-control"
              onChange={(e) => {
                setProv(e.target.value);
              }}
            >
              <option></option>
              <option>NL</option>
              <option>PE</option>
              <option>NS</option>
              <option>PB</option>
              <option>QC</option>
              <option>ON</option>
              <option>MB</option>
              <option>SK</option>
              <option>AB</option>
              <option>BC</option>
              <option>YT</option>
              <option>NT</option>
              <option>NU</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Postal Code</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              onChange={(e) => {
                setPostal(e.target.value);
              }}
            />
          </div>
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck2"
              onChange={() => {
                setRemember(!remember);
              }}
            />
            <label className="form-check-label" htmlFor="gridCheck2">
              Log me in automatically!
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account!
        </button>
      </form>
    </div>
*/
