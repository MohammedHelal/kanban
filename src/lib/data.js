import { sql } from "@vercel/postgres";

export async function fetchBoardsData() {
  try {
    const boardData = await sql`SELECT * FROM boards`;
    return boardData.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch board info.");
  }
}

export async function fetchBoardDetails(boardName) {
  try {
    const boardDetailData =
      await sql`SELECT * FROM boards WHERE board_name=${boardName}`;

    return boardDetailData.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch board info.");
  }
}

export async function fetchTaskData(boardName) {
  try {
    const taskData =
      await sql`SELECT * FROM tasks WHERE board_name=${boardName}`;

    return taskData.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch board info.");
  }
}

export async function fetchSubTaskData(taskId) {
  try {
    const subtaskData =
      await sql`SELECT * FROM subtasks WHERE task_id=${taskId} ORDER BY subtask_id ASC`;

    return subtaskData.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch board info.");
  }
}
