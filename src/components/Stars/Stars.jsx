import React from "react";
import StarIcon from "../Icons/StarIcon";
import styles from "./Stars.module.scss";

function Stars(props) {
  return (
    <span className={styles.starContainer}>
      <StarIcon fill="#f59939" />
      <div className={styles.points}>{props.points}</div>
    </span>
  );
}

export default Stars;
