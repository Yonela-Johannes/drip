import MaxWidthWrapper from '../components/MaxWidthWrapper'
import ProductReel from '../components/ProductReel'
import { useDispatch, useSelector } from "react-redux";
import Items from '../components/Products/Products'
import Loader from '../components/shared/Loader'
import { getProducts } from '../redux/features/products/productSlice'
import { useEffect } from "react";
import Sales from '../components/common/Sales';

const Products = () =>
{
  const { items, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() =>
  {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : items?.length > 0 ? (
        <div className="flex flex-col items-center justify-between">
          <MaxWidthWrapper>
            <div className='lg:block'>
              <Items items={items} loading={loading} category={'Featured'} />
            </div>
          </MaxWidthWrapper>
          <MaxWidthWrapper>
            <Sales items={items} category={'Featured'} />
          </MaxWidthWrapper>
          <MaxWidthWrapper>
            <div className='lg:block'>
              <Items items={items} loading={loading} category={'Low Prices'} />
            </div>
          </MaxWidthWrapper>
          <MaxWidthWrapper>
            <ProductReel
              title={'Browse high-quality products'}
              products={items}
            />
          </MaxWidthWrapper>
        </div>) : (
        <Loader />
      )
      }
    </div>
  )
}

export default Products
