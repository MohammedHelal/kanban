"use client";

import { useContext } from "react";
import { BoardTaskContext } from "../store/board-task-context";
import Header from "../app/layout/Header";
import LoadingSkeleton from "./LoadingSkeleton";
import Board from "./Board";

function Main() {
  const { loading } = useContext(BoardTaskContext);

  return (
    <>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <Header />
          <Board />
        </>
      )}
    </>
  );
}

export default Main;
