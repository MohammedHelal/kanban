"use client";

import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";

function Task() {
  const { closeTaskModal } = useContext(ModalContext);
  const { currentBoard, boardColumns, isBoardChange, editTask, setEditTask } =
    useContext(BoardTaskContext);

  //state for the deletion/removal of subtask input
  const [subtaskDelete, setSubtaskDelete] = useState("");

  //state for the value of the form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    { id: 1, prev: "", current: "", status: "pending" },
    { id: 2, prev: "", current: "", status: "pending" },
  ]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    //console.log(editTask);
    if (Object.keys(editTask).length > 0) {
      //copying the task object to prevent any unintended changes to the editTask or the currentTask states
      let transferObj = { ...editTask };
      setTitle(transferObj.title);
      setDescription(transferObj.description);

      //recursively copying the subtask array to prevent any unintended changes to the editTask or the currentTask states
      let array = [];
      for (let i = 0; i < transferObj.subtasks.length; i++) {
        array.push({ ...transferObj.subtasks[i] });
      }
      setSubtasks(array);
      setStatus(transferObj.status);
    }
  }, [editTask]);

  function changeHandler(e, id) {
    let inputId = e.target.id;
    let val = e.target.value;

    if (inputId === "title") {
      setTitle(val);
    } else if (inputId === "description") {
      setDescription(val);
    } else if (inputId === "status") {
      setStatus(val);
    } else {
      let array = subtasks.map((input) => {
        if (input.id === id) {
          input.current = val;
        }
        return input;
      });

      setSubtasks(array);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    let columns = Object.keys(boardColumns);
    let task = {
      title: title,
      description: description,
      subtasks: subtasks,
      status: status === "" ? columns[0] : status,
    };

    let board = JSON.parse(localStorage.getItem(currentBoard));

    let regex = new RegExp(`${task.status}`);
    let str = Object.keys(board).filter((e) => regex.test(e))[0];

    let array = board[str];

    if (Object.keys(editTask).length > 0) {
      task.id = editTask.id;

      board[str] = array.map((element) => {
        if (element.id === task.id) {
          return task;
        }
        return element;
      });
    } else {
      if (board[str].length > 0) {
        let id = array[array.length - 1].id;
        let idnum = parseInt(/\d$/.exec(id[id.length - 1]), 10);
        task.id = `${task.status},task${idnum + 1}`;
      } else task.id = `${task.status},task1`;

      //checking for duplicate title
      let duplicateTitleCheck = board[str].filter(
        (task) => task.title === title
      ).length;

      if (duplicateTitleCheck > 0) {
        console.error("Title already exists la!");
        return;
      }
      //pushing task to board
      board[str].push(task);
    }

    localStorage.setItem(currentBoard, JSON.stringify(board));

    setTitle("");
    setDescription("");
    setSubtasks([
      { id: 1, prev: "", current: "", status: "pending" },
      { id: 2, prev: "", current: "", status: "pending" },
    ]);
    setStatus("");
    setEditTask({});
    closeTaskModal();
    isBoardChange(true);
  }

  return (
    <form onSubmit={submitHandler}>
      <button
        type="reset"
        className="block ml-auto -mr-12 -mt-12"
        onClick={() => {
          setTitle("");
          setDescription("");
          setSubtasks([
            { id: 1, prev: "", current: "", status: "pending" },
            { id: 2, prev: "", current: "", status: "pending" },
          ]);
          setStatus("");
          setEditTask({});
          closeTaskModal();
        }}
      >
        <i className="fa-solid fa-x p-3 border-0 text-orange hover:bg-orange hover:text-white cursor-pointer"></i>
      </button>
      <h2 className="mt-0 mb-8">Add New Task</h2>
      <fieldset className="my-6">
        <label htmlFor="title" className="block text-[#4f6492]">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="w-full border-2 p-1 pl-3 rounded-lg"
          placeholder="eg. Take Coffee Break"
          value={title}
          onChange={changeHandler}
        />
      </fieldset>
      <fieldset className="my-6">
        <label htmlFor="description" className="block text-[#4f6492]">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="eg. It's always good to take a break. This 15 minute break will recharge the batteries a little"
          className="w-full border-2 p-2 pl-3 rounded-lg"
          value={description}
          onChange={changeHandler}
        />
      </fieldset>
      <fieldset className="my-6">
        <label className="block text-[#4f6492] -mb-3">Subtasks</label>
        {subtasks.map((input, i) => {
          if (!/delete/.exec(input.current))
            return (
              <div key={input.id} className="flex my-3">
                <input
                  id={`subtask${input.id}`}
                  name={`subtask${input.id}`}
                  placeholder={`${
                    i == 0
                      ? "eg. Make coffee"
                      : i == 1
                      ? "eg. Drink coffee & smile"
                      : "Next subtask..."
                  }`}
                  className={`w-full border-2 ${
                    subtaskDelete === `subtask${input.id}` && "border-orange"
                  } p-1 pl-3 rounded-l-lg`}
                  value={input.current}
                  onChange={(e) => changeHandler(e, input.id)}
                />
                <i
                  className="fa-solid fa-x py-3 pr-4 pl-3 -ml-0.5 border-2 rounded-r-lg hover:border-orange text-[#4f6492] hover:bg-orange hover:text-white cursor-pointer"
                  onClick={() => {
                    if (subtasks.length > 1) {
                      let array = [...subtasks];
                      if (editTask) {
                        let currentInput = array[i];
                        if (currentInput.current !== "") {
                          currentInput.current += "delete";
                        }
                        setSubtasks(array);
                      } else {
                        let columnsArray = array.filter(
                          (e) => e.id != input.id
                        );
                        setSubtasks(columnsArray);
                      }
                    }
                  }}
                  onMouseEnter={() => {
                    setSubtaskDelete(`subtask${input.id}`);
                  }}
                  onMouseLeave={() => setSubtaskDelete("")}
                ></i>
              </div>
            );
        })}
        <button
          className="btn-secondary mt-6 ml-auto block w-full"
          onClick={() => {
            if (subtasks.length < 12) {
              setSubtasks((prevState) => [
                ...prevState,
                {
                  id: prevState[prevState.length - 1].id + 1,
                  prev: "",
                  current: "",
                },
              ]);
            }
          }}
          type="button"
        >
          + Add New Subtask
        </button>
      </fieldset>
      <fieldset className="my-6">
        <label htmlFor="status" className="block text-[#4f6492]">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full bg-inherit border-2 rounded-lg p-2"
          value={status}
          onChange={changeHandler}
        >
          {Object.keys(boardColumns).map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </fieldset>
      <button className="btn-primary w-full mt-6" type="submit">
        Add New Task
      </button>
    </form>
  );
}

export default Task;
