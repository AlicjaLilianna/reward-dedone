import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import TasksIcon from "../Icons/TasksIcon";
import RewardsIcon from "../Icons/RewardsIcon";
import classes from "./Menu.module.scss";

function Nav() {
  //styles

  return (
    <>
      <nav className={classes.nav}>
        <ul className={classes.navList}>
          <li className={classes.navItem}>
            <Link href="/tasks">
              <TasksIcon />
              Tasks
            </Link>
          </li>
          <li className={classes.navItem}>
            <Link href="/rewards">
              <RewardsIcon />
              Rewards
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
