"use client";

import { useContext } from "react";
import { ModalContext } from "@/src/store/modal-context";
import { BoardTaskContext } from "@/src/store/board-task-context";
import useSidebarClasses from "@/src/util/useSidebarClasses";
import more from "@/src/assets/icon-vertical-ellipsis.svg";

import Image from "next/image";

function Header() {
  const { openTaskModal } = useContext(ModalContext);
  const { currentBoard } = useContext(BoardTaskContext);
  const sidebar = useSidebarClasses(false);

  return (
    <header className="w-full">
      <nav className="w-full h-[88.6px] p-0 flex items-center bg-white">
        <div
          className={`w-full navbar m-trans p-6 flex items-center justify-between ${sidebar}`}
        >
          <h2>{currentBoard}</h2>
          <div className="flex items-center">
            {currentBoard && (
              <button
                className="btn-primary L"
                onClick={() => openTaskModal(true)}
              >
                + Add New Task
              </button>
            )}
            <Image
              src={more}
              className="px-3 mx-3 cursor-pointer"
              alt="drop down menu"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
