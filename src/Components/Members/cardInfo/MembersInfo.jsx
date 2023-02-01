import React, { useEffect, useContext } from "react";
import usePagination from "../../../utils/hooks/usePagination";
import SingleMemberInfo from "./SingleMemberInfo";
import styles from "./css/MembersInfo.module.css";
import Arrow from "../../UI/Arrow";
import MemberContext from "../../../utils/providers/members/AllMemberContext";

const MembersInfo = ({}) => {
  const memberCtx = useContext(MemberContext);
  const paginate = usePagination(memberCtx.members, 1);

  const findMember = () => {
    let id_count = 1;

    memberCtx.members.forEach((member) => {
      if (member.member_id !== memberCtx.selectedMemberID) {
        id_count++;
      } else {
        paginate.jump(id_count);
      }
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
    findMember();
  }, []);

  return (
    <div className={styles.singleMember}>
      <Arrow side={"left"} paginate={paginate} size={80} />
      {paginate.currentData().map((member) => {
        return (
          <SingleMemberInfo
            member={member}
            pointEdit={memberCtx.memberPointEdit}
          />
        );
      })}
      <Arrow side={"right"} paginate={paginate} size={80} />
    </div>
  );
};

export default MembersInfo;
