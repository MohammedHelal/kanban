"use client";

import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";
import { fillBoardInputsFn } from "../util/fillBoardInputsFn";
import { createBoard } from "../lib/actions";

export default function Board({ fetchABoardsDetails }) {
  const { closeBoardModal } = useContext(ModalContext);
  const { isBoardChange, editBoard, setEditBoard } =
    useContext(BoardTaskContext);

  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([
    { id: 1, columnName: "" },
    { id: 2, columnName: "" },
  ]);

  const [columnDelete, setColumnDelete] = useState("");

  useEffect(() => {
    if (editBoard.board) {
      console.log(editBoard);
      setTitle(editBoard.board);
      let array = [];
      for (let i = 0; i < editBoard.columns.length; i++) {
        let columnObj = {
          id: i + 1,
          columnName: editBoard.columns["column_name"],
        };
        array.push(columnObj);
      }

      setColumns(array);
    }
  }, [editBoard]);

  function deleteBoard() {
    if (editBoard) {
      isBoardChange(true);
      setColumns([
        { id: 1, columnName: "" },
        { id: 2, columnName: "" },
      ]);
      setTitle("");
      closeBoardModal();
    }
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

  function handleSubmit() {
    if (editBoard.board === "") {
      createBoard({
        title: title,
        columns: columns,
      });
    } else {
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
        className="block ml-auto -mr-12 -mt-12 rounded-tr-lg"
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
                  onClick={() => {
                    if (columns.length > 1) {
                      let array = [...columns];
                      if (editBoard) {
                        let currentInput = array[i];
                        if (currentInput.columnName !== "") {
                          currentInput.columnName += "delete";
                        }
                        setColumns(array);
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
                  id: prevState[prevState.length - 1].id + 1,
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
      <div
        className={`${
          editBoard && "w-full flex justify-between items-center mt-6"
        }`}
      >
        {editBoard && (
          <button
            className="btn-destructive"
            type="button"
            onClick={deleteBoard}
          >
            Delete Board
          </button>
        )}
        <button
          className={`btn-primary ${!editBoard && "w-full"}`}
          type="submit"
        >
          {editBoard ? "Save Changes" : "Create New Board"}
        </button>
      </div>
    </form>
  );
}
