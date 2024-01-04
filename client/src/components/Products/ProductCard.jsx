import React from "react";
import { Link } from "react-router-dom";
import Rating from "../shared/Rating";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link
        className={`rounded-md border border-pink p-2 hover:bg-pink cursor-pointer duration-300 visible animate-in fade-in-5' `}
        to={`/product/${product?._id}`}
      >
        <img
          data-aos="fade-up"
          className="rounded-md h-[200px] w-[300px] object-cover object-center"
          src={product?.imageUrl}
          alt={product?.name}
        />
        <p
          data-aos="fade-up"
          className="mt-4 font-medium text-sm text-gray-700"
        >
          {product?.name}
        </p>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">
            ({product?.numOfReviews} Reviews)
          </span>
        </div>
        <div
          data-aos="fade-up"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Rating
            rating={product?.ratings}
            view={false}
            select={false}
            hover={false}
          />
          <div data-aos="fade-up" className="offerPriceBox">
            <h1
              className="mt-1 font-medium text-sm text-gray-900"
              style={{
                paddingLeft: "2.5vmax",
                fontSize: ".9vmax",
                paddingBottom: "0",
              }}
            >
              {product?.offerPrice > 0 ? `$${product?.offerPrice}` : ""}
            </h1>
            <span
              data-aos="fade-up"
              className="mt-1 font-medium text-sm text-gray-900"
            >{`R${product?.price}`}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
