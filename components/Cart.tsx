"use client";

import { useCartStore } from "@/store/store";

const Cart = () => {
  const cartStore = useCartStore();
  console.log("cartStore.", cartStore.isOpen);
  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
