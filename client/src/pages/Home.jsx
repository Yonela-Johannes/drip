import MaxWidthWrapper from '../components/MaxWidthWrapper'
import ProductGrid from '../components/ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProducts } from '../redux/features/products/productSlice';
import { Link } from 'react-router-dom';
import safety from '../assets/safety.png'
import logo from '../assets/logo.png'
import ImageCarousel from '../components/ImageCarousel';
import ProductCard from '../components/Products/ProductCard';
import Hero from '../components/Hero';
import Newest from '../components/Newest';
import { Slider } from '../components/hero/Slider';


export default function Home() {
  const { items } = useSelector((state) => state.products);
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
    <div className='w-full'>
    <ImageCarousel />
      <MaxWidthWrapper>
      <div className="text-center w-full items-center justify-start">
        <h2 className="text-center self-center p-10 text-xl m-5 text-black">Featured Products</h2>
        <div className="sm:grid grid-cols-4">
          {products && products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))?.slice(0, 4)}
        </div>
      </div>
      <Hero />
      <div className="flex flex-col">
        <div className='relative py-20 mx-auto sm:text-center flex flex-col items-center '>
          <div className="flex items-start justify-start gap-4">
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Presenting your marketplace for high quality premium digital{' '}
              <span className='text-pink-500'>
                digital assets
              </span>
              .
            </h1>
            <img src={logo} className='object-center object-contain w-20 h-20 sm:w-28 sm:h-28'/>
          </div>
          <p className='mt-6 text-base sm:text-lg max-w-prose text-muted-foreground'>
            Welcome to <span className='font-semibold'>Be Pleasured by Pinky</span>. Every asset on our
            platform is verified by our team to ensure our
            highest quality standards.
            Explore a variety of offerings designed to elevate your online experience. Welcome to the hub of digital pleasure.
          </p>
          <img src={safety} className='object-center object-contain '/>
          <div className='flex flex-row gap-4 mt-6'>
            <Link
              to='/products'>
              Browse Trending
            </Link>
            <button>
              Our quality promise &rarr;
            </button>
          </div>
        </div>
      </div>
        <Slider />
        <Newest products={products} />
        {/* <ProductReel
          query={{ sort: 'desc', limit: 4 }}
          href='/products?sort=recent'
          title='Brand new'
        /> */}
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <ProductGrid title="Specials" products={products} />
      </MaxWidthWrapper>
    </div>
  )
}
