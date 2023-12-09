import React, { useContext, useEffect } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import WishlistProduct from "../components/WishlistProduct";
import Loader from "../components/shared/Loader";
import { Global } from "../helpers/GlobalContext";

const Wishlist = () => {
  const {refreshWishlist, loading, user, wishProducts } = useContext(Global)

  return (
    <MaxWidthWrapper>
      <div className="px-10 py-10 ">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl ">
          <strong>Your Shopping Wishlist</strong>
        </h2>
      </div>
      {loading ? (<Loader />) : (
        <>
          {wishProducts?.length ? (
            <div className="flex flex-col sm:flex-row gap-10">
              <div className="w-3/4">
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-5">
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
