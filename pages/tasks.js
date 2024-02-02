import React, { useState } from "react";
import styled from "@emotion/styled";

import Infobox from "../src/components/InfoBox/InfoBox";
import Task from "../src/components/Task/Task";
import { TaskContext } from "../src/providers/TaskContext";
import { useQuery, useMutation, gql } from "@apollo/client";
import Layout from "../src/components/Layout/Layout";
import { Drawer, Grid } from "@mui/material";
import { DrawerContext } from "../src/providers/DrawerContext";
import { useFormik } from "formik";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Button from "../src/components/Buttons/Button";

const GET_TASKS = gql`
  query GetAllTasks {
    tasks {
      id
      title
      done
      points
      importance
    }
  }
`;

const COMPLETE_TASK = gql`
  mutation CompleteTask($completeTaskId: ID!) {
    completeTask(id: $completeTaskId) {
      message
      success
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      message
      success
    }
  }
`;

const EDIT_TASK = gql`
  mutation EditTask(
    $editTaskId: ID!
    $title: String
    $importance: Importance
    $points: Int
  ) {
    editTask(
      id: $editTaskId
      title: $title
      importance: $importance
      points: $points
    ) {
      message
      success
    }
  }
`;

const priorityOptions = [
  { value: "uber_high", text: "Very high" },
  { value: "high", text: "High" },
  { value: "normal", text: "Normal" },
  { value: "low", text: "Low" },
];

function CountPoints(priority) {
  switch (priority) {
    case "uber_high":
      return 75;
    case "high":
      return 50;
    case "low":
      return 10;
    case "normal":
    default:
      return 25;
  }
}
function TasksMain() {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [
    completeTask,
    { dataCompleteTask, loadingCompleteTask, errorCompleteTask },
  ] = useMutation(COMPLETE_TASK);
  const [deleteTask, { dataDeleteTask, loadingDeleteTask, errorDeleteTask }] =
    useMutation(DELETE_TASK);
  const [editTask, { dataEditTask, loadingEditTask, errorEditTask }] =
    useMutation(EDIT_TASK);

  //styles
  const Container = styled("main")`
    max-width: 480px;
    padding: 0 16px;
    max-height: calc(100vh - 187px);
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 92px;
    &::-webkit-scrollbar {
      visibility: hidden;
    }
  `;

  const toggleTaskDone = (id) => {
    completeTask({ variables: { completeTaskId: id } });
    window.location.reload(true);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  function NewTaskDrawerContent(props) {
    const formik = useFormik({
      initialValues: {
        taskTitle: props.title,
        taskPriority: props.priority,
      },
      onSubmit: props.costam,
    });

    return (
      <form onSubmit={formik.handleSubmit} id="addForm">
        <TextField
          label="Task title"
          id="task-title"
          variant="filled"
          name="taskTitle"
          value={formik.values.taskTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></TextField>
        <FormControl variant="filled">
          <InputLabel id="task-priority">Priority</InputLabel>
          <Select
            labelId="task-priority"
            id="task-priority-select"
            name="taskPriority"
            value={formik.values.taskPriority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={priorityOptions[2].value}
          >
            {priorityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              buttonType="secondary"
              fullWidth={true}
              btnText="Cancel"
              btnEvent={() => setDrawerOpen(false)}
            />
          </Grid>
          <Grid item xs={6}>
            {" "}
            {props.button}
          </Grid>
        </Grid>
      </form>
    );
  }
  return (
    <Container>
      {data?.tasks && data.tasks.length > 0 ? (
        data.tasks.map((t) => (
          <TaskContext.Provider
            value={{
              ...t,
              toggleDone: () => toggleTaskDone(t.id),
              deleteTask: () => {
                deleteTask({ variables: { deleteTaskId: t.id } });
                window.location.reload(true);
              },
              editTask: (args) => {
                setCurrentTask(t);
                setDrawerOpen(true);
              },
            }}
            key={t.id}
          >
            <Task
              title={t.title}
              priority={t.priority}
              points={t.points}
              done={t.done}
            />
          </TaskContext.Provider>
        ))
      ) : (
        <Infobox case="tasks" />
      )}
      <DrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <h2>Edit task</h2>
          <NewTaskDrawerContent
            title={currentTask?.title ?? ""}
            priority={currentTask?.importance ?? "normal"}
            costam={(values) => {
              editTask({
                variables: {
                  editTaskId: currentTask?.id,
                  title: values.taskTitle,
                  importance: values.taskPriority,
                  points: CountPoints(values.taskPriority),
                },
              });
              setDrawerOpen(false);
            }}
            button={
              <Button
                buttonType="primary"
                fullWidth={true}
                btnText="Update task"
                form="addForm"
                type="submit"
              />
            }
          />
        </Drawer>
      </DrawerContext.Provider>
    </Container>
  );
}

function LayedOutTasks() {
  return <Layout component={<TasksMain />} />;
}

export default LayedOutTasks;
