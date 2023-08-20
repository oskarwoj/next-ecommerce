"use client";

import { ShoppingBag } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Cart from "@/components/Cart";
import { useCartStore } from "@/hooks/store";
import { AnimatePresence, motion } from "framer-motion";
import DarkLight from "./DarkLight";

const Nav: React.FC<Session> = ({ user }) => {
  const pathname = usePathname();
  const cartStore = useCartStore();

  const isHomePage = pathname === "/";

  return (
    <nav>
      <div className="flex justify-between items-center py-12">
        <Link href="/">
          <h1 className="font-lobster text-xl">Styled</h1>
        </Link>
        <ul className="flex items-center gap-8">
          <li
            onClick={cartStore.toggleCart}
            className="flex items-center text-3xl relative cursor-pointer"
          >
            <ShoppingBag />
            {cartStore.cart.length > 0 && (
              <AnimatePresence>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
                >
                  {cartStore.cart.length}
                </motion.span>
              </AnimatePresence>
            )}
          </li>
          <DarkLight />
          {user ? (
            <li>
              <div className="dropdown dropdown-end cursor-pointer">
                <Image
                  src={user?.image as string}
                  alt={user.name as string}
                  width={36}
                  height={36}
                  className="rounded-full"
                  priority={true}
                  tabIndex={0}
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72"
                >
                  <Link
                    href={"/dashboard"}
                    className="hover:bg-base-300 p-4 rounded-md"
                    onClick={() => {
                      if (document.activeElement instanceof HTMLElement)
                        document.activeElement.blur();
                    }}
                  >
                    Orders
                  </Link>
                  <li
                    className="hover:bg-base-300 p-4 rounded-md"
                    onClick={() => {
                      signOut();
                      if (document.activeElement instanceof HTMLElement)
                        document.activeElement.blur();
                    }}
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
              <button onClick={() => signIn()}>Sign in</button>
            </li>
          )}
        </ul>
        <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      </div>
    </nav>
  );
};

export default Nav;
