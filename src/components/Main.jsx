"use client";

import { useContext } from "react";
import { BoardTaskContext } from "../store/board-task-context";
import LoadingSkeleton from "./LoadingSkeleton";
import Board from "./Board";

function Main() {
  const { loading } = useContext(BoardTaskContext);

  return <>{loading ? <LoadingSkeleton /> : <Board />}</>;
}

export default Main;
