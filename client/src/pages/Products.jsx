import axios from 'axios'
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

const Products = ({ searchParams }) => {
  const { items } = useSelector((state) => state.products);
  const [products, setProducts] = useState([])
  const sort = parse(searchParams?.sort)
  const category = parse(searchParams?.category)
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


  const label = product_categories.find(
    ({ value }) => value === category
  )?.label

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-between">
        <div className='hidden lg:block'>
          <Items />
        </div>
        <ProductReel
          title={label ?? 'Browse high-quality assets'}
          products={products}
        />
      </div>
    </MaxWidthWrapper>
  )
}

export default Products
