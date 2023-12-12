import React, { useContext, useEffect } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import WishlistProduct from "../components/WishlistProduct";
import Loader from "../components/shared/Loader";
import { Global } from "../helpers/GlobalContext";

const Wishlist = () => {
  const {refreshWishlist, loading, user, wishProducts } = useContext(Global)

  return (
    <MaxWidthWrapper>
      <div className="md:px-10 py-10 ">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-lg md:text-2xl ">
          <strong>Your Shopping Wishlist</strong>
        </h2>
      </div>
      {loading ? (<Loader />) : (
        <>
          {wishProducts?.length ? (
            <div className="flex flex-col sm:flex-row gap-10">
              <div className="w-full">
                <div className="flex flex-col gap-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-5 items-center">
                    {wishProducts?.map((product, i) => (
                      <WishlistProduct refreshWishlist={refreshWishlist} index={i} key={`wish${i}`} product={product} user={user} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6 justify-center h-[50vh] text-4xl bg-amazon-background font-bold">
              <div>Wishlist is Empty</div>
            </div>
          )}
        </>
      )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Wishlist;
