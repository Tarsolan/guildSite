import React, { useEffect } from "react";
import usePagination from "../../../utils/hooks/usePagination";
import SingleMemberInfo from "./SingleMemberInfo";
import styles from "./css/MembersInfo.module.css";
import Arrow from "../../UI/Arrow";

const MembersInfo = ({ members, selectedMember, pointEdit }) => {
  const paginate = usePagination(members, 1);
  // console.log(paginate);

  const findMember = () => {
    let id_count = 1;

    members.forEach((member) => {
      if (member.member_id !== selectedMember.member_id) {
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
        return <SingleMemberInfo member={member} pointEdit={pointEdit} />;
      })}
      <Arrow side={"right"} paginate={paginate} size={80} />
    </div>
  );
};

export default MembersInfo;
