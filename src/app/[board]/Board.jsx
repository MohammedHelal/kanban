"use client";

import { useContext, useState, useEffect } from "react";
import { ModalContext } from "@/src/store/modal-context";
import { BoardTaskContext } from "@/src/store/board-task-context";
import { SidebarContext } from "@/src/store/sidebar-context";
import {
  fetchSubTasksData,
  fetchABoardsDetails,
} from "@/src/lib/server-actions";

export default function Board() {
  const { openTaskInfoModal, openBoardModal } = useContext(ModalContext);
  const {
    tasks,
    setSubtasks,
    boardColumns,
    setCurrentTask,
    currentBoard,
    setEditBoard,
  } = useContext(BoardTaskContext);
  const { sidebar } = useContext(SidebarContext);
  const [taskNumber, setTaskNumber] = useState({});

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

  const colorNo = [
    "bg-cyan-500",
    "bg-darkPurple",
    "bg-emerald-500",
    "bg-orange",
  ];

  return (
    <main
      className={`m-trans h-screen scroll-auto overflow-auto ${
        sidebar ? `md:ml-[250px]` : "ml-0"
      } scroll-m-0 bg-greyBlue`}
    >
      <div
        className={`relative p-6 pt-[100px] flex ${
          sidebar ? "min-w-[calc(100vw - 300px)]" : ""
        }`}
      >
        {boardColumns.length > 0 &&
          boardColumns.map((column, i) => {
            return (
              <div
                key={column["column_id"]}
                className="w-[280px] mr-12 shrink-0 text-center"
              >
                <div className="flex items-center">
                  <div
                    className={`p-2 mr-3 inline-block rounded-full border-2 ${
                      colorNo[i < 4 ? i : i >= 4 && i < 8 ? i - 4 : i - 8]
                    }`}
                  ></div>
                  <h4 className="text-left text-[#5d5e75] uppercase tracking-[0.25em] text-base">
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
                          className="bg-white w-full border-[1px] border-white hover:border-[1px] hover:border-platinum rounded-lg shadow-md py-3 px-6 my-3 cursor-pointer"
                          onClick={async () => {
                            let subtasks = await fetchSubTasksData(
                              task["task_id"]
                            );

                            setCurrentTask(task);
                            setSubtasks(subtasks);
                            openTaskInfoModal();
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
            className="w-[280px] mt-[64px] mr-12 rounded-lg text-center bg-[#cedbfb] hover:bg-[#c9d4ed] cursor-pointer"
            onClick={async () => {
              let columnsData = await fetchABoardsDetails(currentBoard);

              openBoardModal();
              setEditBoard({
                board: currentBoard,
                columns: columnsData,
              });
            }}
          >
            <h2 className="text-darkPurple w-[250px] m-[15px]">
              + Add New Column
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}
