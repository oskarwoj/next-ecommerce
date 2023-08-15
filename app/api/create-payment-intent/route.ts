import Stripe from "stripe";

import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(request: Request) {
  //Get user
  const userSession = await getSession();

  if (!userSession?.user) {
    return new NextResponse("Not logged in", { status: 403 });
  }

  const body = await request.json();
  //Extract the data from the body
  // const { items, payment_intent_id } = body;

  return new NextResponse(JSON.stringify(body), { status: 200 });
}
