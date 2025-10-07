import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // <-- 1. IMPORT THE NAVBAR

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RideShare App",
  description: "Built from scratch!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* <-- 2. ADD THE NAVBAR HERE */}
        <main className="p-4">{children}</main> {/* 3. Wrap children in a main tag */}
      </body>
    </html>
  );
}