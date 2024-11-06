"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/");
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
      if (/new/.exec(columns[i].id)) {
        await sql`
        INSERT INTO boards (column_name, board_name)
        VALUES (${columns[i].columnName}, ${title})
      `;
      } else if (
        columns[i].columnName &&
        !/delete/.exec(columns[i].columnName)
      ) {
        await sql`
          UPDATE boards
          SET column_name=${columns[i].columnName}, 
              board_name=${title}
          WHERE column_id=${columns[i].id}
        `;
      } else if (/delete/.exec(columns[i].columnName)) {
        await sql`
          DELETE FROM boards
          WHERE column_id=${columns[i].id}
        `;
      }
    }
    revalidatePath("/");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create board.", error);
  }
}

export async function deleteBoard(boardName, columns, tasks) {
  try {
    for (let i = 0; i < tasks.length; i++) {
      const id = tasks[i]["task_id"];
      //await sql`DELETE FROM subtasks WHERE task_id=${id}`;
    }

    for (let i = 0; i < columns.length; i++) {
      const id = columns[i]["column_id"];
      //await sql`DELETE FROM tasks WHERE column_id=${id}`;
    }
    console.log("board deletion disabled for now!");
    //await sql`DELETE FROM boards WHERE board_name=${boardName}`;
    revalidatePath("/");
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
          INSERT INTO subtasks (subtask_title, is_completed, task_id)
          VALUES (${subtasks[i]["subtask_title"]}, ${subtasks[i]["is_completed"]}, ${taskId.rows[0]["task_id"]})
        `;
      }
    }
    revalidatePath("/");
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
              is_completed=${subtasks[i]["is_completed"]}
          WHERE subtask_id=${subtasks[i]["subtask_id"]}
        `;
      } else if (/delete/.exec(subtasks[i]["subtask_title"])) {
        await sql`
          DELETE FROM subtasks
          WHERE subtask_id=${subtasks[i]["subtask_id"]}
        `;
      }
    }
    revalidatePath("/");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update task", error);
  }
}

export async function changeSubtaskStatus(subtaskId, subtaskStatus, taskId) {
  try {
    await sql`
      UPDATE subtasks SET is_completed=${!subtaskStatus} WHERE subtask_id=${subtaskId}`;
    console.log(subtaskStatus, taskId);

    if (!subtaskStatus) {
      await sql`
        UPDATE tasks SET no_of_completed_subtasks=no_of_completed_subtasks+1 WHERE task_id=${taskId}`;
    } else {
      await sql`
        UPDATE tasks SET no_of_completed_subtasks= no_of_completed_subtasks-1 WHERE task_id=${taskId}`;
    }

    //no_of_completed_subtasks
    revalidatePath("/");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update subtask status", error);
  }
}

export async function changetaskColumn(columnId, taskId) {
  try {
    await sql`
    UPDATE tasks SET column_id=${columnId} WHERE task_id=${taskId}`;
    revalidatePath("/");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update task column", error);
  }
}

export async function deleteTask(taskId) {
  try {
    await sql`DELETE FROM subtasks WHERE task_id=${taskId}`;

    await sql`DELETE FROM tasks WHERE task_id=${taskId}`;

    revalidatePath("/");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update task", error);
  }
}
