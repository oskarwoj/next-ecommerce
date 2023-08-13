"use client";

import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Cart from "@/components/Cart";
import { useCartStore } from "@/hooks/store";
import { AnimatePresence, motion } from "framer-motion";

const Nav: React.FC<Session> = ({ user }) => {
  const pathname = usePathname();
  const cartStore = useCartStore();

  const isHomePage = pathname === "/";

  return (
    <nav>
      <div className="flex justify-between items-center py-12">
        <Link href="/">{!isHomePage && <ArrowLeft size={36} />}</Link>
        <ul className="flex items-center gap-12">
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
                  className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
                >
                  {cartStore.cart.length}
                </motion.span>
              </AnimatePresence>
            )}
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
        <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      </div>
    </nav>
  );
};

export default Nav;
