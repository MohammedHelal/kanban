"use client";

import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";
import { createTask, updateTask } from "../lib/actions";
import { fetchTasksData } from "../lib/server-actions";

export default function TaskModal() {
  const { closeTaskModal, closeTaskInfoModal } = useContext(ModalContext);
  const {
    currentBoard,
    boardColumns,
    editTask,
    setTasks,
    subtasks,
    setEditTask,
  } = useContext(BoardTaskContext);

  //state for the deletion/removal of subtask input
  const [subtaskDelete, setSubtaskDelete] = useState("");

  //state for the value of the form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtaskState, setSubtaskState] = useState([
    {
      subtask_id: 1,
      subtask_title: "",
      is_completed: false,
      task_id: editTask["task_id"] || "",
    },
    {
      subtask_id: 2,
      subtask_title: "",
      is_completed: false,
      task_id: editTask["task_id"] || "",
    },
  ]);
  const [errors, setErrors] = useState({
    title: false,
    subtasks: false,
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    //console.log(editTask);
    if (editTask["task_id"]) {
      //copying the task object to prevent any unintended changes to the editTask or the currentTask states
      let transferObj = { ...editTask };
      setTitle(transferObj["task_title"]);
      setDescription(transferObj.description);

      //recursively copying the subtask array to prevent any unintended changes to the editTask or the currentTask states
      let array = [];
      for (let i = 0; i < subtasks.length; i++) {
        array.push({ ...subtasks[i] });
      }
      setSubtaskState(array);
      setStatus(transferObj.status);
    }
  }, [editTask, subtasks]);

  function changeHandler(e, id) {
    let inputId = e.target.id;
    let val = e.target.value;

    if (inputId === "title") {
      setErrors((prevState) => {
        return {
          ...prevState,
          title: false,
        };
      });
    }

    if (inputId != "title" && inputId != "description" && inputId != "status") {
      setErrors((prevState) => {
        return {
          ...prevState,
          subtasks: false,
        };
      });
    }

    if (inputId === "title") {
      setTitle(val);
    } else if (inputId === "description") {
      setDescription(val);
    } else if (inputId === "status") {
      setStatus(val);
    } else {
      let array = subtaskState.map((input) => {
        if (input["subtask_id"] === id) {
          input["subtask_title"] = val;
        }
        return input;
      });

      setSubtaskState(array);
    }
  }

  function blurHandler(event) {
    let inputId = event.target.id;

    if (inputId === "title" && title === "") {
      setErrors((prevState) => {
        return {
          ...prevState,
          title: true,
        };
      });
    }

    if (inputId != "title" && inputId != "description" && inputId != "status") {
      const filteredSubtasks = subtaskState.filter(
        (subtask) => subtask["subtask_title"] !== ""
      );
      if (filteredSubtasks.length <= 0) {
        setErrors((prevState) => {
          return {
            ...prevState,
            subtasks: true,
          };
        });
      }
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    const filteredSubtasks = subtaskState.filter(
      (subtask) => subtask["subtask_title"] !== ""
    );
    console.log(filteredSubtasks);

    if (title === "") {
      setErrors((prevState) => {
        return {
          ...prevState,
          title: true,
        };
      });
    }

    if (filteredSubtasks.length <= 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          subtasks: true,
        };
      });
    }

    if (title !== "" && filteredSubtasks.length > 0) {
      const columnId = status
        ? boardColumns.filter((column) => column["column_name"] === status)[0][
            "column_id"
          ]
        : Object.keys(editTask).length <= 0
        ? boardColumns[0]["column_id"]
        : editTask["column_id"];

      let task = {
        title: title,
        description: description,
        subtasks: filteredSubtasks,
        columnId: columnId,
      };

      if (Object.keys(editTask).length <= 0) {
        createTask(task, currentBoard);
      } else {
        let completeNo = 0;
        for (let i = 0; i < task.subtasks.length; i++) {
          if (task.subtasks[i].status === "done") completeNo++;
        }
        task.completeNo = completeNo;
        task.id = editTask["task_id"];
        updateTask(task);
      }

      let taskData = await fetchTasksData(currentBoard);
      setTasks(taskData);

      setTitle("");
      setDescription("");
      setSubtaskState([
        {
          subtask_id: 1,
          subtask_title: "",
          is_completed: false,
          task_id: editTask["task_id"] || "",
        },
        {
          subtask_id: 2,
          subtask_title: "",
          is_completed: false,
          task_id: editTask["task_id"] || "",
        },
      ]);

      setStatus("");
      setEditTask({});
      closeTaskModal();
      closeTaskInfoModal();
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <button
        type="reset"
        className="block ml-auto -mr-6 md:-mr-12 -mt-6 md:-mt-12"
        onClick={() => {
          setTitle("");
          setDescription("");
          setSubtaskState([
            {
              subtask_id: 1,
              subtask_title: "",
              is_completed: false,
              task_id: editTask["task_id"] || "",
            },
            {
              subtask_id: 2,
              subtask_title: "",
              is_completed: false,
              task_id: editTask["task_id"] || "",
            },
          ]);
          setStatus("");
          setEditTask({});
          closeTaskModal();
        }}
      >
        <i className="task-close fa-solid fa-x p-3 border-0 text-orange hover:bg-orange hover:text-white cursor-pointer"></i>
      </button>
      <h2 className="mt-0 mb-8 dark:text-light">Add New Task</h2>
      <fieldset className="my-6">
        <label htmlFor="title" className="block text-platinum">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="w-full border-[1px] p-1 pl-3 rounded-md dark:border-grey dark:bg-magnumGrey dark:text-light"
          placeholder="eg. Take Coffee Break"
          value={title}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
        {errors.title && (
          <p className="py-2 text-orange italic">
            The title can&apos;t be empty
          </p>
        )}
      </fieldset>
      <fieldset className="my-6">
        <label htmlFor="description" className="block text-platinum">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="eg. It's always good to take a break. This 15 minute break will recharge the batteries a little"
          className="w-full border-[1px] p-2 pl-3 rounded-md dark:border-grey dark:bg-magnumGrey dark:text-light"
          value={description}
          onChange={changeHandler}
        />
      </fieldset>
      <fieldset className="my-6">
        <label className="block text-platinum -mb-3">Subtasks</label>
        {subtaskState.map((input, i) => {
          if (!/delete/.exec(input["subtask_title"])) {
            return (
              <div key={input["subtask_id"]} className="flex my-3">
                <input
                  id={`subtask${input["subtask_id"]}`}
                  name={`subtask${input["subtask_id"]}`}
                  placeholder={`${
                    i == 0
                      ? "eg. Make coffee"
                      : i == 1
                      ? "eg. Drink coffee & smile"
                      : "Next subtask..."
                  }`}
                  className={`w-full border-[1px] border-r-0  ${
                    subtaskDelete === `subtask${input["subtask_id"]}`
                      ? "border-orange"
                      : "dark:border-grey"
                  } p-1 pl-3 rounded-l-lg dark:bg-magnumGrey dark:text-light`}
                  value={input["subtask_title"]}
                  onChange={(e) => changeHandler(e, input["subtask_id"])}
                  onBlur={blurHandler}
                />
                <i
                  className="fa-solid fa-x py-3 pr-4 pl-3 -ml-0.5 dark:bg-magnumGrey border-[1px] dark:border-grey rounded-r-lg hover:border-orange text-platinum hover:bg-orange hover:text-white cursor-pointer"
                  onClick={() => {
                    if (subtaskState.length > 1) {
                      let array = [...subtaskState];
                      if (editTask["task_id"]) {
                        let currentInput = array[i];
                        if (currentInput["subtask_title"] !== "") {
                          currentInput["subtask_title"] += "delete";
                        }
                        setSubtaskState(array);
                      } else {
                        let columnsArray = array.filter(
                          (e) => e["subtask_id"] != input["subtask_id"]
                        );
                        setSubtaskState(columnsArray);
                      }
                    }
                  }}
                  onMouseEnter={() => {
                    setSubtaskDelete(`subtask${input["subtask_id"]}`);
                  }}
                  onMouseLeave={() => setSubtaskDelete("")}
                ></i>
              </div>
            );
          }
        })}
        {errors.subtasks && (
          <p className="py-2 text-orange italic">
            You must add at least one subtask.
          </p>
        )}
        <button
          className="btn-secondary mt-6 ml-auto block w-full"
          onClick={() => {
            if (subtasks.length < 12) {
              setSubtaskState((prevState) => [
                ...prevState,
                {
                  subtask_id: prevState[prevState.length - 1]["subtask_id"] + 1,
                  subtask_title: "",
                  is_completed: false,
                  task_id: editTask["task_id"] || "",
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
        <label htmlFor="status" className="block text-platinum">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full bg-inherit dark:bg-magnumGrey text-magnumGrey border-[1px] rounded-lg p-2 dark:border-grey dark:text-light cursor-pointer"
          value={status}
          onChange={changeHandler}
        >
          {boardColumns.map((column) => (
            <option
              className=""
              key={column["column_id"]}
              value={column["column_name"]}
            >
              {column["column_name"]}
            </option>
          ))}
        </select>
      </fieldset>
      <button className="btn-primary w-full mt-6" type="submit">
        {Object.keys(editTask).length <= 0 ? "Create New Task" : "Edit Task"}
      </button>
    </form>
  );
}
