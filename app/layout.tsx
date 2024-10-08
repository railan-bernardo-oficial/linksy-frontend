import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linksy",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      data-lt-installed="true">
      <body 
      data-new-gr-c-s-check-loaded="14.1115.0"
      data-gr-ext-installed
      cz-shortcut-listen="true"
      className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
