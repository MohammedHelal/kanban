import Providers from "./providers";

import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="modal"></div>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
        <Script
          src="https://kit.fontawesome.com/67979852c7.js"
          crossOrigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
