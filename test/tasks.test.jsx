import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Task from "../src/components/Task/Task";
import { TaskContext } from "../src/providers/TaskContext";

test("create task that has been done", () => {
  const element = renderer
    .create(
      <TaskContext.Provider
        value={{
          done: true,
        }}
      >
        <Task />
      </TaskContext.Provider>
    )
    .toJSON();
  expect(element.props.className.includes("done")).toBe(true);
});

test("check the checkbox is working properly", () => {
  render(
    <TaskContext.Provider
      value={{
        toggleDone: () => jest.fn(),
      }}
    >
      <Task />
    </TaskContext.Provider>
  );
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test("uncheck the checkbox is working properly", () => {
  render(
    <TaskContext.Provider
      value={{
        done: true,
        toggleDone: () => jest.fn(),
      }}
    >
      <Task />
    </TaskContext.Provider>
  );
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});
