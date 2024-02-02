import Stars from "../Stars/Stars";
import React, { useContext, useState } from "react";
import styles from "./Reward.module.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { RewardContext } from "../../providers/RewardContext";
import { DriveFileRenameOutline, MoreVert } from "@mui/icons-material";
import { Popover } from "@mui/material";

function Reward(props) {
  const reward = useContext(RewardContext);
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
    <div className={styles.reward}>
      <label
        className={styles.rewardContainer}
        onClick={() => {
          reward.buyReward();
        }}
      >
        {props.title}
        <Stars points={props.points} />
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
          <div
            className={styles.actionWrap}
            onClick={() => reward.editReward()}
          >
            <DriveFileRenameOutline></DriveFileRenameOutline> Edit
          </div>
          <div
            className={styles.actionWrap}
            onClick={() => {
              reward.deleteReward();
            }}
          >
            <DeleteOutlineIcon> </DeleteOutlineIcon> Delete
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default Reward;
