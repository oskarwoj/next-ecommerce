import { prismadb } from "@/util/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getOrders() {
  try {
    const userSession = await getSession();

    const orders = await prismadb.order.findMany({
      //@ts-ignore
      where: { userId: userSession?.user?.id },
      include: { products: true },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
