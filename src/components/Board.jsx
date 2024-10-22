"use client";

import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";
import { fillBoardInputsFn } from "../util/fillBoardInputsFn";
import { createBoard } from "../lib/actions";

export default function Board() {
  const { closeBoardModal } = useContext(ModalContext);
  const { isBoardChange, editBoard, setEditBoard } =
    useContext(BoardTaskContext);

  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([
    { id: 1, prev: "", current: "" },
    { id: 2, prev: "", current: "" },
  ]);

  const [columnDelete, setColumnDelete] = useState("");

  useEffect(() => {
    if (editBoard !== "") {
      fillBoardInputsFn(setTitle, setColumns, editBoard);
    }
  }, [editBoard]);

  function deleteBoard() {
    if (editBoard) {
      isBoardChange(true);
      setColumns([
        { id: 1, prev: "", current: "" },
        { id: 2, prev: "", current: "" },
      ]);
      setTitle("");
      closeBoardModal();
      localStorage.removeItem(editBoard);
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
          input.current = val;
        }
        return input;
      });

      setColumns(array);
    }
  }

  function handleSubmit() {
    let storage = localStorage.getItem(editBoard || title);

    if (editBoard) {
      let obj = JSON.parse(storage);
      let arr = Object.keys(obj);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = JSON.parse(arr[i]);
      }
      let columnsArray = [...columns];

      if (arr.length <= columnsArray.length) {
        for (let i = 0; i < columnsArray.length; i++) {
          if (columnsArray[i].current === "" && columnsArray[i].prev === "")
            continue;
          let columnFromStorage = arr.filter(
            (input) => input.id === columnsArray[i].id
          )[0];

          if (!columnFromStorage) {
            obj[JSON.stringify(columnsArray[i])] = [];
            continue;
          }

          let stringColumnFromStorage = JSON.stringify(columnFromStorage);
          if (i < arr.length) {
            if (/delete/.test(columnsArray[i].current)) {
              columnsArray = columnsArray.filter(
                (e) => e.id !== columnsArray[i].id
              );

              delete obj[stringColumnFromStorage];
              if (columnsArray[i]) {
                columnFromStorage = arr.filter(
                  (input) => input.id === columnsArray[i].id
                );
              } else break;
            }

            if (
              columnsArray[i].current !== columnFromStorage.current &&
              columnsArray[i].prev === columnFromStorage.current
            ) {
              //changing the column name by changing the key name of the obj
              obj[JSON.stringify(columnsArray[i])] =
                obj[stringColumnFromStorage];

              delete obj[stringColumnFromStorage];

              //changing the status of the tasks to reflect this new info
              let array = obj[JSON.stringify(columnsArray[i])];

              if (array.length === 1) array[0].status = columnsArray[i].current;
              else if (array.length > 1) {
                for (let i = 0; i < array.length; i++) {
                  array[i].status = columnsArray[i].current;
                }
              }
            }
          } else {
            obj[JSON.stringify(columnsArray[i])] = [];
          }
        }

        //sorting board columns
        let newArr = Object.keys(obj);
        for (let i = 0; i < newArr.length; i++) {
          newArr[i] = JSON.parse(newArr[i]);
        }
        let sortedObj = newArr
          .sort((a, b) => a.id - b.id)
          .reduce((o, key) => {
            let stringifiedKey = JSON.stringify(key);
            o[stringifiedKey] = obj[stringifiedKey];
            return o;
          }, {});

        if (title === editBoard) {
          localStorage.setItem(title, JSON.stringify(sortedObj));
        } else {
          localStorage.removeItem(editBoard);
          localStorage.setItem(title, JSON.stringify(sortedObj));
        }
      }
      setEditBoard("");
    } else {
      if (!storage) {
        let obj = {};
        for (let i = 0; i < columns.length; i++) {
          obj[JSON.stringify(columns[i])] = [];
        }
        localStorage.setItem(title, JSON.stringify(obj));
      } else {
        console.log(
          "board already exists with this name please choose a unique name or add a number identifier to make name unique."
        );
      }
    }

    isBoardChange(true);
    /*setColumns([
      { id: 1, prev: "", current: "" },
      { id: 2, prev: "", current: "" },
    ]);
    setTitle("");*/
    closeBoardModal();
  }

  const createNewBoard = createBoard.bind(null, {
    title: title,
    columns: columns,
  });

  return (
    <form action={createNewBoard} onSubmit={handleSubmit}>
      <button
        type="reset"
        className="block ml-auto -mr-12 -mt-12 rounded-tr-lg"
        onClick={() => {
          if (editBoard) {
            setEditBoard("");
          }
          setColumns([
            { id: 1, prev: "", current: "" },
            { id: 2, prev: "", current: "" },
          ]);
          setTitle("");
          closeBoardModal();
        }}
      >
        <i className="fa-solid fa-x p-3 pr-4 border-0 text-orange hover:bg-orange hover:text-white cursor-pointer"></i>
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
          if (!/delete/.exec(input.current))
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
                  value={input.current}
                  onChange={(e) => changeHandler(e, input.id)}
                />
                <i
                  className="fa-solid fa-x py-3 pr-4 pl-3 -ml-0.5 border-2 rounded-r-lg text-[#4f6492] hover:bg-orange hover:text-white hover:border-orange cursor-pointer"
                  onClick={() => {
                    if (columns.length > 1) {
                      let array = [...columns];
                      if (editBoard) {
                        let currentInput = array[i];
                        if (currentInput.current !== "") {
                          currentInput.current += "delete";
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
                  prev: "",
                  current: "",
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
