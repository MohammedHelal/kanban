"use client";

import { useContext } from "react";
import { SidebarContext } from "../store/sidebar-context";

function useSidebarClasses({ main }) {
  const { sidebar } = useContext(SidebarContext);

  return sidebar ? `md:ml-[250px] ${main ? "rounded-lg" : ""}` : "ml-0";
}

export default useSidebarClasses;
