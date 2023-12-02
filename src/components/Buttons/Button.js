import React, { useContext } from "react";
import styled from "@emotion/styled";
import { DrawerContext } from "../../providers/DrawerContext";

function Button(props) {
  //styles
  const Button = styled("button")`
    font-family: Poppins;
    border-radius: 15px;
    padding: 13px 20px;
    border: 1px solid transparent;
    font-size: 12px;
    &.btn-primary {
      min-width: 135px;
      background-color: #435f7c;
      color: white;
      &:active {
        background-color: darken(#435f7c, 10%);
      }
    }
    &.btn-add {
      min-width: auto !important;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 700;
      transform: rotate(5deg);
    }
    &.btn-secondary {
      background-color: transparent;
      min-width: 135px;
      border-color: #435f7c;
      color: #435f7c;
    }
  `;

  return (
    <Button
      role="button"
      className={props.btnClass}
      onClick={props.btnEvent}
      type={props.type}
      form={props.form}
    >
      {props.btnText}
    </Button>
  );
}

export default Button;
