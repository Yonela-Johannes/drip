import React from "react";
import { useDispatch } from "react-redux";
import { FaShoppingBag, FaStar } from "react-icons/fa";
import { addItem } from "../redux/features/cart/cartSlice";
import { BiCartAdd } from "react-icons/bi";
import Rating from "../components/shared/Rating";
import { Link } from "react-router-dom";

const Item = ({
  _id,
  color,
  shadow,
  name,
  description,
  imageUrl,
  btn,
  rating,
  price,
  item
}) =>
{
  const dispatch = useDispatch()
  return (
    <>
      <div
        className={`relative bg-gradient-to-b cursor-pointer ${color} ${shadow} grid items-center justify-items-start"
          } rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}
      >
        <Link to={`/product/${_id}`}
          className={`grid items-center "justify-items-center"
            }`}
        >
          <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
            {name}
          </h1>
          <p className="text-slate-200 filter drop-shadow text-base md:text-sm font-normal">
            {description}
          </p>

          <div className="flex items-center w-full justify-between my-2">
            <div className="flex items-center bg-white/80  px-1 rounded blur-effect-theme">
              <h1 className="text-black text-sm font-medium">R{price}</h1>
            </div>
            <div className="flex items-center gap-1">
              <Rating
                rating={rating}
                view={true}
                select={false}
                hover={false}
              />
            </div>
          </div>
        </Link>
        <Link
          className={`flex items-center absolute top-5 right-1`}
          to={`/product/${_id}`}
        >
          <img
            src={imageUrl}
            alt={`imageUrl/${_id}`}
            className={`object-center object-contain transitions-theme hover:-rotate-12 h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]"`}
          />
        </Link>
        <div
          className="rounded-md px-4 py-1 text-sm text-black"
          onClick={() => dispatch(addItem(item))}
        >
          <BiCartAdd size={28} />
        </div>
      </div>
    </>
  );
};

export default Item;
