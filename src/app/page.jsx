import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Main from "../components/Main";
import MainContainer from "./MainContainer";
import ModalsContainer from "../util/ModalsContainer";
import {
  fetchBoardDetails,
  fetchBoardsData,
  fetchTaskData,
  fetchSubTaskData,
} from "../lib/data";
import { changeSubtaskStatus, changetaskColumn } from "../lib/actions";

export default async function Home() {
  const boardData = await fetchBoardsData();

  return (
    <>
      <Header />
      <ModalsContainer
        changeSubtasksStatus={changeSubtasksStatus}
        fetchSubTasksData={fetchSubTasksData}
        changeTasksColumn={changeTasksColumn}
        fetchTasksData={fetchTasksData}
        fetchABoardsDetails={fetchABoardsDetails}
      />
      <MainContainer>
        <Sidebar
          fetchABoardsDetails={fetchABoardsDetails}
          boardData={boardData}
          fetchTasksData={fetchTasksData}
        />
        <Main fetchSubTasksData={fetchSubTasksData} />
      </MainContainer>
    </>
  );
}

async function fetchABoardsDetails(boardName) {
  "use server";

  let data = await fetchBoardDetails(boardName);
  return data;
}

async function fetchTasksData(boardName) {
  "use server";

  let data = await fetchTaskData(boardName);
  return data;
}

async function fetchSubTasksData(taskId) {
  "use server";

  let data = await fetchSubTaskData(taskId);
  return data;
}

async function changeSubtasksStatus(id, status) {
  "use server";
  await changeSubtaskStatus(id, status);
}

async function changeTasksColumn(columnId, taskId) {
  "use server";
  await changetaskColumn(columnId, taskId);
}
