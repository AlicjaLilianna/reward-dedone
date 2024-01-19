import React from "react";
import classes from "./Button.module.scss";
import classNames from "classnames";

function Button(props) {
  switch (props.buttonType) {
    case "addIcon":
      const cl = classNames(classes.button, classes.btnAdd, classes.btnPrimary);
      return (
        <button role="button" className={cl} onClick={props.btnEvent}>
          {props.btnText}
        </button>
      );
    case "primary":
      const clp = classNames(classes.button, classes.btnPrimary);
      return (
        <button role="button" className={clp} onClick={props.btnEvent}>
          {props.btnText}
        </button>
      );
    case "secondary": {
      const cls = classNames(classes.button, classes.btnSecondary);

      return (
        <button role="button" className={cls} onClick={props.btnEvent}>
          {props.btnText}
        </button>
      );
    }
  }
}

export default Button;
