import { React, useState } from "react";
import styles from "./css/NewMission.module.css";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../utils/hooks/useToast";

const NewMission = ({ onAdd, client }) => {
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDesc, setMissionDesc] = useState("");
  const [missionDeadline, setMissionDeadline] = useState("");
  const [missionPayout, setMissionPayout] = useState(0);

  const navigate = useNavigate();
  const goToMissionBoard = () => navigate("/missions/all");

  const submitMissionData = (e) => {
    e.preventDefault();
    let client_id = client.client_id;

    if (missionTitle !== "" && missionDesc !== "" && missionDeadline !== "") {
      onAdd({
        missionTitle,
        missionDesc,
        missionPayout,
        missionDeadline,
        client_id,
      });
      successToast("Mission Created.");
      goToMissionBoard();
    } else errorToast("Error! No field can be blank.");
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
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="inputMissionTitle">Mission Title:</label>
            <input
              type="text"
              className="form-control"
              id="inputMissionTitle"
              name="job_name"
              onChange={(e) => setMissionTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
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
        <div className="form-row">
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
          <div className="form-group col-md-2 offset-6">
            <label htmlFor="inputPayout">Payout:</label>
            <input
              type="number"
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
