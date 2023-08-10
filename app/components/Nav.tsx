"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Nav: React.FC<Session> = ({ user }) => {
  return (
    <nav className="flex justify-between items-center py-8">
      <h1>Nav</h1>
      <ul className="flex items-center gap-12">
        {user ? (
          <>
            <li>
              <Image
                src={user?.image as string}
                alt={user.name as string}
                width={48}
                height={48}
                className="rounded-full"
              />
            </li>
          </>
        ) : (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
