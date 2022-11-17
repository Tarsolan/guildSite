import React from "react";
import styles from "./css/ClientDisplay.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MissionTable from "../../UI/MissionTable";

const ClientDisplay = ({ client, missionInfo, handleSelect }) => {
  const {
    client_id,
    first_name,
    last_name,
    status,
    description,
    organization,
    missions,
  } = client;

  const [showDetail, setShowDetails] = useState(true);
  // let date = new Date(join_date).toLocaleDateString();

  const navigate = useNavigate();
  const goToEditDetails = () => navigate("/clients/info/edit");
  const goToMissionPage = (num) => navigate(`/missions/info/${num}`);

  const missionSelect = (num) => {
    handleSelect(num);
    goToMissionPage(num);
  };

  return (
    <div className={styles.clientDisplay}>
      <h2>Account Details</h2>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.displayRow}>
            <label>Contact Name:</label>
            <div>
              {first_name} {last_name}
            </div>
          </div>
          <div className={styles.displayRow}>
            <label>Organization:</label>
            <div>{organization}</div>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.displayRow}>
            <label>Client ID:</label>
            <div>{client_id}</div>
          </div>
          <div className={styles.displayRow}>
            <label>Status:</label>
            <div>{status ? `Active` : `Inactive`}</div>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.displayRowDesc}>
        <label>Description:</label>
        <div>{description}</div>
      </div>
      <hr />

      {showDetail ? (
        <div className={styles.displayRowBottom}>
          {/* We would like this section to contain links to the relevant mission reports */}
          <h3>
            <label>Mission Details:</label>
          </h3>
          <div>
            {missions.length > 0 ? (
              <div className={styles.missionList}>
                <MissionTable
                  missionInfo={missionInfo}
                  id={client_id}
                  selector={missionSelect}
                />
              </div>
            ) : (
              `No missions to show.`
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.displayButton}>
        <button
          onClick={() => setShowDetails(!showDetail)}
          className={styles.detailButton}
        >
          {showDetail ? `Hide Mission Details` : `Expand Mission Details`}
        </button>
        <div className={styles.editButton}>
          <button className="btn btn-primary" onClick={goToEditDetails}>
            Edit Account Details
          </button>
          <div style={{ textAlign: "center" }}>
            <Link to="/">Change Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDisplay;
