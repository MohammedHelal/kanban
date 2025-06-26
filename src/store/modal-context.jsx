"use client";

import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const ModalContext = createContext({
  //board modals
  boardModal: false,
  openBoardModal: () => {},
  closeBoardModal: () => {},
  //delete board modal
  deleteBoardModal: false,
  openDeleteBoardModal: () => {},
  closeDeleteBoardModal: () => {},
  //task modals
  taskModal: false,
  openTaskModal: () => {},
  closeTaskModal: () => {},
  //delete task modals
  deleteTaskModal: false,
  openDeleteTaskModal: () => {},
  closeDeleteTaskModal: () => {},
  //task info modal
  taskInfoModal: false,
  openTaskInfoModal: () => {},
  closeTaskInfoModal: () => {},
  //user profile modal
  userProfileModal: false,
  openUserProfileModal: () => {},
  closeUserProfileModal: () => {},
});

export default function ModalContextProvider({ children }) {
  // modal states; used for opening the modals for the forms and such
  const [boardModal, setBoardModal] = useState(false);
  const [deleteBoardModal, setDeleteBoardModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [taskInfoModal, setTaskInfoModal] = useState(false);
  const [userProfileModal, setUserProfile] = useState(false);

  const openBoardModal = () => setBoardModal(true);
  const closeBoardModal = () => setBoardModal(false);

  const openDeleteBoardModal = () => setDeleteBoardModal(true);
  const closeDeleteBoardModal = () => setDeleteBoardModal(false);

  const openDeleteTaskModal = () => setDeleteTaskModal(true);
  const closeDeleteTaskModal = () => setDeleteTaskModal(false);

  const openTaskModal = () => setTaskModal(true);
  const closeTaskModal = () => setTaskModal(false);

  const openTaskInfoModal = () => setTaskInfoModal(true);
  const closeTaskInfoModal = () => setTaskInfoModal(false);

  const openUserProfileModal = () => {
    setUserProfile(true);
  };
  const closeUserProfileModal = () => setUserProfile(false);

  const modalCtx = {
    //board modals
    boardModal: boardModal,
    openBoardModal: openBoardModal,
    closeBoardModal: closeBoardModal,
    //delete board modals
    deleteBoardModal: deleteBoardModal,
    openDeleteBoardModal: openDeleteBoardModal,
    closeDeleteBoardModal: closeDeleteBoardModal,
    //task modals
    taskModal: taskModal,
    openTaskModal: openTaskModal,
    closeTaskModal: closeTaskModal,
    //delete task modals
    deleteTaskModal: deleteTaskModal,
    openDeleteTaskModal: openDeleteTaskModal,
    closeDeleteTaskModal: closeDeleteTaskModal,
    //task info modal
    taskInfoModal: taskInfoModal,
    openTaskInfoModal: openTaskInfoModal,
    closeTaskInfoModal: closeTaskInfoModal,
    //user profile modal
    userProfileModal: userProfileModal,
    openUserProfileModal: openUserProfileModal,
    closeUserProfileModal: closeUserProfileModal,
  };

  return (
    <ModalContext.Provider value={modalCtx}>{children}</ModalContext.Provider>
  );
}

ModalContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
