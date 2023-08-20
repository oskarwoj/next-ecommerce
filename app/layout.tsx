import type { Metadata } from "next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Lobster, Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Hydrate from "@/components/Hydrate";
import Nav from "@/components/Nav";

import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const lobster = Lobster({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata: Metadata = {
  title: "Dieta by Alicja",
  description: "Created by Oskar",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className={`${roboto.variable} ${lobster.variable}`}>
      <Hydrate>
        <Toaster />
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
