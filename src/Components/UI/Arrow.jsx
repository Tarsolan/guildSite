import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./css/Arrow.module.css";

const Arrow = ({ side, paginate, size }) => {
  return (
    <>
      {side === "left" ? (
        <span
          onClick={paginate.prev}
          className={
            paginate.currentPage === 1
              ? `${styles.leftArrow} ${styles.grey}`
              : styles.leftArrow
          }
        >
          <AiOutlineArrowLeft size={size} />
        </span>
      ) : (
        <span
          onClick={paginate.next}
          className={
            paginate.currentPage === paginate.maxPage
              ? `${styles.rightArrow} ${styles.grey}`
              : styles.rightArrow
          }
        >
          <AiOutlineArrowRight size={size} />
        </span>
      )}
    </>
  );
};

export default Arrow;
