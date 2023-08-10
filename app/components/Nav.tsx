"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Nav: React.FC<Session> = ({ user }) => {
  return (
    <nav>
      <h1>Nav</h1>
      <ul>
        <li>Products</li>
        {user ? (
          <li>
            <Image
              src={user?.image as string}
              alt={user.name as string}
              width={48}
              height={48}
            />
          </li>
        ) : (
          <li>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
