import Stars from "../Stars/Stars";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TaskContext } from "../../providers/TaskContext";
import { useContext, useState } from "react";
import styles from "./Task.module.scss";
import { MoreVert } from "@mui/icons-material";
import { Popover } from "@mui/material";

function Task() {
  const task = useContext(TaskContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        <Stars points={task.points} />
      </label>
      <div>
        <MoreVert color="error" onClick={handleClick}></MoreVert>
        <Popover
          id={id}
          classes={{ paper: styles.actionsContainer, root: styles.actions }}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
        >
          {/* TODO: editTask goes here */}

          <div
            className={styles.actionWrap}
            onClick={() => {
              task.deleteTask();
            }}
          >
            <DeleteOutlineIcon> </DeleteOutlineIcon>
          </div>
        </Popover>
      </div>
      {task.done && <div className={styles.done}></div>}
    </div>
  );
}

export default Task;
