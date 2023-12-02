import Stars from "../Stars/Stars";
import React, { useContext } from "react";
import styles from "./Reward.module.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { RewardContext } from "../../providers/RewardContext";

function Reward(props) {
  const reward = useContext(RewardContext);

  return (
    <div className={styles.reward}>
      <label className={styles.rewardContainer}>
        {props.title}
        <Stars points={props.points} />
        <DeleteOutlineIcon
          color="error"
          onClick={() => {
            reward.deleteReward();
            console.log(reward);
          }}
        >
          {" "}
        </DeleteOutlineIcon>
      </label>
    </div>
  );
}

export default Reward;
