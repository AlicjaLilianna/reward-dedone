import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";

function App() {
  const [modal, setModal] = useState({ modalOpen: false });
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
      <Header />
      <Outlet />
      <Nav />
      <Modal opened={modal.modalOpen}></Modal>
    </div>
  );
}

export default App;
