import Image from "next/image";

import { formatPrice } from "@/util/formatPrice";

interface ProductProps {
  name: string;
  image: string;
  price: number | null;
}

const Product: React.FC<ProductProps> = ({ name, image, price }) => {
  return (
    <div>
      <Image
        src={image}
        width={800}
        height={800}
        alt={name}
        className="w-full h-80 object-cover cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out rounded-md"
        priority={true}
      />
      <h1 className="text-sm font-semibold pt-4">{name}</h1>
      <p>{formatPrice(price)}</p>
    </div>
  );
};

export default Product;
