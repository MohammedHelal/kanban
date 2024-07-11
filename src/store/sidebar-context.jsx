"use client";

import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const SidebarContext = createContext(true);

export default function SidebarContextProvider({ children }) {
  // used for showing and hiding the sidebar
  const [sidebar, setSidebar] = useState(true);

  const hideSidebar = () => setSidebar(false);
  const showSidebar = () => setSidebar(true);

  const sidebarCtx = {
    sidebar,
    hideSidebar,
    showSidebar,
  };

  return (
    <SidebarContext.Provider value={sidebarCtx}>
      {children}
    </SidebarContext.Provider>
  );
}

SidebarContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
