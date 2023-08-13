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
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          toast.success("Updated item quantity");
          return currentItems.map((cartItem) => {
            if (cartItem.id === product.id) {
              set({
                cart: [
                  {
                    ...cartItem,
                    quantity: (cartItem.quantity ?? 1) + 1,
                  },
                ],
              });
            }
          });
        } else {
          toast.success("Item added to cart.");
          set({ cart: [...currentItems, { ...product, quantity: 1 }] });
        }
      },
      removeProduct: (item) => {},
    }),
    { name: "cart-store" }
  )
);
