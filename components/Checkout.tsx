"use client";

import { useCartStore } from "@/hooks/store";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = () => {
  const cartStore = useCartStore();
  const router = useRouter();
  const [, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          return router.push("/api/auth/signin");
        } else return res.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setClientSecret(data.client_secret);
        cartStore.setPaymentIntent(data.id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Checkout</div>;
};

export default Checkout;
