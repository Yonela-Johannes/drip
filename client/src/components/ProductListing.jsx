import { useContext, useEffect, useState } from 'react'
import { Skeleton } from './skeleton'
import { product_categories } from '../config/index'
import { Link } from 'react-router-dom'
import { BiCartAdd, BiHeart } from "react-icons/bi";
import { addItem } from '../redux/features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/features/auth/authSlice';
import { Global } from '../helpers/GlobalContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const ProductListing = ({product, index }) => {
  const { user } = useSelector((state) => state.auth)
  const { refreshWishlist, wishProducts } = useContext(Global);
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  const label = product_categories.find(
    ({ value }) => value === product?.category
  )?.label

  const addProductToWishlist = async (userId, productId) => {
    await dispatch(addToWishlist(userId, productId));
    refreshWishlist();
  }

  console.log(wishProducts)
  if (isVisible && product) {
    return (
      <div
      className={`relative rounded-md border border-pink p-2 hover:bg-pink cursor-pointer duration-300 ${isVisible ? 'visible animate-in fade-in-5' : ''} ${!isVisible && 'invisible h-full w-full cursor-pointer group/main'} `}
        to={`/product/${product?._id}`}>
        <div className='flex flex-col w-full'>
            <Link className="" to={`/product/${product?._id}`}>
              <img className='rounded-md h-[200px] w-[300px] object-cover object-center'
                src={product?.imageUrl}
                alt='Product image'
                />
            </Link>
            <div className="flex items-center justify-between">
              <Link className="" to={`/product/${product?._id}`}>
                <h3 className='mt-4 font-medium text-sm text-gray-700'>
                  {product?.name}
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  {label}
                </p>
                <p className='mt-1 font-medium text-sm text-gray-900'>
                  R{product?.price}
                </p>
              </Link>
              <div className="flex items-center gap-4 justify-center" onClick={() => dispatch(addItem(product))}>
                <BiCartAdd size={25} />
              </div>
            </div>
          </div>
          {user?._id && (
            <div className="absolute right-4 top-4 flex items-center gap-4 justify-center" onClick={() => addProductToWishlist({userId: user?._id, productId:product?._id})}>
              {wishProducts?.some((elem) => elem?._id == product?._id) ? (<AiFillHeart size={25} />) : (<AiOutlineHeart size={25} />)}
            </div>
          )}
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

export default ProductListing
