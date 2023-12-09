import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import "./Product.css";

const Products = () => {
  const [products, setProducts] = useState([])
  const [category,setCategory] = useState("");
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    setProducts(items)
  }, [products]);

  return (
    <>
      {loading ? (
        ''
      ) : (
        <div className="py-12">
          <div className='md:flex md:items-center md:justify-between mb-4'>
            <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
              <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
                Shop items
              </h1>
            </div>
              <p className='hidden text-sm font-medium text-gray-500 md:block'>
                Featured items
              </p>
          </div>
          <div className="flex flex-1 gap-8">
            {products?.length === 0 ?
            <span style={{
              display:"block",
              padding:"30px 0",
              fontSize:"1.5rem",
              flex:".9",
              textAlign:"center"
            }}>No Product Found ....</span>
            :
            <div
            className="grid grid-cols-4 gap-4">
            {products &&
              products
                ?.filter((product) => product?.category?.title === 'Featured')
                ?.slice(0, 8)
                ?.map((product) =>
                 (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>}
            </div>
        </div>
      )}
    </>
  );
};

export default Products;
