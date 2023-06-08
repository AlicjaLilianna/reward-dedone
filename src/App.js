import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import RewardsMain from "./components/RewardsMain/RewardsMain";
import Entry from "./components/Entry/Entry";
import Layout from "./components/Layout/Layout";
import { PointsContext } from "./providers/PointsContext";

function App() {
  const [points, setPoints] = useState(0);

  const htmlStyle = {
    backgroundColor: "#F0F3FA",
    margin: "0 auto",
    padding: 0,
    maxWidth: "480px",
    height: "100vh",
    overflow: "hidden",
  };

  return (
    <div style={htmlStyle}>
      <Outlet />

      <PointsContext.Provider value={[points, setPoints]}>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route element={<Layout />}>
            <Route path="/tasks" element={<Main />} />
            <Route path="/rewards" element={<RewardsMain />} />
          </Route>
        </Routes>
      </PointsContext.Provider>
    </div>
  );
}

export default App;
