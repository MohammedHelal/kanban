"use client";

import { useState, useContext } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";
import more from "../assets/icon-vertical-ellipsis.svg";

import Image from "next/image";

function TaskInfo() {
  const { openTaskModal, closeTaskInfoModal } = useContext(ModalContext);
  const {
    currentTask: task = {},
    setCurrentTask,
    boardColumns,
    currentBoard,
    isBoardChange,
    setEditTask,
  } = useContext(BoardTaskContext);

  const [dropDown, setDropDown] = useState(false);

  function changeColumn(e) {
    let column = e.target.value;

    let board = JSON.parse(localStorage.getItem(currentBoard));
    let boardKeys = Object.keys(board);

    let regex1 = new RegExp(`${task.status}`);
    let str1 = boardKeys.filter((e) => regex1.test(e))[0];

    let firstTaskArray = board[str1].filter((e) => e.title !== task.title);
    board[str1] = firstTaskArray;

    let regex2 = new RegExp(`${column}`);
    let str2 = boardKeys.filter((e) => regex2.test(e))[0];
    task.status = column;

    //changing the id of the tasks as the changes
    let secondTaskArray = board[str2];
    if (secondTaskArray.length > 0) {
      let id = secondTaskArray[secondTaskArray.length - 1].id;
      let idnum = parseInt(/\d$/.exec(id[id.length - 1]), 10);
      task.id = `${task.status},task${idnum + 1}`;
    } else task.id = `${task.status},task1`;

    board[str2].push(task);

    localStorage.setItem(currentBoard, JSON.stringify(board));
    isBoardChange(true);
  }

  function changeSubtaskStatus(index) {
    let board = JSON.parse(localStorage.getItem(currentBoard));

    let regex1 = new RegExp(`${task.status}`);
    let str = Object.keys(board).filter((e) => regex1.test(e))[0];

    let currentTask = board[str].filter((e) => {
      if (e.title === task.title) {
        let subtask = e.subtasks[index];
        if (subtask.status === "pending") subtask.status = "done";
        else subtask.status = "pending";
      }
      return e;
    });

    board[str] = currentTask;
    localStorage.setItem(currentBoard, JSON.stringify(board));
    isBoardChange(true);
  }

  function deleteTask() {
    let board = JSON.parse(localStorage.getItem(currentBoard));

    let regex1 = new RegExp(`${task.status}`);
    let str = Object.keys(board).filter((e) => regex1.test(e))[0];

    let arr = board[str].filter((e) => e.id !== task.id);
    board[str] = arr;

    localStorage.setItem(currentBoard, JSON.stringify(board));
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
        <h1>{task.title}</h1>
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
      {task.subtasks && (
        <form className="my-6">
          <p className="text-platinum my-3 font-semibold">
            Subtasks (0 of {task.subtasks.length})
          </p>
          {task.subtasks.map((e, i) => (
            <div key={i} className="py-1 px-3 my-2 bg-greyBlue text-wrap">
              <input
                type="checkbox"
                id={`subtask${i}`}
                name={`subtask${i}`}
                onChange={() => changeSubtaskStatus(i)}
                checked={e.status === "done"}
              />
              <label
                htmlFor={`subtask${i}`}
                className={`ml-3 ${
                  e.status === "done" && "line-through text-platinum"
                }`}
              >
                {e.current}
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
        value={task.status}
        onChange={changeColumn}
      >
        {Object.keys(boardColumns).map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TaskInfo;
