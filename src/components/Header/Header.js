import { useLocation } from "react-router-dom";
import Button from "../Buttons/Button";
import StarIcon from "../Icons/StarIcon";
import styled from "@emotion/styled";
import bckg from "../../assets/background.svg";
import bckgRewards from "../../assets/background_rewards.svg";
import { ModalContext } from "../../providers/ModalContext";
import { useContext } from "react";

function Header() {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const background = location === "rewards" ? bckgRewards : bckg;
  //styles
  const Header = styled("header")`
    position: relative;
    border-radius: 0px 0px 30px 30px;
    padding: 24px 16px 60px 16px;
    margin-bottom: -61px;
    overflow: hidden;

    &::after {
      z-index: 0;
      width: 200%;
      height: 160%;
      display: block;
      top: -40%;
      left: 0;
      position: absolute;
      content: "";
      background: ${location === "rewards" ? "#9491B8" : "#feb5a6"}
        url(${background});
      background-size: 60% 92%;
      background-position: bottom left;
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
      font-family: "Amaranth", "Verdena", sans-serif;
      font-size: 32px;
      line-height: 37px;
      color: white;
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
    margin: 0 0 58px auto;
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

  const modal = useContext(ModalContext);

  const addNew = () => {
    modal.toggleModal();
  };

  return (
    <Header>
      <StarContainer>
        <StarIcon fill="#000000" /> <div>12</div>
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
