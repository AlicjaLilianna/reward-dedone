import React from "react";
import styled from "@emotion/styled";

import Infobox from "../src/components/InfoBox/InfoBox";
import Task from "../src/components/Task/Task";
import { TaskContext } from "../src/providers/TaskContext";
import { useQuery, useMutation, gql } from "@apollo/client";
import Layout from "../src/components/Layout/Layout";

const GET_TASKS = gql`
  query GetAllTasks {
    tasks {
      id
      title
      done
      points
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

function TasksMain() {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [
    completeTask,
    { dataCompleteTask, loadingCompleteTask, errorCompleteTask },
  ] = useMutation(COMPLETE_TASK);

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

  //functions
  const sortingFunction = (lhs, rhs) => {
    if (lhs.done !== rhs.done) {
      return lhs.done ? 1 : -1;
    }
    if (lhs.points !== rhs.points) {
      return lhs.points < rhs.points ? 1 : -1;
    }
    return lhs.id < rhs.id ? -1 : 1;
  };
  const toggleTaskDone = (id) => {
    completeTask({ variables: { completeTaskId: id } });
  };

  return (
    <Container>
      {data?.tasks && data.tasks.length > 0 ? (
        data.tasks.map((t) => (
          <TaskContext.Provider
            value={{ ...t, toggleDone: () => toggleTaskDone(t.id) }}
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
    </Container>
  );
}

function LayedOutTasks() {
  return <Layout component={<TasksMain />} />;
}

export default LayedOutTasks;
