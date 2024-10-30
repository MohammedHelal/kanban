"use client";

import { useContext } from "react";
import { ModalContext } from "../store/modal-context";
import Modal from "./Modal";
import Board from "../components/Board";
import Task from "../components/Task";
import TaskInfo from "../components/TaskInfo";

function ModalsContainer({
  changeSubtasksStatus,
  fetchSubTasksData,
  changeTasksColumn,
  fetchTasksData,
  fetchTasksOfColumnData,
  fetchABoardsDetails,
}) {
  const { boardModal, taskModal, taskInfoModal } = useContext(ModalContext);

  return (
    <>
      <Modal
        open={boardModal}
        className="p-12 pb-8 w-[480px] rounded-lg border-2 has-[.board-close:hover]:border-orange"
      >
        <Board
          fetchABoardsDetails={fetchABoardsDetails}
          fetchTasksOfColumnData={fetchTasksOfColumnData}
          fetchTasksData={fetchTasksData}
        />
      </Modal>
      <Modal
        open={taskModal}
        className="p-12 pb-8 w-[480px] rounded-lg border-2 has-[.task-close:hover]:border-orange"
      >
        <Task fetchTasksData={fetchTasksData} />
      </Modal>
      <Modal open={taskInfoModal} className="rounded-lg">
        <TaskInfo
          changeSubtasksStatus={changeSubtasksStatus}
          fetchSubTasksData={fetchSubTasksData}
          changeTasksColumn={changeTasksColumn}
          fetchTasksData={fetchTasksData}
        />
      </Modal>
    </>
  );
}

export default ModalsContainer;
