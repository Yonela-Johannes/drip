import { useEffect, useState } from 'react'
import { Skeleton } from './skeleton'
import { product_categories } from '../config/index'
import { Link } from 'react-router-dom'
import { removeItem } from '../redux/features/cart/cartSlice'
import { useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";

const CartProduct = ({cart, index }) => {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(true)
  const { product } = cart;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  if (isVisible && product) {
    return (
      <div
        className={`flex items-start justify-start gap-4 ${isVisible ? 'visible animate-in fade-in-5' : ''} ${!isVisible && 'invisible h-full w-full cursor-pointer group/main'} `}
        >
        <Link className='flex flex-col sm:flex-row gap-4' to={`/product/${product?._id}`}>
          <div className='flex flex-col'>
            <img className='-z-10 w-[80px] h-[80px] sm:h-[150px] sm:w-[200px] object-cover object-center'
              src={product?.imageUrl}
              alt='Product image'
              />
          </div>
          <div className=" sm:w-[320px]">
            <h3 className='font-medium text-base sm:text-lg text-gray-700'>
              {product?.name}
            </h3>
            <p className='mt-1 hidden sm:block text-sm text-gray-500'>
              {product?.description}
            </p>
            <p className='mt-1 font-medium text-sm text-gray-900'>
              R{product?.price}
            </p>
            <p className='mt-1 text-sm text-gray-900'>
              {product?.in_stock ? 'In stock' : 'Not in stock'}
            </p>
          </div>
          <div className="flex flex-col items-end text-end justify-end">
            <h3 className='font-medium text-sm text-gray-700'>
            <span className='font-normal'>Total: </span>
              R{product?.total}
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Quantity: {product?.quantity}
            </p>
          </div>
        </Link>
        <div onClick={() => dispatch(removeItem(product))} className="cursor-pointer">
          <h3 className='font-medium text-md text-gray-700'>
          <MdDelete size={20} />
          </h3>
        </div>
      </div>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}

export default CartProduct
