"use client";

import { formatPrice } from "@/util/formatPrice";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";

interface IOrder {
  id: string;
  status: string;
  amount: number;
  createdDate: Date;
  products: Product[];
}

interface DashboardProps {
  orders: IOrder[];
}

const Dashboard: FC<DashboardProps> = ({ orders }) => {
  return (
    <motion.div layout>
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {orders.map((order: IOrder) => (
          <div
            key={order.id}
            className="rounded-lg p-8 my-4 space-y-2 bg-base-200"
          >
            <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
            <p className="text-xs">
              Status:
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white py-1 rounded-md px-2 mx-2 text-xs`}
              >
                {order.status}
              </span>
            </p>

            <p className="text-xs">
              Time: {new Date(order.createdDate).toString()}
            </p>
            <div className="text-sm lg:flex items-center  gap-4">
              {order.products.map((product: Product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-baseline gap-4">
                    <Image
                      src={product.image!}
                      width={36}
                      height={36}
                      alt={product.name}
                      priority={true}
                      className="w-auto"
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-medium py-2">
              Total: {formatPrice(order.amount)}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
