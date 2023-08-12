import type { Metadata } from "next";

import Nav from "@/components/Nav";

import Hydrate from "@/components/Hydrate";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";

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
    <html lang="en">
      <body className="mx-64">
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
