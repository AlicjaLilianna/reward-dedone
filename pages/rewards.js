import React from "react";
import Infobox from "../src/components/InfoBox/InfoBox";
import Reward from "../src/components/Reward/Reward";
import { RewardContext } from "../src/providers/RewardContext";
import styled from "@emotion/styled";
import Layout from "../src/components/Layout/Layout";
import { useQuery, useMutation, gql } from "@apollo/client";

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

function RewardsMain() {
  const { loading, error, data } = useQuery(GET_REWARDS);
  const [
    deleteReward,
    { dataDeleteReward, loadingDeleteReward, errorDeleteReward },
  ] = useMutation(DELETE_REWARD);

  const [buyReward, { dataBuyReward, loadingBuyReward, errorBuyReward }] =
    useMutation(BUY_REWARD);
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
            }}
            key={r.id}
          >
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
