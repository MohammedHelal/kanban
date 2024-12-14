import Providers from "./providers";
import Script from "next/script";
import Head from "next/head";

import Sidebar from "./layout/Sidebar";
import ModalsContainer from "../modals/ModalsContainer";

import { fetchBoardData } from "../lib/server-actions";

import "./globals.css";

export const metadata = {
  title: "Kanban",
  description: "A kanban board to organize projects and tasks",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({ children }) {
  const boardData = await fetchBoardData();

  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/logo.svg" type="image/x-icon" sizes="16x16">
      </Head>
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
