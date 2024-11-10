"use client";

import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const BoardTaskContext = createContext({
  loading: false,
  setLoading: () => {},
  currentBoard: "",
  setCurrentBoard: () => {},
  boardColumns: [],
  setBoardColumns: () => {},
  tasks: [],
  setTasks: () => {},
  subtasks: [],
  setSubtasks: () => {},
  currentTask: {},
  setCurrentTask: () => {},
  editBoard: {},
  setEditBoard: () => {},
  editTask: {},
  setEditTask: () => {},
});

export default function BoardTaskContextProvider({ children }) {
  // tracks if the there are any changes to the board/tasks
  const [loading, setLoading] = useState(false);
  // specifies the current board and the columns, tasks as well as the current selected task if any
  const [currentBoard, setCurrentBoard] = useState("");
  const [boardColumns, setBoardColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});

  const [editBoard, setEditBoard] = useState({});
  const [editTask, setEditTask] = useState({});

  const boardTaskCtx = {
    loading: loading,
    setLoading: setLoading,
    currentBoard: currentBoard,
    setCurrentBoard: setCurrentBoard,
    boardColumns: boardColumns,
    setBoardColumns: setBoardColumns,
    currentTask: currentTask,
    setCurrentTask: setCurrentTask,
    tasks: tasks,
    setTasks: setTasks,
    subtasks: subtasks,
    setSubtasks: setSubtasks,
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
