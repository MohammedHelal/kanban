import Sidebar from "./layout/Sidebar";
import Board from "../components/Board";
import Header from "./layout/Header";
import ModalsContainer from "../util/ModalsContainer";
import { fetchBoardData } from "../util/server-actions";

export default async function Home() {
  const boardData = await fetchBoardData();

  return (
    <>
      <Header />
      <Sidebar boardData={boardData} />
      <Board />
      <ModalsContainer />
    </>
  );
}
