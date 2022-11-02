import React from "react";
import styles from "./css/MissionBoard.module.css";
import stamp from "../../utils/images/complete_2.png";
import pushPin from "../../utils/images/push_pin.png";

const Mission = ({ mission, onSelect }) => {
  const {
    complete,
    mission_num,
    job_name,
    job_description,
    payout,
    organization,
    deadline_date,
  } = mission;

  let date = new Date(deadline_date).toLocaleDateString();

  return (
    <div
      className={styles.missionInfo}
      key={mission_num}
      onClick={() => onSelect(mission)}
    >
      <div className={styles.missionTop}>
        <img
          src={pushPin}
          alt="A push pin to hold paper"
          className={styles.missionPin}
        />
        <div className={styles.missionTitle}>{job_name}</div>
        <div className={styles.missionClient}>{organization}</div>
      </div>

      <div className={styles.missionDesc}>{job_description}</div>
      {complete && (
        <img
          src={stamp}
          alt="Completed mission"
          className={styles.missionComplete}
        />
      )}

      <div className={styles.missionBottom}>
        <div>Mission No: {mission_num}</div>
        <div className={styles.missionDeadline}>
          <span>Deadline:</span>
          <span>{date}</span>
        </div>
        <div className={styles.missionPayout}>{payout} rocks</div>
      </div>
    </div>
  );
};

export default Mission;
