import { SearchParamTypes } from "@/types/SearchParamTypes";
import { formatPrice } from "@/util/formatPrice";
import Image from "next/image";

const ProductPage = async ({ searchParams }: SearchParamTypes) => {
  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image
        src={searchParams.image}
        width={600}
        height={600}
        alt={searchParams.name}
        className="w-full h-80 object-cover  rounded-lg"
      />
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl font-medium py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="py"></p>
          <p className="font-bold">{formatPrice(searchParams.unit_amount)}</p>
        </div>
        <button className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
