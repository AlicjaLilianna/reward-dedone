import StarIcon from "../Icons/StarIcon";
import React, { useState } from "react";
import { useRouter } from "next/router";
import ButtonWithDrawer from "../Buttons/ButtonWithDrawer";
import Button from "../Buttons/Button";
import classes from "./Header.module.scss";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";
import { useQuery, useMutation, gql } from "@apollo/client";
import { DrawerContext } from "../../providers/DrawerContext";
import { useFormik } from "formik";

const GET_POINTS = gql`
  query User_info {
    user_info {
      points
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($title: String!, $points: Int!, $importance: Importance) {
    addTask(title: $title, points: $points, importance: $importance) {
      message
      success
    }
  }
`;

const ADD_REWARD = gql`
  mutation Mutation($title: String!, $points: Int!) {
    addReward(title: $title, points: $points) {
      message
      success
    }
  }
`;

function Header() {
  const location = useRouter();

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

  function NewTaskDrawerContent(props) {
    const [addTask, { dataAddTask, loadingAddTask, errorAddTask }] =
      useMutation(ADD_TASK);
    const formik = useFormik({
      initialValues: {
        taskTitle: "",
        taskPriority: "",
      },
      onSubmit: (values) => {
        addTask({
          variables: {
            title: values.taskTitle,
            importance: values.taskPriority,
            points: CountPoints(values.taskPriority),
          },
        });
        setDrawerOpen(false);
        window.location.reload(true);
      },
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
        {props.button}
      </form>
    );
  }

  function NewRewardDrawerContent(props) {
    const [addReward, { dataAddReward, loadingAddReward, errorAddReward }] =
      useMutation(ADD_REWARD);
    const formik = useFormik({
      initialValues: {
        rewardTitle: "",
        rewardPoints: "",
      },
      onSubmit: (values) => {
        addReward({
          variables: {
            title: values.rewardTitle,
            points: values.rewardPoints,
          },
        });
        setDrawerOpen(false);
        window.location.reload(true);
      },
    });

    return (
      <form onSubmit={formik.handleSubmit} id="addForm">
        <TextField
          label="Reward title"
          id="reward-title"
          variant="filled"
          name="rewardTitle"
          value={formik.values.rewardTitle}
          onChange={formik.handleChange}
        ></TextField>
        <TextField
          type="number"
          min={0}
          step={5}
          label="Reward points"
          id="reward-points"
          variant="filled"
          name="rewardPoints"
          inputProps={{ pattern: "[0-9]" }}
          value={formik.values.rewardPoints}
          onChange={formik.handleChange}
        ></TextField>
        {props.button}
      </form>
    );
  }

  function DrawerContent(type) {
    return (
      <>
        {type === "tasks" ? (
          <>
            <h2>New Task</h2>
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
          </>
        ) : (
          <>
            <h2>New Reward</h2>
            <NewRewardDrawerContent
              button={
                <Button
                  buttonType="primary"
                  fullWidth={true}
                  btnText="Add rewards"
                  form="addForm"
                  type="submit"
                />
              }
            />
          </>
        )}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              buttonType="secondary"
              fullWidth={true}
              btnText="Cancel"
              btnEvent={() => setDrawerOpen(false)}
            />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </>
    );
  }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_POINTS);

  return (
    <header className={classes.header}>
      <div className={classes.starContainer}>
        <StarIcon fill="rgba(245, 153, 57, 1)" />{" "}
        <div>{data?.user_info?.points ?? "123"}</div>
      </div>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>
          {location.pathname === "/rewards" ? "Rewards" : "Tasks"}
        </h1>
        <DrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
          <ButtonWithDrawer
            drawerContent={DrawerContent(
              location.pathname === "/rewards" ? "rewards" : "tasks"
            )}
          />
        </DrawerContext.Provider>
      </div>
    </header>
  );
}

export default Header;
