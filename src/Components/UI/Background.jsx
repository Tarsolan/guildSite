import React from "react";
import styles from "./css/background.module.css";

const Background = () => {
  return (
    <>
      <div id={styles.BackgroundEffects}>
        <div className={`${styles.bg}`}></div>
        <div className={`${styles.bg} ${styles.bg2}`}></div>
        <div className={`${styles.bg} ${styles.bg3}`}></div>
      </div>
    </>
  );
};

export default Background;
