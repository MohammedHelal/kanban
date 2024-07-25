import { sql } from "@vercel/postgres";

export async function fetchBoardInfo(boardName) {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    //await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(boardName);

    const data =
      await sql`SELECT * FROM boards WHERE board_name='${boardName}'`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch board info.");
  }
}
