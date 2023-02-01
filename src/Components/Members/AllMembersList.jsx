import React from "react";
import usePagination from "../../utils/hooks/usePagination";
import styles from "./css/AllMemberList.module.css";
import MemberCard from "./cardInfo/MemberCard";
import Arrow from "../UI/Arrow";
import { useState, useContext } from "react";
import MemberListTable from "./tableInfo/MemberListTable";
import ViewSwitcher from "../UI/ViewSwitcher";
import MemberContext from "../../utils/providers/members/AllMemberContext";

const Members = () => {
  const [viewState, setViewState] = useState("card");
  const memberCtx = useContext(MemberContext);

  const paginate = usePagination(memberCtx.members, 6);
  // console.log(`Current page: ${paginate.currentPage}`);

  return (
    <div id={styles.memberContainer}>
      <div>
        <ViewSwitcher onSwitch={setViewState} />
      </div>

      {viewState === "card" ? (
        <div id={styles.memberHead}>
          <Arrow side={"left"} paginate={paginate} size={40} />
          <h2>Members</h2>
          <Arrow side={"right"} paginate={paginate} size={40} />
        </div>
      ) : (
        <h2 style={{ color: "white", textAlign: "center" }}>Members</h2>
      )}

      {viewState === "card" ? (
        <>
          {memberCtx.members
            ? paginate.currentData().map((member, i) => {
                return (
                  <MemberCard
                    member={member}
                    handleSelect={memberCtx.setSelectedMemberID}
                    key={i}
                  />
                );
              })
            : `There is no member data available.`}
        </>
      ) : (
        <MemberListTable members={memberCtx.members} />
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
