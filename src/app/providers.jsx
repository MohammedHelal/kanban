"use client";

import SidebarContextProvider from "../store/sidebar-context";
import ModalContextProvider from "../store/modal-context";
import BoardTaskContextProvider from "../store/board-task-context";
import useSidebarClasses from "../util/useSidebarClasses";

import "./globals.css";

function Providers({ children }) {
  const sidebar = useSidebarClasses(true);

  return (
    <SidebarContextProvider>
      <ModalContextProvider>
        <BoardTaskContextProvider>{children}</BoardTaskContextProvider>
      </ModalContextProvider>
    </SidebarContextProvider>
  );
}

export default Providers;
