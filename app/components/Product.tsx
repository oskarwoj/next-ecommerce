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
        className="w-full h-80 object-cover cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out rounded-lg"
        priority={true}
      />
      <h1 className="text-sm font-medium text-gray-700 mt-2 m-y-2 py-2 border-b-2 border-gray-200 border-solid">
        {name}
      </h1>
      <p className="text-lg font-semibold text-gray-700">
        {formatPrice(price)}
      </p>
    </div>
  );
};

export default Product;
