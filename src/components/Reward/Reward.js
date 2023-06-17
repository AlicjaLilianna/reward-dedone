import Stars from "../Stars/Stars";
import React from "react";
import styles from "./Reward.module.scss";

function Reward(props) {
  return (
    <div className={styles.reward}>
      <label className={styles.rewardContainer}>
        {props.title}
        <Stars points={props.points} />
      </label>
    </div>
  );
}

export default Reward;
