import Providers from "./providers";
import Script from "next/script";

import ModalsContainer from "../modals/ModalsContainer";

import "./globals.css";

export const metadata = {
  title: "Kanban",
  description: "A kanban board to organize projects and tasks",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="modal">
            <ModalsContainer />
          </div>
          <div id="root">{children}</div>
        </Providers>
        <Script
          src="https://kit.fontawesome.com/67979852c7.js"
          crossOrigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
