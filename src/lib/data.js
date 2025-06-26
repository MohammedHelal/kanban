import { sql } from "@vercel/postgres";
import { saltAndHashPassword } from "../utils/password";
import { hash } from "bcryptjs";

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
    throw new Error("Failed to fetch board details.");
  }
}

export async function fetchTaskData(boardName) {
  try {
    const taskData =
      await sql`SELECT * FROM tasks WHERE board_name=${boardName}`;

    return taskData.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch task info.");
  }
}

export async function fetchTaskOfColumnData(columnId) {
  try {
    const taskData = await sql`SELECT * FROM tasks WHERE column_id=${columnId}`;

    return taskData.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch task info.");
  }
}

export async function fetchSubTaskData(taskId) {
  try {
    const subtaskData =
      await sql`SELECT * FROM subtasks WHERE task_id=${taskId} ORDER BY subtask_id ASC`;

    return subtaskData.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subtask info.");
  }
}

export async function fetchUsersData() {
  try {
    const user = await sql`SELECT * FROM users`;

    return user.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users info.");
  }
}

export async function authenticateUser(email, pwd) {
  try {
    const userArray = await sql`SELECT * FROM users WHERE email=${email}`;
    let user;

    if (userArray.rows.length > 0) {
      for (let i = 0; i < userArray.rows.length; i++) {
        if (userArray.rows[i].salt) {
          user = userArray.rows[i];
          const salt = user.salt;
          const hashedPassword = await hash(pwd, salt);

          if (user.email === email && user.password === hashedPassword) {
            return user;
          } else {
            throw new Error("Password not correct");
          }
        }
      }
    }

    throw new Error("User not found!");
  } catch (error) {
    console.error("Database Error:", error);
  }
}
