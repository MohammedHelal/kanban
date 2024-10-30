import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Main from "../components/Main";
import MainContainer from "./MainContainer";
import ModalsContainer from "../util/ModalsContainer";
import {
  fetchBoardDetails,
  fetchBoardsData,
  fetchTaskData,
  fetchTaskOfColumnData,
  fetchSubTaskData,
} from "../lib/data";
import { changeSubtaskStatus, changetaskColumn } from "../lib/actions";

export default async function Home() {
  const boardData = await fetchBoardData();

  return (
    <>
      <Header />
      <ModalsContainer
        changeSubtasksStatus={changeSubtasksStatus}
        fetchSubTasksData={fetchSubTasksData}
        changeTasksColumn={changeTasksColumn}
        fetchTasksData={fetchTasksData}
        fetchTasksOfColumnData={fetchTasksOfColumnData}
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

async function fetchBoardData() {
  "use server";

  let data = await fetchBoardsData();
  return data;
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

async function fetchTasksOfColumnData(columnId) {
  "use server";

  let data = await fetchTaskOfColumnData(columnId);
  return data;
}

async function fetchSubTasksData(taskId) {
  "use server";

  let data = await fetchSubTaskData(taskId);
  return data;
}

async function changeSubtasksStatus(id, status, taskId) {
  "use server";
  await changeSubtaskStatus(id, status, taskId);
}

async function changeTasksColumn(columnId, taskId) {
  "use server";
  await changetaskColumn(columnId, taskId);
}
