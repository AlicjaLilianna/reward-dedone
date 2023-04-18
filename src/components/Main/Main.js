import React, { useContext, useState } from "react";
import styled from "@emotion/styled";

import Infobox from "../InfoBox/InfoBox";
import Task from "../Task/Task";
import { TaskContext } from "../../providers/TaskContext";
import { PointsContext } from "../../providers/PointsContext";

function Main() {
  const [points, setPoints] = React.useContext(PointsContext);
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
  let [tasksList, setTaskList] = useState(
    [
      {
        title: "Clean bathroom",
        priority: "normal",
        points: 25,
        id: 1,
        done: false,
      },
      { title: "Cut nails", priority: "low", points: 10, id: 2, done: false },
      {
        title: "Call grandma",
        priority: "normal",
        points: 25,
        id: 3,
        done: false,
      },
      {
        title: "Drink water",
        priority: "high",
        points: 50,
        id: 4,
        done: false,
      },
      {
        title: "Finish app",
        priority: "very-high",
        points: 75,
        id: 5,
        done: false,
      },
    ].sort(sortingFunction)
  );
  const toggleTaskDone = (id) => {
    setTaskList(
      tasksList
        .map((t) => {
          if (t.id === id) {
            const mult = t.done ? -1 : 1;
            setPoints(points + mult * t.points);
            return { ...t, done: !t.done };
          } else {
            return t;
          }
        })
        .sort(sortingFunction)
    );
  };

  return (
    <Container>
      {/* <InputComponent /> */}
      {tasksList && tasksList.length > 0 ? (
        tasksList.map((t) => (
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

export default Main;
