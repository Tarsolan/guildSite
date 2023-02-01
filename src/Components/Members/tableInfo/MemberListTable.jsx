import React from "react";
import MemberListItem from "./MemberListItem";
import styles from "./css/MemberListTable.module.css";

const MemberListTable = ({ members }) => {
  return (
    <table className="table table" id={styles.memberTable}>
      <thead className="thead-dark">
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Name</th>
          <th scope="col">Title</th>
          <th scope="col">Points</th>
          <th className={styles.descCol}>Description</th>
        </tr>
      </thead>
      <tbody>
        {members
          ? members.map((member, i) => {
              return <MemberListItem member={member} key={i} />;
            })
          : `There is no member data available.`}
      </tbody>
    </table>
  );
};

export default MemberListTable;
