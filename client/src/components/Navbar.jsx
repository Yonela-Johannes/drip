import React, { useState } from "react";
import MobileNav from './MobileNav'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillHeart, AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuContact2 } from "react-icons/lu";
import { useContext } from 'react';
import { Global } from '../helpers/GlobalContext';
import { BsCartCheckFill, BsCartPlus } from 'react-icons/bs';
import avatar from '../assets/avatar.jpg'
import { toast } from 'react-toastify';
import { MdSearch } from 'react-icons/md';
import { Modal } from 'flowbite-react';
import Login from "../admin/pages/login/Login";
import Register from "../admin/pages/register/Register";
import { handleSignin, handleUserModal, onCloseSignin, handleSignup } from "../redux/features/modals/modalsSlice";

const Navbar = () => {
  const { items } = useSelector((state) => state.cart);
  const { openSignIn, openSignup, openUserModal } = useSelector((state) => state.modals)
  const { user, wishProducts, logout } = useContext(Global);
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSearch = (e) => {
    e.preventDefault()
    if(searchTerm?.length < 3) return toast("Please enter product name to search for")
    navigate(`/search/${searchTerm}`)
  }

  function handleDashboard() {
    dispatch(onCloseSignin())
    navigate('/dashboard')
  }

  function handleProfile() {
    dispatch(onCloseSignin())
    navigate('/profile')
  }

  function handleLogout() {
    dispatch(onCloseSignin())
    logout()
  }

  function handleClose() {
    console.log('Close')
    dispatch(onCloseSignin())
  }
  console.log(openSignIn)

  return (
    <div className='w-full md:fixed z-50 top-0 inset-x-0 h-16'>
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
                    <p className='hidden sm:block text-base md:text-lg md:text-xl'>Be Pleasured by Pinky</p>
                  </div>
                </Link>
              </div>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end'>
                  <div className="flex gap-4">
                    {user?._id ? (
                      <div className='capitalize cursor-pointer'
                        onClick={handleUserModal}>
                        <div className="flex bg-gray-200 rounded-md px-1 items-center">
                            <div className="">{user && user?.avatar ? (<img src={user?.avatar} className='w-[35px] h-[35px] object-cover object-center rounded-full' alt='avatar' />) : (<img src={avatar} className='w-[40px] h-[40px] object-cover object-center rounded-full' alt='avatar' />)}</div>
                          <div className="flex flex-col ">
                            <p className='p-0 m-0'>{user?.name} {user.lastName}</p>
                            <p className='p-0 m-0 text-base md:text-xl text-gray-600'>{user?.role}</p>
                          </div>
                        </div>
                      </div>
                    ): (
                      <div className='flex items-center justify-center gap-4 cursor-pointer'>
                        <div onClick={() => dispatch(handleSignin())} className='underline'>
                          <p
                            >
                            Sign in
                          </p>
                        </div>
                          <div onClick={() => dispatch(handleSignup())}>
                            <p
                              >
                              Sign up
                            </p>
                          </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>
            <div className="hidden sm:block text-base md:text-lg">
              <p className={ `anitext text-base md:text-xl bg-pink text-center sm:w-[660px]`}>Welcome to our shop...You can find anything in here as your
                favourites
            </p>
            </div>
          </div>
          <div className="flex gap-10 items-center my-4 justify-center sm:justify-end w-full">
          {/* Search bar */}
            <div className="hidden md:flex item-center justify-end my-3 gap-8 items-center">
              <form onSubmit={handleSearch} className="flex item-center w-full md:w-max justify-between md:justify-end border border-gray-500 p-2 rounded-md">
                <input
                  type="text"
                  placeholder="Search for items ..."
                  className='text-base md:text-xl w-min rounded-md bg-white focus-ring-0 border-none focus:border-none outline-none focus:outline-none'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <MdSearch size={20} />
                </button>
              </form>
          </div>
            <div className='flex lg:ml-0'>
              <Link to='/'>
                <p className='hidden sm:block text-base md:text-lg'>Home</p>
                <AiOutlineHome className='block sm:hidden h-5 w-5' />
              </Link>
            </div>
            <div className='flex lg:ml-0'>
              <Link to='/products'>
                <p className='hidden sm:block text-base md:text-lg'>Shop</p>
                <HiOutlineShoppingBag className='block sm:hidden h-5 w-5' />
              </Link>
            </div>
            <div className='flex lg:ml-0'>
              <Link to='/about'>
                <p className='hidden sm:block text-base md:text-lg'>About</p>
                <LuContact2 className='block sm:hidden h-5 w-5' />
              </Link>
            </div>
            <div className='relative flex lg:ml-0'>
              <p className='absolute text-base w-5 h-5 -top-1 text-center -right-3  bg-pink2 m-0 text-black rounded-full'>{items?.length || 0}</p>
              <Link to='/cart'>
                {items?.length > 0 ? (<BsCartCheckFill size={18} />) : (<BsCartPlus size={18} />)}
              </Link>
            </div>
            {user?._id && (
              <>
                <div className='relative flex lg:ml-0'>
                  <p className='absolute text-base w-5 h-5 -top-1 text-center -right-3  bg-violet-400 m-0 text-black rounded-full'>{wishProducts?.length || 0}</p>
                  <Link to='/wishlist'>
                    {wishProducts?.length > 0 ? (<AiFillHeart size={18} />) : (<AiOutlineHeart size={18} />)}
                  </Link>
                </div>
                <div className='hidden md:flex lg:ml-0'>
                  <Link to='/orders'>
                    <p className='hidden sm:block text-base md:text-lg'>Orders</p>
                    <LuContact2 className='block sm:hidden h-5 w-5' />
                  </Link>
                </div>
              </>
            )}
          </div>
      </header>
      <Modal show={openSignIn} size="md" onClose={() => handleClose()} popup>
        <Login close={onCloseSignin} handleSignup={handleSignup} />
      </Modal>
      <Modal show={openSignup} size="md" onClose={() => handleClose()} popup>
        <Register close={onCloseSignin} handleSignin={handleSignin} />
      </Modal>
      {user && user?._id ? (
        <Modal
          show={openUserModal}
          position={'top-right'}
          onClose={dispatch(onCloseSignin())}
          size="sm"
        >
        <div className="flex flex-col">
          {user && user?._id ? (
              <div className='capitalize'
                onClick={handleProfile}>
                    <p className='hover:bg-pink2 duration-200 cursor-pointer p-2'>Profile</p>
              </div>
            ) : ('')
          }
          <div>
            {user && user?._id && user?.role === 'admin' ? (
                <div className='capitalize'
                  onClick={handleDashboard}>
                      <p className='hover:bg-pink2 duration-200 cursor-pointer p-2'>Dashboard</p>
                </div>
              ) : ('')
            }
          </div>
          <div>
            {user && user?._id ? (
              <p onClick={handleLogout} className="hover:bg-pink2 duration-200 cursor-pointer p-2">Logout</p>
            ) : ""}
            </div>
        </div>

        </Modal>
      ) : ''}
    </div>
  )
}

export default Navbar
