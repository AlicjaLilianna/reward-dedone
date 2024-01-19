import { useState, createContext } from "react";
import Button from "../Buttons/Button";
import React, { useContext } from "react";
import classes from "./ButtonWithDrawer.module.scss";
import Drawer from "@mui/material/Drawer";
import { DrawerContext } from "../../providers/DrawerContext";

function ButtonWithDrawer(props) {
  const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);
  return (
    <>
      <Button
        buttonType="addIcon"
        btnText="+"
        btnEvent={() => setDrawerOpen(true)}
      />
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        classes={{
          root: classes.drawerBottom,
          paper: classes.drawerContainer,
        }}
      >
        {props.drawerContent}
      </Drawer>
    </>
  );
}

export default ButtonWithDrawer;
