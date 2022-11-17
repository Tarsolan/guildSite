import React from "react";
import styles from "./css/ViewSwitcher.module.css";
import { BsList, BsViewStacked } from "react-icons/bs";

const ViewSwitcher = ({ onSwitch }) => {
  return (
    <div id={styles.switchBox}>
      <button onClick={() => onSwitch("card")}>
        <BsViewStacked /> <span>Cards</span>
      </button>
      <button onClick={() => onSwitch("list")}>
        <BsList /> <span>List</span>
      </button>
    </div>
  );
};

export default ViewSwitcher;
