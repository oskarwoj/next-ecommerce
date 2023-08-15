"use client";

import { useCartStore } from "@/hooks/store";
import { formatPrice } from "@/util/formatPrice";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

interface CheckoutProps {
  clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity;
  }, 0);
  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout("success");
        }
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <h1 className="py-4 text-sm font-bold ">Total: {formattedPrice}</h1>
      <button
        className={`py-2 mt-4  w-full bg-teal-700 rounded-md text-white disabled:opacity-25`}
        id="submit"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">
          {isLoading ? <span>Processing 👀</span> : <span>Pay now 🔥</span>}
        </span>
      </button>
    </form>
  );
};

export default CheckoutForm;
