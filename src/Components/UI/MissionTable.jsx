import React from "react";
import styles from "./css/MissionTable.module.css";

const MissionTable = ({ missionInfo, id, selector }) => {
  return (
    <table className="table table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Mission No.</th>
          <th scope="col">Title</th>
          <th scope="col" className={styles.descCol}>
            Description
          </th>
          <th scope="col">Complete</th>
        </tr>
      </thead>
      <tbody style={{ color: "white" }}>
        {missionInfo.map((mission) => {
          if (mission.client_id === id) {
            return (
              <tr
                key={mission.mission_num}
                onClick={() => selector(mission.mission_num)}
              >
                <td>{mission.mission_num}</td>
                <td style={{ fontWeight: "700" }}>{mission.job_name}</td>
                <td className={styles.descCol}>{mission.job_description}</td>
                <td>{mission.complete ? "Yes" : "No"}</td>
              </tr>
            );
          } else return <></>;
        })}
      </tbody>
    </table>
  );
};

export default MissionTable;
