import styled from "@emotion/styled";
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
  return (
    <section>
      {props.opened && (
        <Darken>
          <Container>
            <ModalHeader>This is modal header</ModalHeader>
            <ModalBody>
              <Inputs type="text" inputName="task-name" label="Task title" />
              <Inputs type="number" inputName="points" label="Points" />
              <SelectInput inputName="priority" label="Priority" />
            </ModalBody>
            <ModalFooter>
              <Button btnClass="btn-secondary" btnText="Cancel"></Button>
              <Button btnClass="btn-primary" btnText="Add"></Button>
            </ModalFooter>
          </Container>
        </Darken>
      )}
    </section>
  );
}

export default Modal;
