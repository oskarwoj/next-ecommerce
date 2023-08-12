import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "cart-store", storage: createJSONStorage(() => localStorage) }
  )
);
