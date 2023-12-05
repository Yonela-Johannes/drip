import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <Link className={`rounded-md border border-pink-100 p-2 hover:bg-pink-100 cursor-pointer duration-300 visible animate-in fade-in-5' `} to={`/product/${product?._id}`}>
            <img className='rounded-md h-[200px] w-[300px] object-cover object-center'
              src={product?.imageUrl}
              alt={product?.name}
            />
            <p className='mt-4 font-medium text-sm text-gray-700'>{product?.name}</p>
            <div className="flex items-center">
            <Rating {...options} />
              <span className="text-sm text-gray-500">({product?.numOfReviews} Reviews)</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="offerPriceBox">
                <h1
                   className='mt-1 font-medium text-sm text-gray-900'
                  style={{
                    paddingLeft: "2.5vmax",
                    fontSize: ".9vmax",
                    paddingBottom: "0",
                  }}
                >
                  {product?.offerPrice > 0 ? `$${product?.offerPrice}` : ""}
                </h1>
                <span className='mt-1 font-medium text-sm text-gray-900'>{`R${product?.price}`}</span>
              </div>
            </div>
          </Link>
    </>
  );
};

export default ProductCard;
