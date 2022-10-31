import React, { useEffect } from "react";
import usePagination from "../../Hooks/usePagination";
import MemberInfo from "./MemberInfo";
import styles from "./css/MembersInfo.module.css";
import Arrow from "../UI/Arrow";

const MembersInfo = ({ members, selectedMember }) => {
  const paginate = usePagination(members, 1);
  console.log(paginate);

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
        return <MemberInfo member={member} />;
      })}
      {/* <div className={styles.membersContainer}>
        {members.map((member) => {
          return <MemberInfo member={member} />;
        })}
      </div> */}
      <Arrow side={"right"} paginate={paginate} size={80} />
      {/* <Carousel>
        {members.map((member) => {
          return (
            <CarouselItem>
              <MemberInfo member={member} />
            </CarouselItem>
          );
        })}
      </Carousel> */}
    </div>
  );
};

export default MembersInfo;
