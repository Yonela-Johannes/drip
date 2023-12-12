import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import "./Product.css";

const Products = ({items, loading, category}) => {

  return (
    <>
      {loading ? (
        ''
      ) : (
        <div className="py-12">
          <div className='md:flex md:items-center md:justify-between mb-4'>
            <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
              <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
                {category} items
              </h1>
            </div>
              <p className='hidden text-sm font-medium text-gray-500 md:block'>
                shop {category} items
              </p>
          </div>
          <div className="flex flex-1 gap-8">
            {items?.length === 0 ?
            <span style={{
              display:"block",
              padding:"30px 0",
              fontSize:"1.5rem",
              flex:".9",
              textAlign:"center"
            }}>No Product Found ....</span>
            :
            <div
            className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items &&
              items
                ?.filter((product) => product?.category?.title === category)
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
