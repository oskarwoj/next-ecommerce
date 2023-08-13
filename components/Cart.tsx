"use client";

import Image from "next/image";

import { useCartStore } from "@/hooks/store";
import { formatPrice } from "@/util/formatPrice";

const Cart = () => {
  const cartStore = useCartStore();

  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 text-gray-700"
      >
        <h1>Here&apos;s your cart📃</h1>
        {cartStore.cart.map((item) => (
          <div key={item.id} className="flex py-4 gap-4">
            <Image
              className="rounded-md h-23 object-cover"
              src={item.image}
              width={120}
              height={120}
              alt={item.name}
            />
            <div>
              <h2>{item.name}</h2>
              <h2>Quantity: {item.quantity}</h2>
              <p className="text-sm">{formatPrice(item.unit_amount)}</p>
            </div>
          </div>
        ))}
        <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
