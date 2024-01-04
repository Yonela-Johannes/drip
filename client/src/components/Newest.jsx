import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Newest({products}) {

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 data-aos="fade-up" className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest products
          </h2>

          <Link data-aos="fade-up" className="text-primary flex items-center gap-x-1" to="/products">
            See All{" "}
            <span>
            <FaLongArrowAltRight size={18} />
            </span>
          </Link>
        </div>

        <div data-aos="fade-up" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product?._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <img
                  src={product?.imageUrl}
                  alt="Product image"
                  className="w-[300px] h-[300px] object-cover object-center lg:h-full lg:w-full"
                />
              </div>

              <div data-aos="fade-up" className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
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
