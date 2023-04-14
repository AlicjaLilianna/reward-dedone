import React, { Component } from "react";
import Select, { components } from "react-select";
import feather from "../../assets/feather.svg";
import exclamation from "../../assets/exclamation.svg";
import fire from "../../assets/fire.svg";
import styled from "@emotion/styled";
import Stars from "../Stars/Stars";
import "./SelectInput.scss";

function SelectInput(props) {
  const InputContainer = styled("div")`
    display: block;
    position: relative;
  `;
  const Label = styled("label")`
    position: absolute;
    font-size: 12px;
    color: rgba(36, 53, 69, 0.68);
    top: 10px;
    left: 15px;
    z-index: 15;
  `;

  const prioritiesTypes = [
    {
      value: "very-high",
      label: "Very high",
      points: 75,
      icon: fire,
    },
    {
      value: "high",
      label: "High",
      points: 50,
      icon: exclamation,
    },
    {
      value: "normal",
      label: "Normal",
      points: 25,
      icon: "",
    },
    {
      value: "low",
      label: "Low",
      points: 10,
      icon: feather,
    },
  ];

  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <div
        styles={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {props.data.icon ? (
          <img
            src={props.data.icon}
            style={{
              width: 20,
              height: 18,
              marginRight: 16,
            }}
            alt={props.data.label}
          />
        ) : (
          <span style={{ height: 18, marginRight: 36 }} />
        )}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "75%",
          }}
        >
          {props.data.label}
        </span>
        <Stars points={props.data.points} />
      </div>
    </Option>
  );

  return (
    <InputContainer>
      <Label for={props.name}>{props.label}</Label>
      <Select
        menuPlacement="top"
        defaultValue={prioritiesTypes[2]}
        options={prioritiesTypes}
        components={{ Option: IconOption }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            padding: "17px 15px 5px 15px",
            appearance: "none",
            backgroundColor: "#fff",
            border: "1px solid rgba(31, 62, 82, 0.09)",
            borderRadius: "15px",
            width: "100%",
            fontSize: "16px",
            fontFamily: "Poppins",
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            padding: 0,
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            padding: 0,
            margin: 0,
          }),
          Input: (baseStyles) => ({
            paddingBottom: 0,
            paddingTop: 0,
            margin: 0,
          }),
          indicatorsContainer: (baseStyles) => ({
            border: 0,
          }),
        }}
        name={props.name}
      />
    </InputContainer>
  );
}

export default SelectInput;
