import React, { useContext, useEffect } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import WishlistProduct from "../components/WishlistProduct";
import Loader from "../components/shared/Loader";
import { Global } from "../helpers/GlobalContext";
import { useParams } from "react-router-dom";
import { getProducts } from "../redux/features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SearchProduct from "../components/SearchProduct";

const Search = () => {
  const dispatch = useDispatch()
  const searchTerm = useParams()?.text
  const { items , loading} = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts())
  }, []);

  useEffect(() => {
    const filteredItems =items?.filter((item) => item?.name?.includes(searchTerm))
    setProducts(filteredItems)
  }, [searchTerm, items]);

  return (
    <MaxWidthWrapper>
      <div className="md:px-10 py-10 ">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-lg md:text-2xl ">
          <strong>{searchTerm}</strong>
        </h2>
      </div>
      {loading ? (<Loader />) : (
        <>
          {products?.length ? (
            <div className="flex flex-col sm:flex-row gap-10">
              <div className="w-full">
                <div className="flex flex-col gap-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-5 items-center">
                    {products?.map((product, i) => (
                      <SearchProduct product={product} index={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6 justify-center h-[50vh] text-4xl bg-amazon-background font-bold">
              <div>Not found: {searchTerm}</div>
            </div>
          )}
        </>
      )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Search;
