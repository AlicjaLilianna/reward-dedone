import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Nav from "../Menu/Menu";
import Modal from "../Modal/Modal";
import { ModalContext } from "../../providers/ModalContext";

function Layout() {
  const [modal, setModal] = useState({ modalOpen: false });

  const toggleModal = (state) => {
    setModal({ modalOpen: !state });
  };
  return (
    <div>
      <ModalContext.Provider
        value={{
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

export default Layout;
