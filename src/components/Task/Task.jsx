import Stars from "../Stars/Stars";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TaskContext } from "../../providers/TaskContext";
import { useContext, useRef, useState } from "react";
import styles from "./Task.module.scss";
import { DriveFileRenameOutline, MoreVert } from "@mui/icons-material";
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

  const priorityClass = (i) => {
    switch (i) {
      case "low":
        return styles.low;
      case "high":
        return styles.high;
      case "uber_high":
        return styles.uberHigh;
      case "normal":
      default:
        return "";
    }
  };

  return (
    <div
      className={
        !task.done
          ? `${styles.task} ${priorityClass(task.importance)}`
          : `${styles.task} ${styles.done} ${priorityClass(task.importance)}`
      }
    >
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
            defaultChecked={task.done ? "checked" : ""}
          />{" "}
          {task.title}
        </div>
        <Stars points={task.points} />
      </label>
      <div className={styles.optionsMenu}>
        <MoreVert fontSize="small" onClick={handleClick}></MoreVert>
        <Popover
          id={id}
          classes={{ paper: styles.actionsContainer, root: styles.actions }}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className={styles.actionWrap} onClick={() => task.editTask()}>
            <DriveFileRenameOutline></DriveFileRenameOutline> Edit
          </div>
          <div
            className={styles.actionWrap}
            onClick={() => {
              task.deleteTask();
            }}
          >
            <DeleteOutlineIcon> </DeleteOutlineIcon> Delete
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default Task;
