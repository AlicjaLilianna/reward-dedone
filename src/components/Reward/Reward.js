import Stars from "../Stars/Stars";
import React, { useContext } from "react";

function Reward(props) {
  return (
    <div className="reward">
      <label className="rewardContainer">
        {props.title}
        <Stars points={props.points} />
      </label>
    </div>
  );
}

export default Reward;
