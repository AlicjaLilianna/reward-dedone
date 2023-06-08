import "./Reward.scss";
import Stars from "../Stars/Stars";
import { RewardContext } from "../../providers/RewardContext";
import React, { useContext } from "react";

function Reward() {
  const reward = useContext(RewardContext);

  return (
    <div className="reward">
      <label className="rewardContainer">
        {reward.title}
        <Stars points={reward.points} />
      </label>
    </div>
  );
}

export default Reward;
