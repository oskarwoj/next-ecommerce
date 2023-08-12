import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  name: string;
  id: string;
  image?: string[];
  description?: string;
  unit_amount: number;
  quantity: number;
}

interface CartStore {
  isOpen: boolean;
  cart: CartItem[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
    }),
    { name: "cart-store" }
  )
);
