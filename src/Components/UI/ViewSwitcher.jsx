import React from "react";
import styles from "./css/ViewSwitcher.module.css";
import { BsList, BsViewStacked } from "react-icons/bs";

const ViewSwitcher = ({ onSwitch }) => {
  return (
    <div id={styles.switchBox}>
      <button onClick={() => onSwitch("list")}>
        <BsList />
      </button>
      <button onClick={() => onSwitch("card")}>
        <BsViewStacked />
      </button>
    </div>
  );
};

export default ViewSwitcher;
