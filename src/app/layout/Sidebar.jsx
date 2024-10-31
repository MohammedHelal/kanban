"use client";

import { useState, useEffect, useContext } from "react";
import { ModalContext } from "@/src/store/modal-context";
import { BoardTaskContext } from "@/src/store/board-task-context";
import { SidebarContext } from "@/src/store/sidebar-context";
import logo from "@/src/assets/logo-dark.svg";
import show from "@/src/assets/icon-show-sidebar.svg";
import hide from "@/src/assets/icon-hide-sidebar.svg";
import board from "@/src/assets/icon-board.svg";
import Image from "next/image";

import PropTypes from "prop-types";

function Sidebar({ fetchABoardsDetails, boardData, fetchTasksData }) {
  const { openBoardModal } = useContext(ModalContext);
  const {
    isChanged,
    isBoardChange,
    setCurrentBoard,
    setBoardColumns,
    setEditBoard,
    setTasks,
  } = useContext(BoardTaskContext);
  const { sidebar, hideSidebar, showSidebar } = useContext(SidebarContext);

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (boardData) {
      let arr = [];
      let obj = {};
      for (let i = 0; i < boardData.length; i++) {
        let current = boardData[i];

        if (!(current["board_name"] in obj)) {
          obj[current["board_name"]] = 1;
          arr.push(current["board_name"]);
        }
      }
      setBoards(arr);
    }
  }, [boardData]);

  return (
    <aside
      className={`sidebar absolute w-[300px] top-0 left-0 flex flex-col justify-between h-screen bg-white z-10 px-6 ${
        sidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div id="boards" className={`my-9 mx-0`}>
        <Image src={logo} className="" alt="Logo" />
        <div id="boards" className="my-16">
          <h4 className="">ALL BOARDS ({boards.length})</h4>
          {boards.map((boardName, i) => (
            <div key={i} className="flex items-center ">
              <button
                onClick={async () => {
                  let columnsData = await fetchABoardsDetails(boardName);
                  let taskData = await fetchTasksData(boardName);

                  setCurrentBoard(boardName);
                  setBoardColumns(columnsData);
                  setTasks(taskData);
                }}
                className="text-left border-0 rounded-r-full text-darkPurple hover:bg-darkPurple hover:text-white block w-[215px] py-2 pl-6 -ml-6"
              >
                <Image src={board} className="board inline mr-6" alt="" />{" "}
                {boardName}
              </button>
              <i
                className="fa-solid fa-pen-to-square ml-auto p-3 rounded-full text-darkPurple hover:bg-darkPurple hover:text-white cursor-pointer"
                onClick={async () => {
                  let columnsData = await fetchABoardsDetails(boardName);

                  openBoardModal();
                  setEditBoard({
                    board: boardName,
                    columns: columnsData,
                  });
                }}
              ></i>
            </div>
          ))}
          <button
            className="create-new-modal block py-2 pl-6 -ml-6 w-full text-left text-platinum font-bold bg-inherit hover:text-grey"
            onClick={openBoardModal}
          >
            <Image src={board} className="svg-img inline mr-6" alt="" /> +
            Create new boards{" "}
          </button>
        </div>
      </div>
      <div className="my-12">
        <button
          className={`bg-greyBlue border-0 rounded-full p-1 w-full text-grey-500 `}
          onClick={hideSidebar}
        >
          <Image src={hide} className="inline pb-1 pr-3" alt="Sidebar eye!" />{" "}
          Hide sidebar
        </button>
      </div>
      <button
        className={`show-sidebar absolute bottom-1/4 -right-[42px] bg-indigo-500 my-6 px-4 py-3 rounded-r-full rounded-l-none`}
        onClick={showSidebar}
      >
        <Image src={show} alt="Sidebar eye!" />
      </button>
    </aside>
  );
}

Sidebar.propTypes = {
  sidebar: PropTypes.bool.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  showSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
