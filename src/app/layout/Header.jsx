"use client";

import { useContext, useState } from "react";
import { ModalContext } from "@/src/store/modal-context";
import { BoardTaskContext } from "@/src/store/board-task-context";
import { fetchABoardsDetails } from "@/src/util/server-actions";
import more from "@/src/assets/icon-vertical-ellipsis.svg";
import logo from "@/src/assets/logo-dark.svg";
import logoMobile from "@/src/assets/logo-mobile.svg";
import cross from "@/src/assets/icon-cross.svg";

import Image from "next/image";

function Header() {
  const { loading, openTaskModal, openBoardModal, openDeleteBoardModal } =
    useContext(ModalContext);
  const { currentBoard, setEditBoard } = useContext(BoardTaskContext);
  const [dropDown, setDropDown] = useState(false);

  return (
    <header
      className={`absolute left-0 right-0 w-full h-[88.6px] p-0 flex items-center shadow-lg bg-white z-10`}
    >
      <div className="hidden md:flex items-center w-[250px] h-full border-r-[1px] border-greyBlue">
        <Image src={logo} className="ml-[20px] mb-[5px]" alt="Logo" priority />
      </div>
      <div className="md:hidden flex items-center px-[20px] h-full border-r-[1px] border-greyBlue">
        <Image src={logoMobile} className="" alt="Logo" priority />
      </div>
      <div
        className={`w-full md:w-[calc(100vw-250px)] navbar m-trans p-6 flex items-center justify-between`}
      >
        <h1 className="w-[50px] md:w-auto">{currentBoard}</h1>
        <div className="relative flex justify-between items-center min-w-1/5">
          {currentBoard && (
            <>
              <button
                className="btn-primary L lg:mr-6"
                onClick={() => openTaskModal(true)}
              >
                + Add New Task
              </button>
              <Image
                src={dropDown ? cross : more}
                className="mx-3 mr-0 cursor-pointer"
                alt="drop down menu"
                onClick={() => setDropDown((prevState) => !prevState)}
              />
            </>
          )}
          {dropDown && (
            <>
              <ul className="absolute top-[40px] right-[5px] bg-magnumGrey p-3 shadow-2xl shadow-slate-800 rounded-lg z-20">
                <li>
                  <a
                    className="group block w-full py-1 px-6 text-left rounded-t-lg hover:bg-platinum text-white cursor-pointer"
                    onClick={async () => {
                      let columnsData = await fetchABoardsDetails(currentBoard);

                      setDropDown(false);
                      openBoardModal();
                      setEditBoard({
                        board: currentBoard,
                        columns: columnsData,
                      });
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square ml-auto p-3 rounded-full text-darkPurple group-hover:text-white cursor-pointer"></i>{" "}
                    Edit Board
                  </a>
                </li>
                <hr className="" />
                <li>
                  <a
                    className="group block w-full py-1 px-6 rounded-b-lg text-left hover:bg-orange text-white cursor-pointer"
                    onClick={() => {
                      setDropDown(false);
                      openDeleteBoardModal();
                    }}
                  >
                    <i className="fa-solid fa-trash ml-auto p-3 rounded-full text-darkPurple group-hover:text-white cursor-pointer"></i>{" "}
                    Delete Board
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
