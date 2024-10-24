"use client";

import { useState, useContext, useEffect } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";
import more from "../assets/icon-vertical-ellipsis.svg";

import Image from "next/image";

function TaskInfo({
  changeSubtasksStatus,
  fetchSubTasksData,
  changeTasksColumn,
  fetchTasksData,
}) {
  const { openTaskModal, closeTaskInfoModal } = useContext(ModalContext);
  const {
    currentTask: task = {},
    setTasks,
    subtasks,
    setSubtasks,
    setCurrentTask,
    boardColumns,
    currentBoard,
    isBoardChange,
    setEditTask,
  } = useContext(BoardTaskContext);

  const [dropDown, setDropDown] = useState(false);
  const [taskColumn, setTaskColumn] = useState("");

  useEffect(() => {
    if (boardColumns.length > 0) {
      const columnName = boardColumns.find(
        (column) => column["column_id"] === task["column_id"]
      );

      if (columnName && columnName["column_name"]) {
        setTaskColumn(columnName["column_name"]);
      }
    }
  }, [boardColumns, task]);

  async function changeColumn(e, taskId) {
    const value = e.target.value;
    const columnId = boardColumns.find(
      (column) => column["column_name"] === value
    )["column_id"];

    changeTasksColumn(columnId, taskId);

    const tasks = await fetchTasksData(currentBoard);
    setTasks(tasks);

    const currentTask = tasks.find((task) => task["task_id"] === taskId);

    setCurrentTask(currentTask);
    isBoardChange(true);
  }

  async function changeSubtaskStatus(statusId, status, taskId) {
    let subtaskStatus = status === "pending" ? "done" : "pending";
    changeSubtasksStatus(statusId, subtaskStatus);

    console.log(subtasks);

    let subtasksData = await fetchSubTasksData(taskId);
    console.log(subtasksData);

    setSubtasks(subtasksData);

    isBoardChange(true);
  }

  function deleteTask() {
    isBoardChange(true);
    closeTaskInfoModal();
  }

  return (
    <div className="relative p-12 w-[480px] rounded-lg">
      <button
        type="reset"
        className="block ml-auto -mr-12 -mt-12"
        onClick={() => {
          setCurrentTask({});
          closeTaskInfoModal();
        }}
      >
        <i className="fa-solid fa-x p-3 border-0 text-orange hover:bg-orange hover:text-white cursor-pointer"></i>
      </button>
      <div className="flex justify-between items-center">
        <h1>{task["task_title"]}</h1>
        <Image
          src={more}
          className="h-[20px] cursor-pointer"
          alt="drop down menu"
          onClick={() => setDropDown((prevState) => !prevState)}
        />

        {dropDown && (
          <>
            <div
              className="absolute top-0 right-0 bottom-0 left-0 z-10 rounded-lg"
              onClick={() => setDropDown(false)}
            ></div>
            <ul className="absolute top-[75px] right-[45px] bg-greyBlue p-3 border-0 rounded-lg z-20 shadow-md">
              <li>
                <a
                  className="block w-full py-1 px-6 text-grey text-center rounded-lg mb-1 hover:bg-platinum hover:text-white cursor-pointer"
                  onClick={() => {
                    setEditTask(task);
                    openTaskModal();
                  }}
                >
                  Edit Task
                </a>
              </li>
              <li>
                <a
                  className="block w-full py-1 px-6 rounded-lg text-grey text-center hover:bg-orange hover:text-white cursor-pointer"
                  onClick={deleteTask}
                >
                  Delete Task
                </a>
              </li>
            </ul>
          </>
        )}
      </div>
      <p className="text-wrap text-platinum">{task.description}</p>
      {subtasks && (
        <form className="my-6">
          <p className="text-platinum my-3 font-semibold">
            Subtasks ({task["no_of_completed_subtasks"]} of{" "}
            {task["no_of_subtasks"]})
          </p>
          {subtasks.map((subtask) => (
            <div
              key={subtask["subtask_id"]}
              className="py-1 px-3 my-2 bg-greyBlue text-wrap"
            >
              <input
                type="checkbox"
                id={`subtask["subtask_id"]`}
                name={`subtask["subtask_id"]`}
                onChange={() =>
                  changeSubtaskStatus(
                    subtask["subtask_id"],
                    subtask.status,
                    task["task_id"]
                  )
                }
                checked={subtask.status === "done"}
              />
              <label
                htmlFor={`subtask["subtask_id"]`}
                className={`ml-3 ${
                  subtask.status === "done" && "line-through text-platinum"
                }`}
              >
                {subtask["subtask_title"]}
              </label>
            </div>
          ))}
        </form>
      )}
      <p className="text-platinum my-3 font-semibold">Current Status</p>
      <select
        id="status"
        name="status"
        className="w-full bg-inherit border-2 rounded-sm p-3 px-4"
        value={taskColumn}
        onChange={(e) => changeColumn(e, task["task_id"])}
      >
        {boardColumns.map((column) => (
          <option key={column["column_id"]} value={column["column_name"]}>
            {column["column_name"]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TaskInfo;
