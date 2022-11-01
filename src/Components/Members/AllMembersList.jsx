import React from "react";
import usePagination from "../../Hooks/usePagination";
import styles from "./css/AllMemberList.module.css";
import MemberCard from "./cardInfo/MemberCard";
import Arrow from "../UI/Arrow";
import { useState } from "react";
import MemberListTable from "./tableInfo/MemberListTable";
import ViewSwitcher from "../UI/ViewSwitcher";

const Members = ({ members, handleSelect }) => {
  const [viewState, setViewState] = useState("list");

  const paginate = usePagination(members, 6);
  // console.log(`Current page: ${paginate.currentPage}`);

  return (
    <div id={styles.memberContainer}>
      <ViewSwitcher onSwitch={setViewState} />

      {viewState === "card" && (
        <div id={styles.memberHead}>
          <Arrow side={"left"} paginate={paginate} size={40} />
          <h2>Member List</h2>
          <Arrow side={"right"} paginate={paginate} size={40} />
        </div>
      )}

      {viewState === "card" ? (
        <>
          {members
            ? paginate.currentData().map((member, i) => {
                return (
                  <MemberCard
                    member={member}
                    handleSelect={handleSelect}
                    key={i}
                  />
                );
              })
            : `There is no member data available.`}
        </>
      ) : (
        <MemberListTable members={members} />
      )}

      <div id={styles.memberHead}>
        {viewState === "card" && (
          <>
            <Arrow side={"left"} paginate={paginate} size={40} />
            <Arrow side={"right"} paginate={paginate} size={40} />
          </>
        )}
      </div>
    </div>
  );
};

export default Members;
