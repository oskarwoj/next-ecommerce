import { AddCartType } from "@/types/AddCartTypes";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (product) => {
        const currentItems = get().cart;
        const existingItemIndex = currentItems.findIndex(
          (item) => product.id === item.id
        );

        if (existingItemIndex !== -1) {
          toast.success("Item added to cart.");
          const updatedCart = [...currentItems];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: (updatedCart[existingItemIndex]?.quantity ?? 1) + 1,
          };
          set({ cart: updatedCart });
        } else {
          toast.success("Item added to cart.");
          set({ cart: [...get().cart, { ...product, quantity: 1 }] });
        }
      },
      removeProduct: (item) => {},
    }),
    { name: "cart-store" }
  )
);
