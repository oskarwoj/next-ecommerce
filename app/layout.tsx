import type { Metadata } from "next";

import Nav from "@/app/components/Nav";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  console.log("session", session);
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
