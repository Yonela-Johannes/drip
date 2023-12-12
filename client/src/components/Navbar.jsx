import React, { useState } from "react";
import MobileNav from './MobileNav'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useSelector } from 'react-redux'
import { AiFillHeart, AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuContact2 } from "react-icons/lu";
import { useContext } from 'react';
import { Global } from '../helpers/GlobalContext';
import { BsCartCheckFill, BsCartPlus } from 'react-icons/bs';
import avatar from '../assets/avatar.jpg'
import { toast } from 'react-toastify';
import MoreOption from './more/MoreOption';
import { MdSearch } from 'react-icons/md';

const Navbar = () => {
  const { items } = useSelector((state) => state.cart)
  const { user, wishProducts, logout } = useContext(Global);
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if(searchTerm?.length < 3) return toast("Please enter product name to search for")
    navigate(`/search/${searchTerm}`)
  }

  return (
    <div className='w-full fixed z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white px-10'>
          <div className={`headerText border-b border-gray-200`}>
            <div className='flex justify-between h-16 items-center'>
              <MobileNav logout={logout} />
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
                  <div className="flex gap-4">
                    {user && user?._id && user?.role === 'admin' && (
                        <Link className='capitalize'
                          to='dashboard'>
                          <div className="flex bg-gray-200 rounded-md px-1 items-center font-semibold">
                            <div className="flex flex-col ">
                              <p className='p-0 m-0 text-sm text-gray-600'>{user?.role}</p>
                              <p className='p-0 m-0'>Dashboard</p>
                            </div>
                          </div>
                        </Link>
                      )
                    }
                    {user?._id ? (
                      <Link className='capitalize'
                        to='profile'>
                        <div className="flex bg-gray-200 rounded-md px-1 items-center">
                            <div className="">{user && user?.avatar ? (<img src={user?.avatar} className='w-[35px] h-[35px] object-cover object-center rounded-full' alt='avatar' />) : (<img src={avatar} className='w-[40px] h-[40px] object-cover object-center rounded-full' alt='avatar' />)}</div>
                          <div className="flex flex-col ">
                            <p className='p-0 m-0'>{user?.name} {user.lastName}</p>
                            <p className='p-0 m-0 text-sm text-gray-600'>{user?.role}</p>
                          </div>
                        </div>
                      </Link>
                    ): (
                      <div className='flex items-center justify-center gap-4'>
                        <div className='underline'>
                          <Link
                            to='/login'>
                            Sign in
                          </Link>
                        </div>
                          <div>
                            <Link
                              to='/register'>
                              Sign up
                            </Link>
                          </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>
            <div className="hidden sm:block">
              <p className={ `anitext text-sm sm:text-lg bg-pink text-center sm:w-[660px]`}>Welcome to our shop...You can find anything in here as your
                favourites
            </p>
            </div>
          </div>
          <div className="flex gap-10 items-center my-4 justify-center sm:justify-end w-full">
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
              <p className='absolute text-sm w-5 h-5 -top-3 text-center -right-3  bg-pink m-0 text-black rounded-full'>{items?.length || 0}</p>
              <Link to='/cart'>
              {items?.length > 0 ? (<BsCartCheckFill size={25} />) : (<BsCartPlus size={25} />)}
              </Link>
            </div>
            <div className='flex lg:ml-0'>
              <Link to='/about'>
                <p className='hidden sm:block'>About</p>
                <LuContact2 className='block sm:hidden h-5 w-5' />
              </Link>
            </div>
            {user?._id && (
              <>
                <div className='relative flex lg:ml-0'>
                  <p className='absolute text-sm w-5 h-5 -top-3 text-center -right-3  bg-pink m-0 text-black rounded-full'>{wishProducts?.length || 0}</p>
                  <Link to='/wishlist'>
                    {wishProducts?.length > 0 ? (<AiFillHeart size={25} />) : (<AiOutlineHeart size={25} />)}
                  </Link>
                </div>
                <div className='hidden md:flex lg:ml-0'>
                  <Link to='/orders'>
                    <p className='hidden sm:block'>Orders</p>
                    <LuContact2 className='block sm:hidden h-5 w-5' />
                  </Link>
                </div>
                <div onClick={logout} className='hidden md:flex lg:ml-0 cursor-pointer'>
                    <p className='hidden sm:block'>Logout</p>
                </div>
              </>
            )}
          </div>
          <div className="flex item-center justify-end my-3">
          <form onSubmit={handleSearch} className="flex item-center w-full md:w-max justify-between md:justify-end border border-gray-500 p-2 rounded-md">
            <input
              type="text"
              placeholder="Search for items ..."
              className='text-sm md:text-base w-min rounded-md bg-white focus-ring-0 border-none focus:border-none outline-none focus:outline-none'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
            <MdSearch size={20} />
            </button>
          </form>
         </div>
        <MoreOption />
      </header>
    </div>
  )
}

export default Navbar
