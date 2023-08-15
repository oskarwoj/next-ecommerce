import { AddCartType } from "@/types/AddCartTypes";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  cart: AddCartType[];
  isOpen: boolean;
  onCheckout: string;
  totalAmount: () => number;
  clearCart: () => void;
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  paymentIntent: string;
  setPaymentIntent: (val: string) => void;
  setCheckout: (val: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,
      paymentIntent: "",
      onCheckout: "cart",
      totalAmount: () => {
        const currentItems = get().cart;
        return currentItems.reduce((acc, item) => {
          return acc + (item.unit_amount ?? 0) * item.quantity;
        }, 0);
      },
      clearCart: () => set((state) => ({ cart: [] })),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (product) => {
        const currentItems = get().cart;
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          toast.success("Updated item quantity");
          const updatedCart = currentItems.map((cartItem) => {
            if (cartItem.id === product.id) {
              return { ...cartItem, quantity: (cartItem.quantity || 1) + 1 };
            }
            return cartItem;
          });
          return set({ cart: updatedCart });
        } else {
          toast.success("Item added to cart.");
          set({ cart: [...currentItems, { ...product, quantity: 1 }] });
        }
      },
      removeProduct: (product) => {
        const currentItems = get().cart;
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        );

        if (existingItem && existingItem.quantity > 1) {
          toast.success("Updated item quantity");
          const updatedCart = currentItems.map((cartItem) => {
            if (cartItem.id === product.id) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
          });
          return set({ cart: updatedCart });
        } else {
          toast.success("Item removed from cart.");
          set({
            cart: currentItems.filter((item) => item.id !== product.id),
          });
        }
      },
      setPaymentIntent: (val) => set((state) => ({ paymentIntent: val })),
      setCheckout: (val) => set((state) => ({ onCheckout: val })),
    }),
    { name: "cart-store" }
  )
);
