import React from "react";
import StarIcon from "../Icons/StarIcon";

function Stars(props) {
  const starContainer = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "12px",
  };

  const points = {
    marginLeft: "8px",
  };

  return (
    <span style={starContainer}>
      <StarIcon fill="#f59939" />
      <div style={points}>{props.points}</div>
    </span>
  );
}

export default Stars;
