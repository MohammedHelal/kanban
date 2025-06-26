"use server";

import {
  fetchBoardDetails,
  fetchBoardsData,
  fetchTaskData,
  fetchTaskOfColumnData,
  fetchSubTaskData,
  fetchUsersData,
  authenticateUser,
} from "./data";
import { changeSubtaskStatus, changetaskColumn } from "./actions";

export async function fetchBoardData() {
  "use server";

  let data = await fetchBoardsData();
  return data;
}

export async function fetchUserData() {
  "use server";

  let data = await fetchUsersData();
  return data;
}

export async function authenticateUserData(email, pwd) {
  "use server";

  let data = await authenticateUser(email, pwd);
  return data;
}

export async function fetchABoardsDetails(boardName) {
  "use server";

  let data = await fetchBoardDetails(boardName);
  return data;
}

export async function fetchTasksData(boardName) {
  "use server";

  let data = await fetchTaskData(boardName);
  return data;
}

export async function fetchTasksOfColumnData(columnId) {
  "use server";

  let data = await fetchTaskOfColumnData(columnId);
  return data;
}

export async function fetchSubTasksData(taskId) {
  "use server";

  let data = await fetchSubTaskData(taskId);
  return data;
}

export async function changeSubtasksStatus(id, status, taskId) {
  "use server";
  await changeSubtaskStatus(id, status, taskId);
}

export async function changeTasksColumn(columnId, taskId) {
  "use server";
  await changetaskColumn(columnId, taskId);
}
