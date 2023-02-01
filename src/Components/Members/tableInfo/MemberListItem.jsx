import React from "react";
import styles from "./css/MemberListItem.module.css";

const MemberListItem = ({ member }) => {
  const { full_name, title, race, desc, rank_name, member_id, point_total } =
    member;

  return (
    <tr className={styles["row" + rank_name]}>
      <td>{member_id}</td>
      <td>{full_name}</td>
      <td>{title}</td>
      <td>{point_total}</td>
      <td className={styles.descCol}>
        {desc} {race}.
      </td>
    </tr>
  );
};

export default MemberListItem;
