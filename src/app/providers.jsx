import SidebarContextProvider from "../store/sidebar-context";
import ModalContextProvider from "../store/modal-context";
import BoardTaskContextProvider from "../store/board-task-context";

import "./globals.css";

function Providers({ children }) {
  return (
    <SidebarContextProvider>
      <ModalContextProvider>
        <BoardTaskContextProvider>{children}</BoardTaskContextProvider>
      </ModalContextProvider>
    </SidebarContextProvider>
  );
}

export default Providers;
