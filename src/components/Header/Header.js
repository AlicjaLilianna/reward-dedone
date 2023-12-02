import StarIcon from "../Icons/StarIcon";
import styled from "@emotion/styled";
import bckg from "../../assets/background.svg";
import bckgRewards from "../../assets/background_rewards.svg";
import React, { useState } from "react";
import { useRouter } from "next/router";
import ButtonWithDrawer from "../Buttons/ButtonWithDrawer";
import Button from "../Buttons/Button";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { DrawerContext } from "../../providers/DrawerContext";
import { useFormik } from "formik";

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
  const background = location.pathname === "/rewards" ? bckgRewards : bckg;

  //styles
  const Header = styled("header")`
    position: relative;
    padding: 24px 16px 24px 16px;
    margin-bottom: -24px;
    overflow: hidden;

    &::after {
      z-index: 0;
      width: 100%;
      height: 100%;
      display: block;
      top: 0;
      right: ${location.pathname === "/rewards" ? 0 : "9%"};
      position: absolute;
      content: "";
      background: url(${background}) no-repeat;
      background-size: ${location === "/rewards" ? "75%" : "60%"};
      background-position: top right;
      opacity: 0.4;
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
      font-family: "DM Serif Display", "Georgia", serif;
      font-size: 25px;
      font-weight: 400;
      line-height: 37px;
      color: #435f7c;
      letter-spacing: calc(0.1 * 1ch);
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
    margin-bottom: 60px;
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

  const priorityOptions = [
    { value: "uber-high", text: "Very high" },
    { value: "high", text: "High" },
    { value: "normal", text: "Normal" },
    { value: "low", text: "Low" },
  ];

  function CountPoints(priority) {
    switch (priority) {
      case "uber-high":
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

  function NewTaskDrawerContent() {
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
      </form>
    );
  }
  function NewRewardDrawerContent() {
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
      </form>
    );
  }

  function DrawerContent(type) {
    return (
      <>
        {type === "tasks" ? (
          <>
            <h2>New Task</h2>
            <NewTaskDrawerContent />
          </>
        ) : (
          <>
            <h2>New Reward</h2>
            <NewRewardDrawerContent />
          </>
        )}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              btnClass="btn-secondary"
              fullWidth={true}
              btnText="Cancel"
              btnEvent={() => setDrawerOpen(false)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              btnClass="btn-primary"
              fullWidth={true}
              btnText={type === "tasks" ? "Add task" : "Add rewards"}
              form="addForm"
              type="submit"
            />
          </Grid>
        </Grid>
      </>
    );
  }

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Header>
      <StarContainer>
        <StarIcon fill="#000000" /> <div>123</div>
      </StarContainer>
      <TitleContainer>
        <h1 className="title">
          {location.pathname === "/rewards" ? "Rewards" : "Tasks"}
        </h1>
        <DrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
          <ButtonWithDrawer
            drawerContent={DrawerContent(
              location.pathname === "/rewards" ? "rewards" : "tasks"
            )}
          />
        </DrawerContext.Provider>
      </TitleContainer>
    </Header>
  );
}

export default Header;
