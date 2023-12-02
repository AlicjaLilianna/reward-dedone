import React, { useState } from "react";
import Header from "../Header/Header";
import Nav from "../Menu/Menu";

function Layout({ component }) {
  return (
    <div>
      <Header />
      {component}

      <Nav />
    </div>
  );
}

export default Layout;
