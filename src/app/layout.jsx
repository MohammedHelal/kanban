import Providers from "./providers";

import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
