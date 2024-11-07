"use client";

import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";
import { createBoard, updateBoard, deleteBoard } from "../lib/actions";
import {
  fetchABoardsDetails,
  fetchTasksOfColumnData,
  fetchTasksData,
} from "../util/server-actions";

export default function BoardModal() {
  const { closeBoardModal } = useContext(ModalContext);
  const {
    currentBoard,
    isBoardChange,
    editBoard,
    setEditBoard,
    setCurrentBoard,
    setBoardColumns,
    setTasks,
  } = useContext(BoardTaskContext);

  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([
    { id: 1, columnName: "" },
    { id: 2, columnName: "" },
  ]);

  const [columnDelete, setColumnDelete] = useState("");
  const [cantDeleteColumnError, setCantDeleteColumnError] = useState(false);

  useEffect(() => {
    let timer1 =
      cantDeleteColumnError &&
      setTimeout(() => setCantDeleteColumnError(false), 3000);

    return () => {
      clearTimeout(timer1);
    };
  });

  useEffect(() => {
    if (editBoard.board) {
      setTitle(editBoard.board);
      let array = [];
      for (let i = 0; i < editBoard.columns.length; i++) {
        let columnObj = {
          id: editBoard.columns[i]["column_id"],
          columnName: editBoard.columns[i]["column_name"],
        };
        array.push(columnObj);
      }
      setColumns(array);
    }
  }, [editBoard]);

  function deleteBoardHandler() {
    deleteBoard(title);
  }

  function changeHandler(e, id) {
    let inputId = e.target.id;
    let val = e.target.value;

    if (inputId === "title") {
      setTitle(val);
    } else {
      let array = columns.map((input) => {
        if (input.id === id) {
          input.columnName = val;
        }
        return input;
      });

      setColumns(array);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editBoard.board) {
      updateBoard({
        title: title,
        columns: columns,
      });

      if (currentBoard === editBoard.board) {
        (async () => {
          let columnsData = await fetchABoardsDetails(editBoard.board);
          let taskData = await fetchTasksData(editBoard.board);

          setBoardColumns(columnsData);
          setTasks(taskData);
        })();
      }
    } else {
      createBoard({
        title: title,
        columns: columns,
      });
    }
    setColumns([
      { id: 1, columnName: "" },
      { id: 2, columnName: "" },
    ]);
    setTitle("");
    setEditBoard({});
    closeBoardModal();
    isBoardChange(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="reset"
        className="block ml-auto -mr-6 md:-mr-12 -mt-6 md:-mt-12 rounded-tr-lg"
        onClick={() => {
          if (editBoard) {
            setEditBoard({});
          }
          setColumns([
            { id: 1, columnName: "" },
            { id: 2, columnName: "" },
          ]);
          setTitle("");
          closeBoardModal();
        }}
      >
        <i className="board-close fa-solid fa-x p-3 pr-4 border-0 text-orange hover:bg-orange hover:text-white cursor-pointer"></i>
      </button>
      <h2 className="mt-0 mb-12">Add New Board</h2>
      <div className="mb-6">
        <label htmlFor="title" className="block text-[#4f6492]">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="w-full border-2 rounded-lg p-1 pl-3 mt-3"
          placeholder="eg. Web Design"
          value={title}
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4f6492]">Columns</label>
        {cantDeleteColumnError && (
          <p className="py-2 px-3 bg-orange text-white rounded-lg">
            This column contains tasks and so it can&apos;t be deleted
          </p>
        )}
        {columns.map((input, i) => {
          if (!/delete/.exec(input.columnName))
            return (
              <div key={input.id} className="flex my-3">
                <input
                  id={`column${input.id}`}
                  name={`column${input.id}`}
                  placeholder={`${
                    i == 0
                      ? "eg. To do"
                      : i == 1
                      ? "eg. Doing"
                      : i == 2
                      ? "eg. Done"
                      : "Next Column"
                  }`}
                  className={`w-full border-2 rounded-l-lg ${
                    columnDelete === `column${input.id}` && "border-orange"
                  } p-1 pl-3`}
                  value={input.columnName}
                  onChange={(e) => changeHandler(e, input.id)}
                />
                <i
                  className="fa-solid fa-x py-3 pr-4 pl-3 -ml-0.5 border-2 rounded-r-lg text-[#4f6492] hover:bg-orange hover:text-white hover:border-orange cursor-pointer"
                  onClick={async () => {
                    if (columns.length > 1) {
                      let array = [...columns];
                      if (editBoard.board) {
                        let tasksData = await fetchTasksOfColumnData(input.id);
                        if (tasksData.length <= 0) {
                          let currentInput = array[i];
                          if (currentInput.columnName !== "") {
                            currentInput.columnName += "delete";
                          }
                          setColumns(array);
                        } else {
                          setCantDeleteColumnError(true);
                        }
                      } else {
                        let columnsArray = array.filter(
                          (e) => e.id != input.id
                        );
                        setColumns(columnsArray);
                      }
                    }
                  }}
                  onMouseEnter={() => {
                    setColumnDelete(`column${input.id}`);
                  }}
                  onMouseLeave={() => setColumnDelete("")}
                ></i>
              </div>
            );
        })}
        <button
          className="btn-secondary my-6 ml-auto block w-full"
          onClick={() => {
            if (columns.length < 12) {
              setColumns((prevState) => [
                ...prevState,
                {
                  id: prevState[prevState.length - 1].id + 1 + "new",
                  columnName: "",
                },
              ]);
            }
          }}
          type="button"
        >
          + Add New Column
        </button>
      </div>
      <button className={`btn-primary w-full mt-6`} type="submit">
        {editBoard.board ? "Save Changes" : "Create New Board"}
      </button>
    </form>
  );
}
