"use client";

import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";

export const BoardTaskContext = createContext({
  isChanged: false,
  isBoardChange: () => {},
  currentBoard: "",
  setCurrentBoard: () => {},
  boardColumns: {},
  setBoardColumns: () => {},
  currentTask: {},
  setCurrentTask: () => {},
  editBoard: "",
  setEditBoard: () => {},
  editTask: {},
  setEditTask: () => {},
});

export default function BoardTaskContextProvider({ children }) {
  // tracks if the there are any changes to the board/tasks
  const [isChanged, setIsChanged] = useState(false);
  // specifies the current board and the columns, tasks as well as the current selected task if any
  const [currentBoard, setCurrentBoard] = useState("");
  const [boardColumns, setBoardColumns] = useState({});
  const [currentTask, setCurrentTask] = useState({});

  // used to track which board or task is going to be edited
  const [editBoard, setEditBoard] = useState("");
  const [editTask, setEditTask] = useState({});

  useEffect(() => {
    if (localStorage.length > 0) {
      if (currentBoard !== "") {
        let storage = JSON.parse(localStorage.getItem(currentBoard));

        let obj = Object.keys(storage).reduce((o, key) => {
          let someobj = JSON.parse(key);
          let current = someobj.current;
          o[current] = storage[key];
          return o;
        }, {});
        setBoardColumns(obj);
        console.log;
        if (currentTask && Object.keys(currentTask).length > 0) {
          let newTask = obj[currentTask.status].filter(
            (e) => e.id === currentTask.id
          );
          setCurrentTask(newTask[0]);
        }
      }
    } else {
      setCurrentBoard("");
      setBoardColumns({});
      setCurrentTask({});
    }
  }, [currentBoard, isChanged]);

  function isBoardChange(bool) {
    setIsChanged(bool);
  }

  const boardTaskCtx = {
    isChanged: isChanged,
    isBoardChange: isBoardChange,
    currentBoard: currentBoard,
    setCurrentBoard: setCurrentBoard,
    boardColumns: boardColumns,
    setBoardColumns: setBoardColumns,
    currentTask: currentTask,
    setCurrentTask: setCurrentTask,
    editBoard: editBoard,
    setEditBoard: setEditBoard,
    editTask: editTask,
    setEditTask: setEditTask,
  };

  return (
    <BoardTaskContext.Provider value={boardTaskCtx}>
      {children}
    </BoardTaskContext.Provider>
  );
}

BoardTaskContextProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
