"use client";

import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const ModalContext = createContext({
  //board modals
  boardModal: false,
  openBoardModal: () => {},
  closeBoardModal: () => {},
  //task modals
  taskModal: false,
  openTaskModal: () => {},
  closeTaskModal: () => {},
  //task info modal
  taskInfoModal: false,
  openTaskInfoModal: () => {},
  closeTaskInfoModal: () => {},
});

export default function ModalContextProvider({ children }) {
  // modal states; used for opening the modals for the forms and such
  const [boardModal, setBoardModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [taskInfoModal, setTaskInfoModal] = useState(false);

  const openBoardModal = () => setBoardModal(true);
  const closeBoardModal = () => setBoardModal(false);

  const openTaskModal = () => setTaskModal(true);
  const closeTaskModal = () => setTaskModal(false);

  const openTaskInfoModal = () => setTaskInfoModal(true);
  const closeTaskInfoModal = () => setTaskInfoModal(false);

  const modalCtx = {
    //board modals
    boardModal: boardModal,
    openBoardModal: openBoardModal,
    closeBoardModal: closeBoardModal,
    //task modals
    taskModal: taskModal,
    openTaskModal: openTaskModal,
    closeTaskModal: closeTaskModal,
    //task info modal
    taskInfoModal: taskInfoModal,
    openTaskInfoModal: openTaskInfoModal,
    closeTaskInfoModal: closeTaskInfoModal,
  };

  return (
    <ModalContext.Provider value={modalCtx}>{children}</ModalContext.Provider>
  );
}

ModalContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
