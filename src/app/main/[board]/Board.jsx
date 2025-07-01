"use client";

import BoardWrapper from "../BoardWrapper";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { ModalContext } from "@/src/store/modal-context";
import { BoardTaskContext } from "@/src/store/board-task-context";
import {
  fetchSubTasksData,
  fetchABoardsDetails,
  changeTasksColumn,
  fetchTasksData,
} from "@/src/lib/server-actions";

export default function Board() {
  const { openTaskInfoModal, openBoardModal } = useContext(ModalContext);
  const {
    tasks,
    setSubtasks,
    boardColumns,
    setCurrentTask,
    currentBoard,
    setTasks,
    setEditBoard,
  } = useContext(BoardTaskContext);
  const [taskNumber, setTaskNumber] = useState({});
  const tasksDnD = useRef(new Array());
  const [dragging, setDragging] = useState({
    id: null,
    isDragging: false,
  });

  const columnsDnD = useRef(new Array());
  const [dropping, setDropping] = useState({
    id: null,
    isDropping: false,
  });

  useEffect(() => {
    tasks.map((task) => {
      let columnId = task["column_id"];
      let taskId = task["task_id"];

      if (columnId in taskNumber) {
        const isIncluded = taskNumber[columnId].find((task) => task === taskId);
        if (!isIncluded) {
          const newArray = [...taskNumber[columnId]];
          newArray.push(taskId);
          setTaskNumber((prevState) => {
            return {
              ...prevState,
              [columnId]: newArray,
            };
          });
        }
      } else {
        setTaskNumber((prevState) => {
          return {
            ...prevState,
            [columnId]: [taskId],
          };
        });
      }
    });
  }, [taskNumber, tasks]);

  //Pragmatic drag and drop code
  //code for dragging a task
  useEffect(() => {
    if (tasksDnD.current.length > 0) {
      const el = tasksDnD.current;

      el.map((ele) => {
        if (ele.draggable) {
          return;
        }

        let arr = ele.id.split(",");
        let tId = arr[0];
        let columnId = arr[1];

        return draggable({
          element: ele,
          getInitialData: () => ({ tId, columnId }),
          onDragStart: () => {
            setDragging((prevState) => {
              return {
                ...prevState,
                id: tId,
                isDragging: true,
              };
            });
          },
          onDrop: () => {
            setDragging((prevState) => {
              return {
                ...prevState,
                id: tId,
                isDragging: false,
              };
            });
          },
        });
      });
    }
  });

  //code for dropping a task
  useEffect(() => {
    if (columnsDnD.current.length > 0) {
      const el = columnsDnD.current;

      el.map((ele) => {
        if (ele.dataset.dropTargetForElement) return;

        return dropTargetForElements({
          element: ele,
          canDrop: ({ source }) => source.data.columnId !== ele.id,
          onDragEnter: () => {
            setDropping((prevState) => {
              return {
                ...prevState,
                id: ele.id,
                isDropping: true,
              };
            });
          },
          onDragLeave: () => {
            setDropping((prevState) => {
              return {
                ...prevState,
                id: ele.id,
                isDropping: false,
              };
            });
          },
          onDrop: () => {
            setDropping((prevState) => {
              return {
                ...prevState,
                id: ele.id,
                isDropping: false,
              };
            });
          },
          getData: () => ({ columnId: ele.id }),
        });
      });
    }
  }, []);

  //function for changing tasks column after drop
  const changeColumn = useCallback(
    async (columnId, taskId, task) => {
      changeTasksColumn(columnId, taskId);

      const tasks = await fetchTasksData(currentBoard);
      setTasks(tasks);
      setCurrentTask(task);
    },
    [currentBoard, setCurrentTask, setTasks]
  );

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          // if dropped outside of any drop targets
          return;
        }

        const destinationId = destination.data.columnId;
        const taskId = source.data.tId;

        const task = tasks.find((task) => task["task_id"] == taskId);

        if (task !== undefined) {
          changeColumn(destinationId, taskId, task);
        }
      },
    });
  }, [tasks, boardColumns, changeColumn]);

  const colorNo = [
    "bg-cyan-500",
    "bg-darkPurple",
    "bg-emerald-500",
    "bg-orange",
  ];

  return (
    <BoardWrapper>
      {boardColumns.length > 0 &&
        boardColumns.map((column, i) => {
          return (
            <div
              key={column["column_id"]}
              id={column["column_id"]}
              className={`${
                dropping.id == column["column_id"] && dropping.isDropping
                  ? "bg-greyBlue dark:bg-[#1b1c24]"
                  : ""
              } w-[300px] px-[10px] rounded-md mr-6 shrink-0 text-center`}
              ref={(ele) => {
                if (ele) {
                  if (columnsDnD.current.length > 0) {
                    const column = columnsDnD.current.find(
                      (column) => column.id == ele.id
                    );
                    if (column === undefined) {
                      columnsDnD.current.push(ele);
                    }
                  } else {
                    columnsDnD.current.push(ele);
                  }
                }
              }}
            >
              <div className="flex items-center">
                <div
                  className={`p-2 mr-3 inline-block rounded-full border-2 ${
                    colorNo[i < 4 ? i : i >= 4 && i < 8 ? i - 4 : i - 8]
                  }`}
                ></div>
                <h4 className="text-left text-grey dark:text-platinum uppercase tracking-[0.25em] text-base">
                  <span>
                    {column["column_name"]} (
                    {taskNumber[column["column_id"]]
                      ? taskNumber[column["column_id"]].length
                      : 0}
                    )
                  </span>
                </h4>
              </div>
              {tasks.length > 0 &&
                tasks.map((task) => {
                  if (task["column_id"] === column["column_id"]) {
                    return (
                      <div
                        key={task["task_id"]}
                        id={`${task["task_id"]},${task["column_id"]}`}
                        className={`${
                          dragging.id == task["task_id"] && dragging.isDragging
                            ? "opacity-25"
                            : ""
                        } bg-white dark:bg-darkGrey w-full text-black dark:text-white hover:border-[1px] dark:hover:border-magnumGrey hover:border-platinum rounded-lg shadow-md py-3 px-6 my-3 cursor-pointer`}
                        onClick={async () => {
                          let subtasks = await fetchSubTasksData(
                            task["task_id"]
                          );

                          setCurrentTask(task);
                          setSubtasks(subtasks);
                          openTaskInfoModal();
                        }}
                        ref={(ele) => {
                          if (ele) {
                            if (tasksDnD.current.length > 0) {
                              let taskId = ele.id.split(",")[0];
                              let columnId = ele.id.split(",")[1];
                              const task = tasksDnD.current.find(
                                (task) => task.id.split(",")[0] == taskId
                              );

                              if (task === undefined) {
                                tasksDnD.current.push(ele);
                              } else if (
                                task.id.split(",")[0] == taskId &&
                                columnId != task.id.split(",")[1]
                              ) {
                                let arr = tasksDnD.current;
                                let newArr = arr.filter(
                                  (element) => element.id !== task.id
                                );
                                newArr.push(ele);

                                tasksDnD.current = newArr;
                              }
                            } else {
                              tasksDnD.current.push(ele);
                            }
                          }
                        }}
                      >
                        <h2 className="text-left mb-2 text-wrap">
                          {task["task_title"]}
                        </h2>
                        <p className="text-left font-bold text-platinum mb-3.5">
                          {task["no_of_completed_subtasks"]} of{" "}
                          {task["no_of_subtasks"]} Subtasks
                        </p>
                      </div>
                    );
                  }
                })}
            </div>
          );
        })}
      {boardColumns.length > 0 && (
        <div
          className="w-[280px] mt-[60px] mb-3 mr-6 rounded-lg shadow-md text-center bg-darkGreyBlue dark:bg-darkGrey hover:bg-darkGreyBlue dark:hover:bg-grey hover:border-[1px] dark:hover:border-magnumGrey hover:border-platinum cursor-pointer"
          onClick={async () => {
            let columnsData = await fetchABoardsDetails(currentBoard);

            openBoardModal();
            setEditBoard({
              board: currentBoard,
              columns: columnsData,
            });
          }}
        >
          <h2 className="text-darkPurple dark:text-platinum w-[250px] m-[15px]">
            + Add New Column
          </h2>
        </div>
      )}
    </BoardWrapper>
  );
}
