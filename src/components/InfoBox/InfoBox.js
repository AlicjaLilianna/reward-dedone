import React from "react";
import styled from "@emotion/styled";
import Button from "../Buttons/Button";

function Infobox(props) {
  const Container = styled("div")`
    border-radius: 25px;
    background-color: #fcfcfc;
    border: 1px solid #eef1f7;
    width: 100%;
    overflow: hidden;
    z-index: 5;
    position: relative;
  `;
  const Content = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 31px 33px;
    gap: 24px;
    text-align: center;
  `;
  return (
    <Container>
      {props.case === "tasks" ? (
        <Content>
          Looks like <br />
          there is nothing to do here.
          <Button btnClass="btn-primary" btnText="Add first task" />
        </Content>
      ) : (
        <Content>
          Looks like <br />
          there is nothing to gain here.
          <Button btnClass="btn-primary" btnText="Add first reward" />
        </Content>
      )}
    </Container>
  );
}

export default Infobox;
