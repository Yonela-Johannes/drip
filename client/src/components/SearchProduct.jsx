import { useEffect, useState } from 'react'
import { Skeleton } from './skeleton'
import { Link } from 'react-router-dom'

const SearchProduct = ({product, index }) => {
  const [isVisible, setIsVisible] = useState(true)

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
        className={`flex items-start rounded-md bg-gray-200 p-2 justify-between md:justify-start gap-4 ${isVisible ? 'visible animate-in fade-in-5' : ''} ${!isVisible && 'invisible h-full w-full cursor-pointer group/main'} `}
        >
        <Link className='flex flex-col sm:flex-row gap-4' to={`/product/${product?._id}`}>
          <div className='flex flex-col'>
            <img className='w-[80px] h-[80px] sm:h-[150px] sm:w-[200px] object-cover object-center'
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
        </Link>
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

export default SearchProduct
