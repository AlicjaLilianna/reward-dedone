import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import RewardsMain from "./components/RewardsMain/RewardsMain";
import Header from "./components/Header/Header";
import Nav from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";
import { ModalContext } from "./providers/ModalContext";
import { PointsContext } from "./providers/PointsContext";

function App() {
  const [modal, setModal] = useState({ modalOpen: false });
  const [points, setPoints] = useState(0);

  const htmlStyle = {
    backgroundColor: "#F0F3FA",
    margin: "0 auto",
    padding: 0,
    maxWidth: "480px",
    height: "100vh",
    overflow: "hidden",
  };
  const toggleModal = (state) => {
    setModal({ modalOpen: !state });
  };
  return (
    <div style={htmlStyle}>
      <ModalContext.Provider
        value={{
          toggleModal: () => toggleModal(modal.modalOpen),
        }}
      >
        <PointsContext.Provider value={[points, setPoints]}>
          <Header />
          <Outlet />
        </PointsContext.Provider>
        <Nav />

        <Modal></Modal>
      </ModalContext.Provider>

      <PointsContext.Provider value={[points, setPoints]}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/rewards" element={<RewardsMain />} />
        </Routes>
      </PointsContext.Provider>
    </div>
  );
}

export default App;
