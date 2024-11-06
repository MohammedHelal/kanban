"use client";

import { useContext } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";
import { SidebarContext } from "../store/sidebar-context";
import { fetchSubTasksData } from "../util/server-actions";
import Header from "../app/layout/Header";
import useSidebarClasses from "../util/useSidebarClasses";

export default function Board() {
  const { openTaskInfoModal, openBoardModal } = useContext(ModalContext);
  const { tasks, setSubtasks, boardColumns, setCurrentTask } =
    useContext(BoardTaskContext);
  const { sidebar } = useContext(SidebarContext);
  const sidebarClasses = useSidebarClasses(true);

  const colorNo = [
    "bg-cyan-500",
    "bg-darkPurple",
    "bg-emerald-500",
    "bg-orange",
  ];

  return (
    <main
      className={`min-h-screen m-trans ${sidebarClasses} scroll-m-0 bg-greyBlue`}
    >
      {boardColumns.length > 0 && <Header />}
      <div
        className={`relative p-6 h-[calc(100vh-88.6px)] scroll-auto overflow-auto flex ${
          sidebar ? "w-[calc(100vw - 300px)]" : "w-full"
        }`}
      >
        {boardColumns.length > 0 &&
          boardColumns.map((column, i) => {
            return (
              <div
                key={column["column_id"]}
                className="w-[280px] h-[200vh] mr-12 shrink-0 text-center"
              >
                <div className="flex items-center">
                  <div
                    className={`p-2 mr-3 inline-block rounded-full border-2 ${
                      colorNo[i < 4 ? i : i >= 4 && i < 8 ? i - 4 : i - 8]
                    }`}
                  ></div>
                  <h4 className="text-left text-[#5d5e75] uppercase tracking-[0.25em] text-base">
                    <span>{column["column_name"]} (0)</span>
                  </h4>
                </div>
                {tasks.length > 0 &&
                  tasks.map((task) => {
                    if (task["column_id"] === column["column_id"]) {
                      return (
                        <div
                          key={task["task_id"]}
                          className="bg-white w-full border-0 rounded-lg shadow-md py-3 px-6 my-3 cursor-pointer"
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
            onClick={() => openBoardModal()}
            className="w-[280px] h-[200vh] shrink-0 mr-6 rounded-lg text-center bg-[#c9d4ed] hover:bg-[#ffffff5a] cursor-pointer"
          >
            <h1 className="new-column text-darkPurple">+ Add New Column</h1>
          </div>
        )}
      </div>
    </main>
  );
}
