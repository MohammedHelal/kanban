"use client";

import { useContext } from "react";
import { ModalContext } from "../store/modal-context";
import { BoardTaskContext } from "../store/board-task-context";
import { SidebarContext } from "../store/sidebar-context";

function Main() {
  const { openTaskInfoModal, openBoardModal } = useContext(ModalContext);
  const { boardColumns, setCurrentTask } = useContext(BoardTaskContext);
  const { sidebar } = useContext(SidebarContext);

  const colorNo = [
    "bg-cyan-500",
    "bg-darkPurple",
    "bg-emerald-500",
    "bg-orange",
  ];

  return (
    <section
      className={`relative p-6 flex ${
        sidebar ? "w-[calc(100vw - 300px)]" : "w-full"
      }`}
    >
      {Object.keys(boardColumns).length > 0 &&
        Object.keys(boardColumns).map((e, i) => {
          let array = boardColumns[e];

          return (
            <div
              key={i}
              className="w-[280px] h-[200vh] mr-12 shrink-0 text-center"
            >
              <div className="flex items-center">
                <div
                  className={`p-2 mr-3 inline-block rounded-full border-2 ${
                    colorNo[i < 4 ? i : i >= 4 && i < 8 ? i - 4 : i - 8]
                  }`}
                ></div>
                <h4 className="text-left text-[#5d5e75] uppercase tracking-[0.25em] text-base">
                  <span>
                    {e} ({array.length})
                  </span>
                </h4>
              </div>
              {array.length > 0 &&
                array.map((e) => (
                  <div
                    key={e.id}
                    className="bg-white w-full border-0 rounded-lg shadow-md py-3 px-6 my-3 cursor-pointer"
                    onClick={() => {
                      setCurrentTask(e);
                      openTaskInfoModal();
                    }}
                  >
                    <h2 className="text-left mb-2 text-wrap">{e["title"]}</h2>
                    <p className="text-left font-bold text-platinum mb-3.5">
                      {e["subtasks"].reduce((acc, cv) => {
                        if (cv.status === "done") acc++;
                        return acc;
                      }, 0)}{" "}
                      of {e["subtasks"].length} Subtasks
                    </p>
                  </div>
                ))}
            </div>
          );
        })}
      {Object.keys(boardColumns).length > 0 && (
        <div
          onClick={() => openBoardModal()}
          className="w-[280px] h-[200vh] shrink-0 mr-6 rounded-lg text-center bg-[#c9d4ed] hover:bg-[#ffffff5a] cursor-pointer"
        >
          <h1 className="new-column text-darkPurple">+ Add New Column</h1>
        </div>
      )}
    </section>
  );
}

export default Main;
