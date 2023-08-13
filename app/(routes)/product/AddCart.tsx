"use client";

import { useCartStore } from "@/hooks/store";

interface AddCartProps {
  name: string;
  id: string;
  image: string;
  quantity: number;
  unit_amount: number | null;
}

const AddCart: React.FC<AddCartProps> = ({
  name,
  id,
  image,
  quantity,
  unit_amount,
}) => {
  const cartStore = useCartStore();

  return (
    <>
      <button
        onClick={() =>
          cartStore.addProduct({ name, id, image, quantity, unit_amount })
        }
        className="my-4 btn btn-primary py-2 px-4 rounded-md text-white bg-teal-700"
      >
        Add to cart
      </button>
      <button
        onClick={() =>
          cartStore.removeProduct({ name, id, image, quantity, unit_amount })
        }
        className="m-4 btn btn-primary py-2 px-4 rounded-md text-white bg-red-700"
      >
        Remove from cart
      </button>
    </>
  );
};

export default AddCart;
