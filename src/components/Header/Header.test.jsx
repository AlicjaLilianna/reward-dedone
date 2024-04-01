import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Button } from "../Buttons/Button";
import { ADD_TASK, NewTaskDrawerContent } from "./Header";

it("should render loading and success states on add task", async () => {
  const addTask = {
    title: "new task",
    points: "25",
    importance: "normal",
    done: false,
    id: 1,
  };
  const mocks = [
    {
      request: {
        query: ADD_TASK,
      },
      result: { data: addTask },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewTaskDrawerContent
        button={
          <Button
            buttonType="primary"
            fullWidth={true}
            btnText="Add task"
            form="addForm"
            type="submit"
          />
        }
      />
    </MockedProvider>
  );

  // Find the button element...
  const button = await screen.findByText("Click to Delete Buck");
  userEvent.click(button); // Simulate a click and fire the mutation

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Deleted!")).toBeInTheDocument();
});
