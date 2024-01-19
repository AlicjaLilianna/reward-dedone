import Stars from "../Stars/Stars";
import React, { useContext } from "react";
import styles from "./Reward.module.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { RewardContext } from "../../providers/RewardContext";

function Reward(props) {
  const reward = useContext(RewardContext);

  return (
    <div className={styles.reward}>
      <label
        className={styles.rewardContainer}
        onClick={() => {
          reward.buyReward();
          window.location.reload(true);
        }}
      >
        {props.title}
        <Stars points={props.points} />
      </label>
      <DeleteOutlineIcon
        color="error"
        onClick={() => {
          reward.deleteReward();
          window.location.reload(true);
        }}
      >
        {" "}
      </DeleteOutlineIcon>
    </div>
  );
}

export default Reward;
