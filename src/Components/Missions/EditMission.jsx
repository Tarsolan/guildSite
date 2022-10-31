import React from "react";
import styles from "./css/EditMission.module.css";
import pushPin from "../../pictures/push_pin.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditMission = ({ mission, toast, onEdit }) => {
  const {
    complete,
    mission_num,
    job_name,
    contact_name,
    job_description,
    payout,
    organization,
    deadline_date,
  } = mission;

  const [newName, setNewName] = useState(job_name);
  const [newDesc, setNewDesc] = useState(job_description);
  const [newPay, setNewPay] = useState(payout);
  const [newDate, setNewDate] = useState(deadline_date);
  const [status, setStatus] = useState(complete);

  const navigate = useNavigate();
  const goToMissionPage = (num) => navigate(`/missions/info/${num}`);

  const updateStatus = (e) => {
    e.preventDefault();
    setStatus(!status);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    onEdit({
      mission_num,
      newName,
      newDesc,
      newPay,
      newDate,
      status,
    });

    toast("Mission Edited.", "success");

    goToMissionPage(mission_num);
  };

  return (
    <div id={styles.missionDetail}>
      <div id={styles.missionPage}>
        <div className={styles.detailTop}>
          <img
            src={pushPin}
            alt="A push pin to hold paper"
            className={styles.missionPin}
          />
          <form action="missions/edit" method="put" onSubmit={onSubmit}>
            <h1>
              <input
                name="newName"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ textAlign: "center", textDecoration: "underline" }}
              />
            </h1>

            <div className={styles.detailRow}>
              <span className={styles.detailRowHead}>Organization:</span>
              <span>{organization}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailRowHead}>Contact Name:</span>
              <span>{contact_name}</span>
            </div>

            <hr />

            <div className={styles.detailMid}>
              <h2>
                <label htmlFor="newDesc">Job Description</label>{" "}
              </h2>
              <textarea
                name="newDesc"
                className={styles.description}
                rows="5"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>
            <hr />
            <div className={styles.detailBot}>
              <div className={styles.detailPayout}>
                <h3>
                  <label htmlFor="newPay">Payout:</label>{" "}
                </h3>
                <input
                  type="number"
                  name="newPay"
                  value={newPay}
                  onChange={(e) => setNewPay(e.target.value)}
                />{" "}
                rocks
              </div>

              <div className={styles.missionNumContainer}>
                <span id={styles.missionNum}>{mission_num}</span>
                <span className={styles.missionNum}>Mission Number</span>
              </div>

              <div className={styles.deadline}>
                <h3>
                  <label htmlFor="newDate">Deadline:</label>{" "}
                </h3>
                <input
                  type="date"
                  name="newDate"
                  className={styles.date}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>

              <div className={styles.signatureContainer}>
                <span id={styles.signature}>Auron Warfield</span>
                <span className={styles.signature}>
                  Guild Registrar Signature
                </span>
              </div>
            </div>
            <hr />
            <div className={styles.detailButtons}>
              <button type="submit" className={styles.red}>
                Confirm Edits
              </button>
              <button
                onClick={(e) => updateStatus(e)}
                className={!status ? `${styles.green}` : `${styles.red}`}
              >
                {!status ? `Flag as Complete` : `Flag as Incomplete`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMission;
