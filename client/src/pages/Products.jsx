import MaxWidthWrapper from '../components/MaxWidthWrapper'
import ProductReel from '../components/ProductReel'
import { useDispatch, useSelector } from "react-redux";
import Items from '../components/Products/Products'
import Loader from '../components/shared/Loader'
import { getProducts } from '../redux/features/products/productSlice'
import { useEffect, useState } from "react";

const Products = () => {
  const { items , loading} = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  console.log(loading)
  
  return (
    <MaxWidthWrapper>
      {loading ? (
        <Loader />
      ) : items?.length > 0 ? (
      <div className="flex flex-col items-center justify-between">
        <div className='lg:block'>
          <Items items={items} loading={loading} category={'Featured'}/>
        </div>
        <div className='lg:block'>
          <Items items={items} loading={loading} category={'Low Prices'}/>
        </div>
        <ProductReel
          title={'Browse high-quality products'}
          products={items}
        />
      </div>) : (
        <Loader />
      )
      }
    </MaxWidthWrapper>
  )
}

export default Products
