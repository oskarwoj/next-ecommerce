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
        className="w-full h-80 object-cover"
        priority={true}
      />
      <h1>{name}</h1>
      {formatPrice(price)}
    </div>
  );
};

export default Product;
