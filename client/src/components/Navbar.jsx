import { useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import NavItems from './NavItems'
// import Cart from './Cart'
// import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useSelector } from 'react-redux'
import { BiCart, BiCartAdd } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuContact2 } from "react-icons/lu";
import { BiSpreadsheet } from "react-icons/bi";

const Navbar = () => {
  const [user, setUser] = useState('')
  const { items } = useSelector((state) => state.cart)
  return (
    <div className='w-full sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white px-10'>
          <div className={`headerText border-b border-gray-200`}>
            <div className='flex justify-between h-16 items-center'>
              <MobileNav />

              <div className="">
                <Link to='/'>
                  <div className='flex items-center justify-center lg:ml-0'>
                    <img className='h-[50px] w-[50px] object-contain object-center'
                      src={logo}
                      alt='logo'
                      />
                    <p className='hidden sm:block text-xl'>Be Pleasured by Pinky</p>
                  </div>
                </Link>
              </div>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end'>
                  {user ? null : (
                    <Link
                      to='/sign-in'>
                      Sign in
                    </Link>
                  )}
                </div>
            </div>
            <div className="hidden sm:block">
              <p className={ `anitext text-sm sm:text-lg bg-pink-300 text-center sm:w-[660px]`}>Welcome to our shop...You can find anything in here as your
                favourites
            </p>
            </div>
          </div>
          <div className="flex gap-10 items-center my-4 justify-center sm:justify-end w-full">
            <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
              {/* <NavItems /> */}
            </div>
            <div className='flex lg:ml-0'>
              <Link to='/'>
                <p className='hidden sm:block'>Home</p>
                <AiOutlineHome className='block sm:hidden h-5 w-5' />
              </Link>
            </div>
            <div className='flex lg:ml-0'>
              <Link to='/products'>
                <p className='hidden sm:block'>Shop</p>
                <HiOutlineShoppingBag className='block sm:hidden h-5 w-5' />
              </Link>
            </div>
            <div className='relative flex lg:ml-0'>
              <p className='absolute text-sm w-5 h-5 -top-3 text-center -right-3  bg-pink-400 m-0 text-black rounded-full'>{items?.length || 0}</p>
              <Link to='/cart'>
                <BiCart className='h-5 w-5 sm:h-7 sm:w-6' />
              </Link>
            </div>
            <div className='flex lg:ml-0'>
              <Link to='/about'>
                <p className='hidden sm:block'>About</p>
                <LuContact2 className='block sm:hidden h-5 w-5' />
              </Link>
            </div>
            <div className='flex lg:ml-0'>
              <Link to='/products'>
                <p className='hidden sm:block'>Contact</p>
                <BiSpreadsheet className='block sm:hidden h-5 w-5' />
              </Link>
            </div>
          </div>
      </header>
    </div>
  )
}

export default Navbar
