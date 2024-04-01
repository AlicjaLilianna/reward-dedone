import renderer from "react-test-renderer";
import Button from "./Button";

it("primary button renders correctly", () => {
  const tree = renderer.create(<Button buttonType="primary"></Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("secondary button renders correctly", () => {
  const tree = renderer
    .create(<Button buttonType="secondary"></Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("addIcon button renders correctly", () => {
  const tree = renderer.create(<Button buttonType="addIcon"></Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
