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
  const cartStore = useCartStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
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
      <h1>Total: {formatPrice(cartStore.totalAmount())} </h1>
      <button id="submit" disabled={isLoading || !stripe || !elements}>
        <span id="button-text">{isLoading ? "Loading..." : "Pay now"}</span>
      </button>
    </form>
  );
};

export default CheckoutForm;
