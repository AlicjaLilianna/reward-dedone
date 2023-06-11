import Stars from "../src/components/Stars/Stars";
import { RewardContext } from "../src/providers/RewardContext";
import React, { useContext } from "react";

function Reward() {
  const reward = useContext(RewardContext);

  return (
    <div className="reward">
      <label className="rewardContainer"></label>
    </div>
  );
}

export default Reward;
