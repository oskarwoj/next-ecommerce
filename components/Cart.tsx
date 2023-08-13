"use client";

import Image from "next/image";

import { useCartStore } from "@/hooks/store";
import basket from "@/public/basket.png";
import { formatPrice } from "@/util/formatPrice";
import { AnimatePresence, motion } from "framer-motion";
import { MinusCircle, PlusCircle } from "lucide-react";

const Cart = () => {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + (item.unit_amount ?? 0) * item.quantity;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-full lg:w-2/5 overflow-y-auto h-screen p-12 text-gray-700"
      >
        <button
          onClick={() => cartStore.toggleCart()}
          className="text-sm font-bold pb-12"
        >
          Back to store 🏃‍♂️
        </button>
        {cartStore.cart.map((item) => (
          <motion.div layout key={item.id} className="flex py-4 gap-4">
            <Image
              className="rounded-md h-23 object-cover"
              src={item.image}
              width={120}
              height={120}
              alt={item.name}
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>
                <button
                  onClick={() =>
                    cartStore.removeProduct({
                      id: item.id,
                      name: item.name,
                      quantity: item.quantity,
                      unit_amount: item.unit_amount,
                      image: item.image,
                    })
                  }
                >
                  <MinusCircle />
                </button>
                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      name: item.name,
                      quantity: item.quantity,
                      unit_amount: item.unit_amount,
                      image: item.image,
                    })
                  }
                >
                  <PlusCircle />
                </button>
              </div>
              <p className="text-sm">{formatPrice(item.unit_amount)}</p>
            </div>
          </motion.div>
        ))}

        {!cartStore.cart.length ? (
          <AnimatePresence>
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium opacity-75 mt-12"
            >
              <h1>Your cart is empty 😢</h1>
              <Image src={basket} width={200} height={200} alt="basket" />
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
              Checkout
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cart;
