"use client";
import { SidebarContext } from "@/src/store/sidebar-context";
import { useContext } from "react";

function BoardWrapper({ children }) {
  const { sidebar } = useContext(SidebarContext);

  return (
    <main
      className={`m-trans h-screen scroll-auto overflow-auto ${
        sidebar ? `md:ml-[250px]` : "ml-0"
      } scroll-m-0 bg-greyBlue dark:bg-magnumGrey`}
    >
      <div
        className={`relative p-6 pt-[100px] flex min-h-full ${
          sidebar && "min-w-[calc(100vw - 300px)]"
        }`}
      >
        {children}
      </div>
    </main>
  );
}

export default BoardWrapper;
