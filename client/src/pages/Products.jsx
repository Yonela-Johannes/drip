import MaxWidthWrapper from '../components/MaxWidthWrapper'
import ProductReel from '../components/ProductReel'
import { product_categories } from '../config/index'
import { getProducts } from '../redux/features/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Items from '../components/Products/Products'

const parse = (param) => {
  return typeof param === 'string' ? param : undefined
}

const Products = () => {
  const { items , loading} = useSelector((state) => state.products);
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, []);

  const fetchProducts = () => {
    setProducts(items)
  }

  useEffect(() => {
    fetchProducts()
  }, [items]);

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-between">
        <div className='lg:block'>
          <Items items={items} loading={loading} category={'Featured'}/>
        </div>
        <ProductReel
          title={'Browse high-quality assets'}
          products={products}
        />
      </div>
    </MaxWidthWrapper>
  )
}

export default Products
