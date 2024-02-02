import React, { useState } from "react";
import Infobox from "../src/components/InfoBox/InfoBox";
import Reward from "../src/components/Reward/Reward";
import { RewardContext } from "../src/providers/RewardContext";
import styled from "@emotion/styled";
import Layout from "../src/components/Layout/Layout";
import { useQuery, useMutation, gql } from "@apollo/client";
import { DrawerContext } from "../src/providers/DrawerContext";
import { Drawer, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import Button from "../src/components/Buttons/Button";
import styles from "./rewards.module.scss";

const GET_REWARDS = gql`
  query GetAllRewards {
    rewards {
      id
      title
      points
    }
  }
`;

const DELETE_REWARD = gql`
  mutation DeleteReward($deleteRewardId: ID!) {
    deleteReward(id: $deleteRewardId) {
      message
      success
    }
  }
`;

const BUY_REWARD = gql`
  mutation Mutation($buyRewardId: ID!) {
    buyReward(id: $buyRewardId) {
      message
      success
    }
  }
`;

const EDIT_REWARD = gql`
  mutation Mutation($editRewardId: ID!, $title: String, $points: Int) {
    editReward(id: $editRewardId, title: $title, points: $points) {
      message
      success
    }
  }
`;

function RewardsMain() {
  const { loading, error, data } = useQuery(GET_REWARDS);
  const [
    deleteReward,
    { dataDeleteReward, loadingDeleteReward, errorDeleteReward },
  ] = useMutation(DELETE_REWARD);

  const [buyReward, { dataBuyReward, loadingBuyReward, errorBuyReward }] =
    useMutation(BUY_REWARD);

  const [editReward, { dataEditReward, loadingEditReward, errorEditReward }] =
    useMutation(EDIT_REWARD);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
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

  function NewRewardDrawerContent(props) {
    const formik = useFormik({
      initialValues: {
        rewardTitle: props.title,
        rewardPoints: props.points,
      },
      onSubmit: props.costam,
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
          onBlur={formik.handleBlur}
          fullWidth
          classes={{
            root: styles.input,
          }}
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
          fullWidth
          classes={{
            root: styles.input,
          }}
        ></TextField>
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
      {data?.rewards && data.rewards.length > 0 ? (
        data.rewards.map((r) => (
          <RewardContext.Provider
            value={{
              ...r,
              buyReward: () => buyReward({ variables: { buyRewardId: r.id } }),
              deleteReward: () =>
                deleteReward({ variables: { deleteRewardId: r.id } }),
              editReward: (args) => {
                setCurrentReward(r);
                setDrawerOpen(true);
              },
            }}
            key={r.id}
          >
            <Reward title={r.title} points={r.points} />
          </RewardContext.Provider>
        ))
      ) : (
        <Infobox case="rewards" />
      )}
      <DrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          classes={{
            paper: styles.drawerBottom,
          }}
        >
          <h2>Edit reward</h2>
          <NewRewardDrawerContent
            title={currentReward?.title ?? ""}
            points={currentReward?.points ?? 0}
            costam={(values) => {
              editReward({
                variables: {
                  editRewardId: currentReward?.id,
                  title: values.rewardTitle,
                  points: value.rewardPoints,
                },
              });
              setDrawerOpen(false);
            }}
            button={
              <Button
                buttonType="primary"
                fullWidth={true}
                btnText="Update reward"
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

function LayedOutReward() {
  return <Layout component={<RewardsMain />} />;
}

export default LayedOutReward;
