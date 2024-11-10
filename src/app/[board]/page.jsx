"use client";
import Board from "./Board";
import Header from "./Header";
import LoadingSkeleton from "@/src/ui/LoadingSkeleton";

import { useContext } from "react";
import { BoardTaskContext } from "../store/board-task-context";

export default function Page() {
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
