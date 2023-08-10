import { formatPrice } from "@/util/formatPrice";
import Image from "next/image";

interface ProductProps {
  name: string;
  image: string;
  prices: number | null;
}

const Product: React.FC<ProductProps> = ({ name, image, prices }) => {
  return (
    <div>
      <Image src={image} width={400} height={400} alt={name} />
      <h1>{name}</h1>
      {formatPrice(prices as number)}
    </div>
  );
};

export default Product;
