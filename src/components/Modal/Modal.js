import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { useContext } from "react";
import { ModalContext } from "../../providers/ModalContext";
import Button from "../Buttons/Button";
import Inputs from "../Inputs/Inputs";
import SelectInput from "../Inputs/SelectInput";

function Modal(props) {
  const Darken = styled("div")`
    &:before {
      content: "";
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 11;
      display: block;
      background-color: #8d8d8d;
      mix-blend-mode: multiply;
      top: 0;
      left: 0;
    }
  `;
  const Container = styled("div")`
    bottom: 0;
    background-color: white;
    border-radius: 25px 25px 0 0;
    z-index: 12;
    position: absolute;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 -5px 25px rgb(67 93 124 / 20%);
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 32px 40px;
  `;
  const ModalHeader = styled("header")`
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
  `;
  const ModalBody = styled("section")`
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    gap: 24px;
    flex-direction: column;
  `;

  const ModalFooter = styled("footer")`
    display: flex;
    justify-content: space-between;
  `;

  const TwoColumn = styled("div")`
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 16px;
  `;

  const modal = useContext(ModalContext);
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  const cancelModal = () => {
    modal.toggleModal();
  };

  return (
    <section>
      {modal.opened && (
        <Darken>
          <Container>
            {location === "rewards" ? (
              <>
                <ModalHeader>Add new reward</ModalHeader>
                <ModalBody>
                  <Inputs
                    type="text"
                    inputName="reward-name"
                    label="Reward title"
                  />
                  <Inputs type="number" inputName="points" label="Points" />
                </ModalBody>
              </>
            ) : (
              <>
                {" "}
                <ModalHeader>Add new task</ModalHeader>
                <ModalBody>
                  <Inputs
                    type="text"
                    inputName="task-name"
                    label="Task title"
                  />
                  <TwoColumn>
                    <SelectInput inputName="priority" label="Priority" />
                    <Inputs type="number" inputName="points" label="Points" />
                  </TwoColumn>
                </ModalBody>
              </>
            )}
            <ModalFooter>
              <Button
                btnClass="btn-secondary"
                btnText="Cancel"
                btnEvent={cancelModal}
              ></Button>
              <Button btnClass="btn-primary" btnText="Add"></Button>
            </ModalFooter>
          </Container>
        </Darken>
      )}
    </section>
  );
}

export default Modal;
