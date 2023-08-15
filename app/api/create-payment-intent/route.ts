import Stripe from "stripe";

import { AddCartType } from "@/types/AddCartTypes";
import { prismadb } from "@/util/prismadb";
import { Product } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + (item.unit_amount ?? 0) * item.quantity;
  }, 0);
  return totalPrice;
};

export async function POST(request: Request) {
  //Get user
  const userSession = await getSession();

  if (!userSession?.user) {
    return new NextResponse("Not logged in", { status: 403 });
  }

  // Extract the data from the body
  const body = await request.json();
  const { items, payment_intent_id } = body;

  const orderData = {
    //@ts-ignore
    user: { connect: { id: userSession.user?.id } },
    amount: calculateOrderAmount(items),
    currency: "pln",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item: Product) => ({
        name: item.name,
        description: item.description ?? null,
        unit_amount: parseFloat(item.unit_amount.toString()),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  const total = calculateOrderAmount(items);

  //Check if the payment intent exists just update the order
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );
      //Fetch order with product ids
      const [existing_order] = await Promise.all([
        prismadb.order.findFirst({
          where: { paymentIntentID: updated_intent.id },
          include: { products: true },
        }),
        prismadb.order.update({
          where: { paymentIntentID: updated_intent.id },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item: Product) => ({
                name: item.name,
                description: item.description ?? null,
                unit_amount: parseFloat(item.unit_amount.toString()),
                image: item.image,
                quantity: item.quantity,
              })),
            },
          },
        }),
      ]);

      if (!existing_order) {
        return new NextResponse("Invalid Payment Intent", { status: 200 });
      }
      return new NextResponse(JSON.stringify(updated_intent), { status: 200 });
    }
  } else {
    //Create a new order with prisma
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentID = paymentIntent.id;
    await prismadb.order.create({
      data: orderData,
    });

    return new NextResponse(JSON.stringify(paymentIntent), { status: 200 });
  }
}
