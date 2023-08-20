import Image from "next/image";
import Link from "next/link";

import { ProductType } from "@/types/ProductType";
import { formatPrice } from "@/util/formatPrice";

const Product: React.FC<ProductType> = ({
  name,
  image,
  unit_amount,
  id,
  description,

  metadata,
}) => {
  const { features } = metadata;

  return (
    <div>
      <Link
        href={{
          pathname: `/product/${id}`,
          query: {
            name,
            image,
            unit_amount,
            id,
            description,
            features,
          },
        }}
      >
        <Image
          src={image}
          width={800}
          height={800}
          alt={name}
          className="w-full h-80 object-cover cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out rounded-lg"
          priority={true}
        />
      </Link>
      <h1 className="text-sm font-medium mt-2 m-y-2 py-2 border-b-2 border-gray-200 border-solid">
        {name}
      </h1>
      <p className="text-lg font-semibold text-primary">
        {formatPrice(unit_amount)}
      </p>
    </div>
  );
};

export default Product;
