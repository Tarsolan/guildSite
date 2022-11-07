import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../utils/providers/MemberContextControl";
import styles from "./css/memberDisplay.module.css";

const MemberDisplay = ({ selectMission }) => {
  const authCtx = useContext(AuthContext);
  const {
    member_id,
    full_name,
    desc,
    title,
    join_date,
    rank_name,
    race,
    spec,
    image_url,
    completed,
    missionDetails,
  } = authCtx.member;
  let date = new Date(join_date).toLocaleDateString();

  const navigate = useNavigate();
  const goToEditDetails = () => navigate("/members/account/info/edit");
  const goToMissionPage = (num) => navigate(`/missions/info/${num}`);

  // var missionNames = [];
  // for (let i = 0; i < missionDetails.length; i++) {
  //   missionNames.push(missionDetails[i].job_name);
  //   console.log(missionDetails[i].job_name);
  //   console.log(missionNames);
  // }

  const handleSelectMission = (num) => {
    selectMission(num);
    goToMissionPage(num);
  };

  const missionNames = missionDetails.map((mission) => {
    return (
      <li
        className={styles.missionItem}
        key={mission.mission_num}
        onClick={() => handleSelectMission(mission.mission_num)}
      >
        {mission.job_name}
      </li>
    );
  });

  return (
    <div className={styles.memberDisplay}>
      <h2>Account Details</h2>
      {authCtx.isAdmin && <p>I AM ADMIN</p>}
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.displayRow}>
            <label>Full Name:</label>
            <div>{full_name}</div>
          </div>
          <div className={styles.displayRow}>
            <label>Title:</label>
            <div>{title}</div>
          </div>
          <div className={styles.displayRow}>
            <label>Race:</label>
            <div>{race}</div>
          </div>
          <div className={styles.displayRow}>
            <label>Rank:</label>
            <div>{rank_name}</div>
          </div>
        </div>
        <div>
          <div className={styles.displayRow}>
            <label>Member ID:</label>
            <div>{member_id}</div>
          </div>
          <div className={styles.displayRow}>
            <label>Join Date:</label>
            <div>{date}</div>
          </div>
          {/* <div className={styles.displayRow}>
						<label>Profile Picture:</label>
						<div>{image_url}</div>
					</div> */}
          <div className={styles.displayRow}>
            <label>Completed Missions:</label>
            <div>{completed}</div>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.displayRowDesc}>
        <label>Description:</label>
        <div>{desc}</div>
      </div>
      <hr />
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.displayRowBottom}>
            {/* We would like this section to contain links to the relevant mission reports */}
            <label>Mission Details:</label>
            <div>
              {missionDetails ? <ul>{missionNames}</ul> : `No jobs to show.`}
            </div>
          </div>
        </div>
        <div className={styles.displayRowBottom}>
          <label>Specializations:</label>
          <div>
            {spec
              ? spec.map((speci) => {
                  return <li key={speci.spec_id}>{speci}</li>;
                })
              : `No specs to show.`}
          </div>
        </div>
      </div>
      <div className={styles.displayButton}>
        <button className="btn btn-primary" onClick={goToEditDetails}>
          Edit Account Details
        </button>
        <div>
          <a href="http://localhost:3000/">Change Password</a>
        </div>
      </div>
    </div>
  );
};

export default MemberDisplay;
