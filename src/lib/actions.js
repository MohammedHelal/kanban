"use server";
import { sql } from "@vercel/postgres";

export async function createBoard(obj, FormData) {
  let title = obj.title;
  let columns = obj.columns;

  for (let i = 0; i < columns.length; i++) {
    if (columns[i].current) {
      await sql`
        INSERT INTO boards (column_name, board_name)
        VALUES (${columns[i].current}, ${title})
      `;
    }
  }
}

export async function createTask(obj, boardName) {
  try {
    const columnId =
      await sql`SELECT column_id FROM boards WHERE board_name=${boardName} AND column_name=${obj.status}`;

    await sql`
        INSERT INTO tasks (task_title, description, column_id, board_name, no_of_completed_subtasks, no_of_subtasks)
        VALUES (${obj.title}, ${obj.description}, ${columnId.rows[0].column_id}, ${boardName}, 0, ${obj.subtasks.length})
      `;

    const taskId =
      await sql`SELECT task_id FROM tasks WHERE task_title=${obj.title} AND column_id=${columnId.rows[0].column_id}`;

    let subtasks = obj.subtasks;
    for (let i = 0; i < subtasks.length; i++) {
      if (subtasks[i].current) {
        await sql`
          INSERT INTO subtasks (subtask_title, status, task_id)
          VALUES (${subtasks[i].current}, ${subtasks[i].status}, ${taskId.rows[0].task_id})
        `;
      }
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch board info.");
  }
}

export async function changeSubtaskStatus(subtaskId, subtaskStatus) {
  try {
    await sql`
    UPDATE subtasks SET status=${subtaskStatus} WHERE subtask_id=${subtaskId}`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update subtask status", error);
  }
}

export async function changetaskColumn(columnId, taskId) {
  try {
    console.log(columnId, taskId);
    await sql`
    UPDATE tasks SET column_id=${columnId} WHERE task_id=${taskId}`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update subtask status", error);
  }
}
