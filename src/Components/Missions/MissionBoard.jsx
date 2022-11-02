import React from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "../../utils/hooks/usePagination";
import styles from "./css/MissionBoard.module.css";

import Mission from "./Mission";

const MissionBoard = ({ missions, handleSelect }) => {
  const paginate = usePagination(missions, 6); // THE SECOND NUMBER HERE CONTROLS HOW MANY MISSIONS ARE DISPLAYED PER PAGE
  const navigate = useNavigate();
  const goToMissionPage = (num) => navigate(`/missions/info/${num}`);

  const onSelect = (mission) => {
    handleSelect(mission);
    goToMissionPage(mission.mission_num);
  };

  return (
    <>
      {missions && (
        <div id={styles.missionBoardHead}>
          {[...Array(paginate.maxPage)].map((e, page) => {
            return (
              <button
                key={page}
                onClick={(e) => paginate.jump(e.target.value)}
                value={page + 1}
              >
                {page + 1}
              </button>
            );
          })}
        </div>
      )}
      <div id={styles.missionBoard}>
        {missions
          ? paginate.currentData().map((mission, i) => {
              return <Mission mission={mission} onSelect={onSelect} key={i} />;
            })
          : `There is no mission data available.`}
      </div>
    </>
  );
};

export default MissionBoard;
