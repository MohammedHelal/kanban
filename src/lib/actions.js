"use server";
import { sql } from "@vercel/postgres";

export async function createBoard(obj, FormData) {
  console.time("Triggered action");

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

  console.timeEnd("Triggered action");
}
