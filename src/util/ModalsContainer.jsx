"use client";

import { useContext } from "react";
import { ModalContext } from "../store/modal-context";
import Modal from "./Modal";
import BoardModal from "../components/BoardModal";
import TaskModal from "../components/TaskModal";
import TaskInfoModal from "../components/TaskInfoModal";
import DeleteBoardModal from "../components/DeleteBoardModal";
import DeleteTaskModal from "../components/DeleteTaskModal";

function ModalsContainer() {
  const {
    boardModal,
    taskModal,
    taskInfoModal,
    deleteBoardModal,
    deleteTaskModal,
  } = useContext(ModalContext);

  return (
    <>
      <Modal
        open={boardModal}
        className="p-12 pb-8 w-[480px] rounded-lg border-2 has-[.board-close:hover]:border-orange"
      >
        <BoardModal />
      </Modal>
      <Modal
        open={taskModal}
        className="p-12 pb-8 w-[480px] rounded-lg border-2 has-[.task-close:hover]:border-orange"
      >
        <TaskModal />
      </Modal>
      <Modal
        open={taskInfoModal}
        className="p-12 pb-8 w-[480px] rounded-lg border-2 has-[.task-info-close:hover]:border-orange"
      >
        <TaskInfoModal />
      </Modal>
      <Modal
        open={deleteBoardModal}
        className="p-12 pb-8 w-[480px] rounded-lg border-2"
      >
        <DeleteBoardModal />
      </Modal>
      <Modal
        open={deleteTaskModal}
        className="p-12 pb-8 w-[480px] rounded-lg border-2"
      >
        <DeleteTaskModal />
      </Modal>
    </>
  );
}

export default ModalsContainer;
