import SidebarContextProvider from "../store/sidebar-context";
import ModalContextProvider from "../store/modal-context";
import BoardTaskContextProvider from "../store/board-task-context";
import UserContextProvider from "../store/user-context";

import "./globals.css";

function Providers({ children }) {
  return (
    <UserContextProvider>
      <SidebarContextProvider>
        <ModalContextProvider>
          <BoardTaskContextProvider>{children}</BoardTaskContextProvider>
        </ModalContextProvider>
      </SidebarContextProvider>
    </UserContextProvider>
  );
}

export default Providers;
