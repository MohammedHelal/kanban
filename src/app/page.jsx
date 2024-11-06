import Sidebar from "./layout/Sidebar";
import Board from "../components/Board";
import ModalsContainer from "../util/ModalsContainer";
import { fetchBoardData } from "../util/server-actions";

export default async function Home() {
  const boardData = await fetchBoardData();

  return (
    <>
      <ModalsContainer />
      <Sidebar boardData={boardData} />
      <Board />
    </>
  );
}
