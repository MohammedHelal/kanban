import { auth } from "@/auth";
import { fetchBoardData } from "@/src/lib/server-actions";

import Sidebar from "./Sidebar";

async function Layout({ children }) {
  const boardData = await fetchBoardData();
  const session = await auth();

  return (
    <>
      <Sidebar boardData={boardData} user={session?.user} />
      {children}
    </>
  );
}

export default Layout;
