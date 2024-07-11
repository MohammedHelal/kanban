"use client";

import useSidebarClasses from "../util/useSidebarClasses";

function MainContainer({ children }) {
  const sidebar = useSidebarClasses(true);

  return (
    <main className={`m-trans ${sidebar} scroll-m-0 bg-greyBlue`}>
      {children}
    </main>
  );
}

export default MainContainer;
