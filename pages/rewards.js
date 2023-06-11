import React from "react";
import Infobox from "../src/components/InfoBox/InfoBox";
import Reward from "../src/components/Reward/Reward";
import { RewardContext } from "../src/providers/RewardContext";
import styled from "@emotion/styled";
import Layout from "../src/components/Layout/Layout";

function RewardsMain() {
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

  let [rewardList] = React.useState([
    {
      title: "Eat chocolate",
      points: 100,
      id: 1,
    },
    { title: "Go to cinema", points: 710, id: 2 },
    {
      title: "Have a long bath",
      points: 250,
      id: 3,
    },
    {
      title: "Drink wine",
      points: 500,
      id: 4,
    },
  ]);

  return (
    <Container>
      {/* <InputComponent /> */}
      {rewardList && rewardList.length > 0 ? (
        rewardList.map((r) => (
          <RewardContext.Provider value={r} key={r.id}>
            <Reward title={r.title} points={r.points} />
          </RewardContext.Provider>
        ))
      ) : (
        <Infobox case="rewards" />
      )}
    </Container>
  );
}

function LayedOutReward() {
  return <Layout component={<RewardsMain />} />;
}

export default LayedOutReward;
