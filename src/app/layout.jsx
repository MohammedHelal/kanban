import Providers from "./providers";
import Script from "next/script";

import Sidebar from "./layout/Sidebar";
import ModalsContainer from "../modals/ModalsContainer";

import { fetchBoardData } from "../lib/server-actions";

import "./globals.css";

export const metadata = {
  title: "Kanban",
  description: "A kanban board to organize projects and tasks",
  icons: {
    icon: "@/public/logo.svg",
  },
};

export default async function RootLayout({ children }) {
  const boardData = await fetchBoardData();

  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="modal">
            <ModalsContainer />
          </div>
          <div id="root">
            <Sidebar boardData={boardData} />
            {children}
          </div>
        </Providers>
        <Script
          src="https://kit.fontawesome.com/67979852c7.js"
          crossOrigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
