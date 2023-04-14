import "./Task.scss";
import Stars from "../Stars/Stars";
import { TaskContext } from "../../providers/TaskContext";
import { useContext } from "react";

function Task() {
  const task = useContext(TaskContext);

  return (
    <div className="task">
      <label
        className="taskContainer"
        priority={task.priority}
        onChange={() => {
          task.toggleDone();
        }}
      >
        <div className="checkboxContainer">
          <input
            type="checkbox"
            className={task.done ? "Checkbox checked" : "Checkbox"}
          />{" "}
          {task.title}
        </div>
        <Stars points={task.points} />
        {task.done && <div className="done"></div>}
      </label>
    </div>
  );
}

export default Task;
