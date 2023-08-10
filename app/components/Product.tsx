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
      <Image src={image} width={400} height={400} alt={name} />
      <h1>{name}</h1>
      {formatPrice(price)}
    </div>
  );
};

export default Product;
