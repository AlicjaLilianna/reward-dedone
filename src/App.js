import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";
import { ModalContext } from "./providers/ModalContext";

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
  const toggleModal = (state) => {
    setModal({ modalOpen: !state });
  };
  return (
    <div style={htmlStyle}>
      <ModalContext.Provider
        value={{
          opened: modal.modalOpen,
          toggleModal: () => toggleModal(modal.modalOpen),
        }}
      >
        <Header />
        <Outlet />
        <Nav />

        <Modal></Modal>
      </ModalContext.Provider>
    </div>
  );
}

export default App;
