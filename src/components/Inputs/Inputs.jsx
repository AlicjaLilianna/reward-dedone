import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Inputs(props) {
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
  `;
  const Input = styled("input")`
    appearance: none;
    background-color: #fff;
    border: 1px solid rgba(31, 62, 82, 0.09);
    border-radius: 15px;
    padding: 29px 15px 10px 15px;
    width: 100%;
    font-size: 16px;
    &:focus-visible {
      outline: 2px solid rgb(36, 53, 69);
    }
  `;

  return (
    <InputContainer>
      <Label for={props.inputName}>
        {props.inputName === "points" && <FontAwesomeIcon icon={faStar} />}{" "}
        {props.label}
      </Label>
      <Input type={props.type} name={props.inputName}></Input>
    </InputContainer>
  );
}

export default Inputs;
