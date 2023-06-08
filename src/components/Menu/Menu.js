import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import TasksIcon from "../Icons/TasksIcon";
import RewardsIcon from "../Icons/RewardsIcon";

function Nav() {
  //styles
  const Nav = styled("nav")`
    z-index: 10;
    position: fixed;
    bottom: 0;
    background: white;
    width: 100%;
    border-radius: 50px 50px 0 0;
    max-width: 480px;
    box-shadow: 0 -5px 25px rgb(67 93 124 / 20%);
  `;

  const NavList = styled("ul")`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0;
    margin: 8px auto;
  `;

  const NavItem = styled("li")`
    padding: 15px;
    border-radius: 15px;
    background: transparent;
    font-weight: 500;
    font-size: 12px;
    list-style: none;

    & > a {
      display: flex;
      gap: 4px;
      align-items: center;
      flex-direction: column;
      text-decoration: none;
      color: #435d7c;

      &:visited {
        color: #435d7c;
      }
    }

    svg {
      height: 24px;
      width: 24px;

      path {
        fill: #435d7c;
      }
    }

    &.active {
      background-color: #435d7c;
      color: white;
      padding: 16px 24px;
      margin-top: -52px;
      transform: rotate(-5deg);
      svg {
        height: 35px;
        width: 35px;
        path {
          fill: white;
        }
      }
      a {
        &:visited {
          color: white;
        }
      }
    }
    &:last-child {
      &.active {
        padding: 16px !important;
        transform: rotate(5deg) !important;
      }
    }
  `;

  return (
    <>
      <Nav>
        <NavList>
          <NavItem>
            <Link to="/tasks">
              <TasksIcon />
              Tasks
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/rewards">
              <RewardsIcon />
              Rewards
            </Link>
          </NavItem>
        </NavList>
      </Nav>
    </>
  );
}

export default Nav;
