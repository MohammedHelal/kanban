"use client";

import { useState, useEffect, useContext } from "react";
import { ModalContext } from "@/src/store/modal-context";
import { BoardTaskContext } from "@/src/store/board-task-context";
import { SidebarContext } from "@/src/store/sidebar-context";
import { fetchABoardsDetails, fetchTasksData } from "@/src/lib/server-actions";

import Link from "next/link";

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
  const [mobileSidebarHide, setMobileSidebarHide] = useState(false);

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

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    if (mobileSidebarHide && isMobile) hideSidebar();
  }, [hideSidebar, mobileSidebarHide]);

  return (
    <>
      <aside
        className={`sidebar w-[250px] h-dvh absolute top-0 left-0 flex flex-col justify-between bg-white dark:bg-darkGrey border-r-[1px] border-greyBlue dark:border-grey z-20 px-6 ${
          sidebar && mobileSidebarHide
            ? "max-[600px]:-translate-x-full"
            : sidebar && !mobileSidebarHide
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div id="boards" className={`my-9 mx-0`}>
          <svg width="153" height="26" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path
                d="M44.56 25v-5.344l1.92-2.112L50.928 25h5.44l-6.304-10.432 6.336-7.04h-5.92l-5.92 6.304V.776h-4.8V25h4.8Zm19.36.384c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM81.968 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Zm24.16.384c1.707 0 3.232-.405 4.576-1.216a8.828 8.828 0 0 0 3.184-3.296c.779-1.387 1.168-2.923 1.168-4.608 0-1.707-.395-3.248-1.184-4.624a8.988 8.988 0 0 0-3.2-3.28c-1.344-.81-2.848-1.216-4.512-1.216-2.112 0-3.787.619-5.024 1.856V.776h-4.8V25h4.48v-1.664c.619.661 1.392 1.168 2.32 1.52a8.366 8.366 0 0 0 2.992.528Zm-.576-4.32c-1.301 0-2.363-.443-3.184-1.328-.821-.885-1.232-2.043-1.232-3.472 0-1.408.41-2.56 1.232-3.456.821-.896 1.883-1.344 3.184-1.344 1.323 0 2.41.453 3.264 1.36.853.907 1.28 2.053 1.28 3.44 0 1.408-.427 2.56-1.28 3.456-.853.896-1.941 1.344-3.264 1.344Zm17.728 4.32c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM141.328 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Z"
                className="fill-magnumGrey dark:fill-light"
                fillRule="nonzero"
              />
              <g transform="translate(0 1)" fill="#635FC7">
                <rect width="6" height="25" rx="2" />
                <rect opacity=".75" x="9" width="6" height="25" rx="2" />
                <rect opacity=".5" x="18" width="6" height="25" rx="2" />
              </g>
            </g>
          </svg>
          <div id="boards" className="my-16">
            <h4 className="dark:text-platinum">ALL BOARDS ({boards.length})</h4>
            {boards.map((boardName, i) => (
              <div key={i} className="flex items-center mb-1">
                <Link
                  href={`/${boardName.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={async () => {
                    setLoading(true);
                    setMobileSidebarHide(true);

                    let columnsData = await fetchABoardsDetails(boardName);
                    let taskData = await fetchTasksData(boardName);

                    setLoading(false);

                    setCurrentBoard(boardName);
                    setBoardColumns(columnsData);
                    setTasks(taskData);
                  }}
                  className={`group text-left border-0 rounded-r-full ${
                    currentBoard === boardName
                      ? "bg-darkerPurple text-light"
                      : "text-darkPurple dark:text-platinum hover:bg-darkPurple hover:text-light"
                  }  block w-[215px] py-2 pl-6 -ml-6 flex items-center`}
                >
                  <svg
                    width="16"
                    height="16"
                    className={`${
                      currentBoard === boardName
                        ? "fill-light"
                        : "fill-darkPurple dark:fill-platinum group-hover:fill-light"
                    } `}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                  </svg>
                  <span className="block ml-6 text-lg font-medium">
                    {boardName}
                  </span>
                </Link>
              </div>
            ))}
            <button
              className="group flex items-center block py-2 pl-6 -ml-6 w-full bg-inherit font-bold text-left text-platinum dark:text-lightPurple hover:text-grey dark:hover:text-light"
              onClick={openBoardModal}
            >
              <svg
                width="16"
                height="16"
                className="fill-lightPurple group-hover:fill-light"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
              </svg>{" "}
              <span className="block ml-5 text-lg font-medium">
                + Create new boards{" "}
              </span>
            </button>
          </div>
        </div>
        <div className="my-12">
          <button
            className={`bg-greyBlue dark:bg-grey hover:bg-magnumGrey hover:text-white border-0 rounded-full p-1 w-full text-grey dark:text-light`}
            onClick={hideSidebar}
          >
            <i className="fa-regular fa-eye-slash mr-2"></i> Hide sidebar
          </button>
        </div>
        {!sidebar && (
          <button
            className={`absolute bottom-16 -right-[42px] bg-darkPurple text-white hover:bg-darkerPurple my-6 px-4 py-3 rounded-r-full rounded-l-none`}
            onClick={() => {
              setMobileSidebarHide(false);
              showSidebar();
            }}
          >
            <i className="fa-regular fa-eye fa-lg"></i>
          </button>
        )}
      </aside>
      <div
        className={`${
          sidebar && !mobileSidebarHide ? "block md:hidden" : "hidden"
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
