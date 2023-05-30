import { useLocation } from "react-router-dom";
import Button from "../Buttons/Button";
import StarIcon from "../Icons/StarIcon";
import styled from "@emotion/styled";
import bckg from "../../assets/background.svg";
import bckgRewards from "../../assets/background_rewards.svg";
import { ModalContext } from "../../providers/ModalContext";
import React, { useContext } from "react";
import { PointsContext } from "../../providers/PointsContext";

function Header() {
  const [points] = React.useContext(PointsContext);
  const modal = useContext(ModalContext);
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const background = location === "rewards" ? bckgRewards : bckg;
  //styles
  const Header = styled("header")`
    position: relative;
    padding: 24px 16px 24px 16px;
    margin-bottom: -24px;
    overflow: hidden;

    &::after {
      z-index: 0;
      width: 100%;
      height: 100%;
      display: block;
      top: 0;
      right: ${location === "rewards" ? 0 : "9%"};
      position: absolute;
      content: "";
      background: url(${background}) no-repeat;
      background-size: ${location === "rewards" ? "75%" : "60%"};
      background-position: top right;
      opacity: 0.4;
    }
  `;

  const TitleContainer = styled("div")`
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    padding: 0px 8px;
    justify-content: space-between;

    .title {
      font-family: "DM Serif Display", "Georgia", serif;
      font-size: 25px;
      font-weight: 400;
      line-height: 37px;
      color: #435f7c;
      letter-spacing: calc(0.1 * 1ch);
    }
  `;

  const StarContainer = styled("div")`
    position: relative;
    overflow: hidden;
    z-index: 5;
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    gap: 8px;
    border-radius: 50px;
    margin-bottom: 60px;
    font-size: 12px;
    color: black;

    &::before {
      top: 0;
      left: 0;
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: #435d7c4d;
    }
  `;

  const addNew = () => {
    modal.toggleModal();
  };

  return (
    <Header>
      <StarContainer>
        <StarIcon fill="#000000" /> <div>{points}</div>
      </StarContainer>
      <TitleContainer>
        <h1 className="title">
          {location === "rewards" ? "Rewards" : "Tasks"}
        </h1>
        <Button btnClass="btn-primary btn-add" btnText="+" btnEvent={addNew} />
      </TitleContainer>
    </Header>
  );
}

export default Header;
