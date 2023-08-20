"use client";

import { useCartStore } from "@/hooks/store";
import { useState } from "react";

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
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ name, id, image, quantity, unit_amount });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-4 btn btn-primary w-full"
      >
        {!added ? <span>Add to cart</span> : <span>Adding to cart 😊</span>}
      </button>
    </>
  );
};

export default AddCart;
