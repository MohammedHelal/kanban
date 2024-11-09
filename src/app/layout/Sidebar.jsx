"use client";

import { useState, useEffect, useContext } from "react";
import { ModalContext } from "@/src/store/modal-context";
import { BoardTaskContext } from "@/src/store/board-task-context";
import { SidebarContext } from "@/src/store/sidebar-context";
import { fetchABoardsDetails, fetchTasksData } from "@/src/util/server-actions";
import logo from "@/src/assets/logo-dark.svg";
import board from "@/src/assets/icon-board.svg";
import Image from "next/image";

import PropTypes from "prop-types";

function Sidebar({ boardData }) {
  const { openBoardModal } = useContext(ModalContext);
  const {
    currentBoard,
    setCurrentBoard,
    setBoardColumns,
    setTasks,
    loading,
    setLoading,
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
    <>
      <aside
        className={`sidebar w-[250px] h-dvh md:h-screen absolute top-0 left-0 flex flex-col justify-between bg-white border-r-[1px] border-greyBlue z-20 px-6 ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div id="boards" className={`my-9 mx-0`}>
          <Image src={logo} className="" alt="Logo" priority />
          <div id="boards" className="my-16">
            <h4 className="">ALL BOARDS ({boards.length})</h4>
            {boards.map((boardName, i) => (
              <div key={i} className="flex items-center mb-1">
                <button
                  onClick={async () => {
                    setLoading(true);
                    let columnsData = await fetchABoardsDetails(boardName);
                    let taskData = await fetchTasksData(boardName);

                    setLoading(false);

                    setCurrentBoard(boardName);
                    setBoardColumns(columnsData);
                    setTasks(taskData);
                  }}
                  className={`text-left border-0 rounded-r-full ${
                    currentBoard === boardName
                      ? "bg-darkerPurple text-white"
                      : "text-darkPurple hover:bg-darkPurple hover:text-white"
                  }  block w-[215px] py-2 pl-6 -ml-6`}
                >
                  <Image src={board} className="board inline mr-6" alt="" />{" "}
                  {boardName}
                </button>
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
            className={`bg-greyBlue hover:bg-magnumGrey hover:text-white border-0 rounded-full p-1 w-full text-grey-500 `}
            onClick={hideSidebar}
          >
            <i className="fa-regular fa-eye-slash mr-2"></i> Hide sidebar
          </button>
        </div>
        {!sidebar && (
          <button
            className={`absolute bottom-16 -right-[42px] bg-darkPurple text-white hover:bg-darkerPurple my-6 px-4 py-3 rounded-r-full rounded-l-none`}
            onClick={showSidebar}
          >
            <i className="fa-regular fa-eye fa-lg"></i>
          </button>
        )}
      </aside>
      <div
        className={`${
          sidebar ? "block md:hidden" : "hidden"
        }  absolute top-0 bottom-0 left-0 right-0 bg-magnumGrey/50 z-10`}
        onClick={hideSidebar}
      ></div>
    </>
  );
}

Sidebar.propTypes = {
  sidebar: PropTypes.bool.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  showSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
