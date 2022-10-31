import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={styles.pageNotFound}>
      <h2>Error - Page Not Found</h2>
      <Link to="/">Click here to go home.</Link>
    </div>
  );
};

export default PageNotFound;
