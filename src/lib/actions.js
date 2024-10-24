"use server";
import { sql } from "@vercel/postgres";

export async function createBoard(board) {
  const title = board.title;
  const columns = board.columns;
  try {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].columnName) {
        await sql`
        INSERT INTO boards (column_name, board_name)
        VALUES (${columns[i].columnName}, ${title})
      `;
      }
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create board.", error);
  }
}

//currently in progress of writing code for updateBoard func
export async function updateBoard(board) {
  const title = board.title;
  const columns = board.columns;
  try {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].columnName) {
        await sql`
        INSERT INTO boards (column_name, board_name)
        VALUES (${columns[i].columnName}, ${title})
      `;
      }
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create board.", error);
  }
}

export async function createTask(task, boardName) {
  try {
    await sql`
        INSERT INTO tasks (task_title, description, column_id, board_name, no_of_completed_subtasks, no_of_subtasks)
        VALUES (${task.title}, ${task.description}, ${task.columnId}, ${boardName}, 0, ${task.subtasks.length})
      `;

    const taskId =
      await sql`SELECT task_id FROM tasks WHERE task_title=${task.title} AND column_id=${task.columnId}`;

    const subtasks = task.subtasks;
    for (let i = 0; i < subtasks.length; i++) {
      if (subtasks[i]["subtask_title"]) {
        await sql`
          INSERT INTO subtasks (subtask_title, status, task_id)
          VALUES (${subtasks[i]["subtask_title"]}, ${subtasks[i].status}, ${taskId.rows[0].task_id})
        `;
      }
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create task.", error);
  }
}

export async function updateTask(task) {
  try {
    await sql`
        UPDATE tasks 
        SET task_title = ${task.title}, 
            description = ${task.description}, 
            column_id = ${task.columnId},
            no_of_completed_subtasks = ${task.completeNo}, 
            no_of_subtasks = ${task.subtasks.length}
        WHERE task_id=${task.id}
      `;

    const subtasks = task.subtasks;
    for (let i = 0; i < subtasks.length; i++) {
      if (
        subtasks[i]["subtask_title"] &&
        !/delete/.exec(subtasks[i]["subtask_title"])
      ) {
        await sql`
          UPDATE subtasks 
          SET subtask_title=${subtasks[i]["subtask_title"]}, 
              status=${subtasks[i].status}
          WHERE subtask_id=${subtasks[i]["subtask_id"]}
        `;
      } else if (/delete/.exec(subtasks[i]["subtask_title"])) {
        await sql`
          DELETE FROM subtasks
          WHERE subtask_id=${subtasks[i]["subtask_id"]}
        `;
      }
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update task", error);
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
    await sql`
    UPDATE tasks SET column_id=${columnId} WHERE task_id=${taskId}`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update task column", error);
  }
}
