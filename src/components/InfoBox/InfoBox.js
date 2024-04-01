import React from "react";
import Button from "../Buttons/Button";
import classes from "./InfoBox.module.scss";

function Infobox(props) {
  return (
    <div className={classes.container}>
      {props.case === "tasks" ? (
        <div className={classes.content}>
          Looks like <br />
          there is nothing to do here.
          <Button buttonType="primary" btnText="Add first task" />
        </div>
      ) : (
        <div className={classes.content}>
          Looks like <br />
          there is nothing to gain here.
          <Button buttonType="primary" btnText="Add first reward" />
        </div>
      )}
    </div>
  );
}

export default Infobox;
