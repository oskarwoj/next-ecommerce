"use client";

import Cart from "@/components/Cart";
import { useCartStore } from "@/store/store";
import { ShoppingBag } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Nav: React.FC<Session> = ({ user }) => {
  const cartStore = useCartStore();

  return (
    <nav className="flex justify-between items-center py-12">
      <Link href="/">
        <h1>Back</h1>
      </Link>
      <ul className="flex items-center gap-12">
        <li className="flex items-center text-3xl relative cursor-pointer">
          <ShoppingBag />
          <span className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
            {cartStore.cart.length}
          </span>
        </li>
        {user ? (
          <li>
            <Image
              src={user?.image as string}
              alt={user.name as string}
              width={36}
              height={36}
              className="rounded-full"
            />
          </li>
        ) : (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
      </ul>
      {cartStore.isOpen && <Cart />}
    </nav>
  );
};

export default Nav;
