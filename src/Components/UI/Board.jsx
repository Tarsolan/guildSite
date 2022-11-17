import React from "react";
import styles from "./css/Board.module.css";

const Board = (props) => {
  return <div className={styles.missionBoard}>{props.children}</div>;
};

export default Board;
