import Stars from "../Stars/Stars";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TaskContext } from "../../providers/TaskContext";
import { useContext } from "react";
import styles from "./Task.module.scss";
function Task() {
  const task = useContext(TaskContext);

  return (
    <div className={styles.task}>
      <label
        className={styles.taskContainer}
        priority={task.priority}
        onChange={() => {
          task.toggleDone();
        }}
      >
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            className={task.done ? `${styles.checked}` : ``}
          />{" "}
          {task.title}
        </div>
        <div>
          <Stars points={task.points} />
          <DeleteOutlineIcon
            color="error"
            onClick={() => {
              task.deleteTask();
              console.log(task);
            }}
          >
            {" "}
          </DeleteOutlineIcon>
        </div>
        {task.done && <div className={styles.done}></div>}
      </label>
    </div>
  );
}

export default Task;
