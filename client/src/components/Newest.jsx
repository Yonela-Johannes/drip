import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Title from "../utils/Title";

export default function Newest({ products })
{

  return (
    <div className="flex flex-col bg-background rounded-md p-4">
      <Title title="Brand new" />
      <div className="flex flex-col w-full items-center justify-start">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product?._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-80">
                <img
                  src={product?.imageUrl}
                  alt="Product image"
                  className="w-[300px] h-[300px] object-cover object-center lg:h-full lg:w-full"
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-cl">
                    <Link to={`/product/${product._id}`}>
                      {product?.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product?.category?.name}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  R{product?.price}
                </p>
              </div>
            </div>
          ))?.slice(0, 4)}
        </div>

      </div>
    </div>
  );
}
