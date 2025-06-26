"use client";

import { useContext } from "react";
import { ModalContext } from "../store/modal-context";
import Modal from "./Modal";
import BoardModal from "./BoardModal";
import TaskModal from "./TaskModal";
import TaskInfoModal from "./TaskInfoModal";
import DeleteBoardModal from "./DeleteBoardModal";
import DeleteTaskModal from "./DeleteTaskModal";
import UserProfile from "../auth/UserProfile";

function ModalsContainer() {
  const {
    boardModal,
    taskModal,
    taskInfoModal,
    deleteBoardModal,
    deleteTaskModal,
    userProfileModal,
  } = useContext(ModalContext);

  return (
    <>
      <Modal
        open={boardModal}
        className="p-6 md:p-12 pb-8 w-[350px] md:w-[480px] rounded-lg border-2 dark:border-transparent has-[.board-close:hover]:border-orange"
      >
        <BoardModal />
      </Modal>
      <Modal
        open={taskModal}
        className="p-6 md:p-12 pb-8 w-[350px] md:w-[480px] rounded-lg border-2  dark:border-transparent has-[.task-close:hover]:border-orange"
      >
        <TaskModal />
      </Modal>
      <Modal
        open={taskInfoModal}
        className="p-6 md:p-12 pb-8 w-[350px] md:w-[480px] rounded-lg border-2 dark:border-transparent has-[.task-info-close:hover]:border-orange"
      >
        <TaskInfoModal />
      </Modal>
      <Modal
        open={deleteBoardModal}
        className="p-6 md:p-12 pb-8 w-[350px] md:w-[480px] rounded-lg border-2 dark:border-grey "
      >
        <DeleteBoardModal />
      </Modal>
      <Modal
        open={deleteTaskModal}
        className="p-6 md:p-12 pb-8 w-[350px] md:w-[480px] rounded-lg border-2 dark:border-grey "
      >
        <DeleteTaskModal />
      </Modal>
      <Modal
        open={userProfileModal}
        className="p-6 md:p-12 pb-8 w-[350px] md:w-[480px] rounded-lg border-2 dark:border-transparent has-[.user-profile-close:hover]:border-orange"
      >
        <UserProfile />
      </Modal>
    </>
  );
}

export default ModalsContainer;
