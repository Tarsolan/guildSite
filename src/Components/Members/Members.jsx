import React from "react";
import usePagination from "../../Hooks/usePagination";
import styles from "./css/members.module.css";
import Member from "./Member";
import Arrow from "../UI/Arrow";

const Members = ({ members, handleSelect }) => {
  const paginate = usePagination(members, 6);
  // console.log(`Current page: ${paginate.currentPage}`);

  return (
    <div id={styles.memberContainer}>
      <div id={styles.memberHead}>
        <Arrow side={"left"} paginate={paginate} size={40} />
        <h2>Member List</h2>
        <Arrow side={"right"} paginate={paginate} size={40} />
      </div>
      {members
        ? paginate.currentData().map((member) => {
            return <Member member={member} handleSelect={handleSelect} />;
          })
        : `There is no member data available.`}
    </div>
  );
};

export default Members;
