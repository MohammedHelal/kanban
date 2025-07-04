"use client";

import { useState, useContext, useEffect } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";
import more from "../assets/icon-vertical-ellipsis.svg";
import cross from "../assets/icon-cross.svg";
import { deleteTask } from "../lib/actions";
import Image from "next/image";

import {
  changeSubtasksStatus,
  fetchSubTasksData,
  changeTasksColumn,
  fetchTasksData,
} from "../lib/server-actions";

export default function TaskInfoModal() {
  const { openTaskModal, closeTaskInfoModal, openDeleteTaskModal } =
    useContext(ModalContext);
  const {
    currentTask: task = {},
    setTasks,
    subtasks,
    setSubtasks,
    setCurrentTask,
    boardColumns,
    currentBoard,
    setEditTask,
  } = useContext(BoardTaskContext);

  const [dropDown, setDropDown] = useState(false);
  const [taskColumn, setTaskColumn] = useState("");
  const [subtasksInput, setSubtasksInput] = useState({});

  useEffect(() => {
    if (boardColumns.length > 0) {
      const columnName = boardColumns.find(
        (column) => column["column_id"] === task["column_id"]
      );

      if (columnName && columnName["column_name"]) {
        setTaskColumn(columnName["column_name"]);
      }
    }

    if (subtasks.length > 0) {
      let obj = {};
      subtasks.map((subtask) => {
        obj[subtask["subtask_id"]] = subtask["is_completed"];
      });
      setSubtasksInput(obj);
    }
  }, [boardColumns, task, subtasks]);

  useEffect(() => {
    function closeTaskInfoModalFn(event) {
      if (event.key === "Escape" || event.key === "Esc") {
        closeTaskInfoModal();
      }
    }

    window.addEventListener("keydown", closeTaskInfoModalFn, false);

    return () => {
      window.removeEventListener("keydown", closeTaskInfoModalFn, false);
    };
  });

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
  }

  async function changeSubtaskStatus(statusId, status, taskId) {
    changeSubtasksStatus(statusId, status, taskId);

    let subtasksData = await fetchSubTasksData(taskId);
    setSubtasks(subtasksData);

    const tasks = await fetchTasksData(currentBoard);
    setTasks(tasks);
  }

  /*async function taskDeletionHandler(taskId) {
    await deleteTask(taskId);

    const tasks = await fetchTasksData(currentBoard);
    setTasks(tasks);

    closeTaskInfoModal();
  }*/

  return (
    <div className="relative md:min-w-[350px]">
      <button
        type="reset"
        className="block ml-auto -mr-6 md:-mr-12 -mt-6 md:-mt-12"
        onClick={() => {
          setCurrentTask({});
          closeTaskInfoModal();
        }}
      >
        <i className="task-info-close fa-solid fa-x p-3 border-0 text-orange hover:bg-orange hover:text-white cursor-pointer"></i>
      </button>
      <div className="flex justify-between items-start">
        <h1 className="w-5/6 dark:text-white">{task["task_title"]}</h1>
        <Image
          src={dropDown ? cross : more}
          className="my-[20px] cursor-pointer z-20"
          alt="drop down menu"
          onClick={() => setDropDown((prevState) => !prevState)}
        />
        {dropDown && (
          <>
            <div
              className="absolute top-0 right-0 bottom-0 left-0 z-10 rounded-lg"
              onClick={() => setDropDown(false)}
            ></div>
            <ul className="absolute top-[80px] right-[0px]  bg-magnumGrey border-[1px] border-platinum p-3 shadow-2xl shadow-slate-800 rounded-lg z-20 shadow-md">
              <li>
                <a
                  className="group block w-full py-1 px-6 text-left rounded-t-lg hover:bg-grey text-white cursor-pointer"
                  onClick={() => {
                    setEditTask(task);
                    setDropDown(false);
                    openTaskModal();
                  }}
                >
                  <i className="fa-solid fa-pen-to-square ml-auto p-3 rounded-full text-darkPurple group-hover:text-white cursor-pointer"></i>{" "}
                  Edit task
                </a>
              </li>
              <hr className="" />
              <li>
                <a
                  className="group block w-full py-1 px-6 rounded-b-lg text-left hover:bg-orange text-white cursor-pointer"
                  onClick={() => {
                    setDropDown(false);
                    openDeleteTaskModal();
                    closeTaskInfoModal();
                  }}
                >
                  <i className="fa-solid fa-trash ml-auto p-3 rounded-full text-darkPurple group-hover:text-white cursor-pointer"></i>{" "}
                  Delete task
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
            Subtasks ({Object.values(subtasksInput).filter(Boolean).length} of{" "}
            {Object.values(subtasksInput).length})
          </p>
          {subtasks.map((subtask) => (
            <div
              key={subtask["subtask_id"]}
              className="py-1 px-3 my-2 bg-greyBlue dark:bg-magnumGrey rounded-md text-wrap"
            >
              <input
                type="checkbox"
                id={`subtask["subtask_id"]`}
                name={`subtask["subtask_id"]`}
                onChange={() => {
                  setSubtasksInput((prevState) => {
                    return {
                      ...prevState,
                      [subtask["subtask_id"]]:
                        !subtasksInput[subtask["subtask_id"]],
                    };
                  });

                  changeSubtaskStatus(
                    subtask["subtask_id"],
                    subtask["is_completed"],
                    task["task_id"]
                  );
                }}
                checked={subtasksInput[subtask["subtask_id"]] || false}
              />
              <label
                htmlFor={`subtask["subtask_id"]`}
                className={`ml-3 dark:text-light ${
                  subtasksInput[subtask["subtask_id"]] &&
                  "line-through text-platinum"
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
        className="w-full bg-inherit dark: border-[1px] rounded-md py-2 px-4 dark:text-white cursor-pointer"
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
