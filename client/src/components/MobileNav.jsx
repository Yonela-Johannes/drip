import { useEffect, useState } from 'react'
import { product_categories } from '../config/index'
import { BiMenu } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
// import { usePathname } from 'next/navigation'

const MobileNav = ({logout}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {user } = useSelector((state) => state.auth)
  const location = useLocation()?.pathname

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (isOpen)
      document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  if (!isOpen)
    return (
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
        <BiMenu className='h-6 w-6' aria-hidden='true' />
      </button>
    )

  return (
    <div className='z-[9999] bg-white'>
      <div className='relative z-40 lg:hidden'>
        <div className='fixed inset-0 bg-black bg-opacity-70' />
      </div>

      <div className='fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex'>
        <div className='w-[70%]'>
          <div className='relative flex w-full max-w-sm flex-col overflow-y-auto bg-white h-screen pb-4 shadow-xl'>
            <div className='flex justify-end items-center px-2 pb-2 pt-2'>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                <MdClose size={20} aria-hidden='true' />
              </button>
            </div>

            <div className="flex flex-col gap-4 sm:justify-end w-full border-t bg-pink px-4 py-4">
              <div className='flex lg:ml-0'>
                <Link to='/'>
                  <p className='text-sm'>Home</p>
                </Link>
              </div>
              <div className='flex lg:ml-0'>
                <Link to='/products'>
                  <p className='text-sm'>Shop</p>
                </Link>
              </div>
              <div className='relative flex lg:ml-0'>
                <Link to='/cart'>
                <p className='text-sm'>Cart</p>
                </Link>
              </div>
              <div className='flex lg:ml-0'>
                <Link to='/about'>
                  <p className='text-sm'>About</p>
                </Link>
              </div>
              <div className='flex lg:ml-0'>
                <Link to='/wishlist'>
                  <p className='text-sm'>Wishlist</p>
                </Link>
              </div>
              <div className='relative flex lg:ml-0'>
                <Link to='/orders'>
                <p className='text-sm'>Orders</p>
                </Link>
              </div>
            </div>

            <div className='space-y-6 border-t border-gray-200 px-4 pt-4'>
              {user?._id ? (
                <>
                  <div className='flow-root'>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to='/profile'
                      className='capitalize -m-2 block p-2 font-medium text-gray-900'>
                    <Link className='capitalize'
                      to='profile'>
                      <div className="flex items-center gap-2 bg-pink rounded-md px-1">
                          <div className="">{user && user?.avatar ? (<img src={user?.avatar} className='w-[30px] h-[30px] object-cover object-center rounded-full' alt='avatar' />) : (<img src={avatar} className='w-[40px] h-[40px] object-cover object-center rounded-full' alt='avatar' />)}</div>
                        <div className="flex flex-col ">
                          <p className='p-0 m-0'>{user?.name} {user.lastName}</p>
                          <p className='p-0 m-0 text-sm text-gray-600'>{user?.role}</p>
                        </div>
                      </div>
                    </Link>
                    </Link>
                  </div>
                  <div className='flow-root'>
                    <Link
                      onClick={() => logout()}
                      to='/sign-in'
                      className='-m-2 block p-2 font-medium text-gray-900'>
                      Sign out
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className='flow-root'>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to='/sign-in'
                      className='-m-2 block p-2 font-medium text-gray-900'>
                      Sign in
                    </Link>
                  </div>
                  <div className='flow-root'>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to='/sign-up'
                      className='-m-2 block p-2 font-medium text-gray-900'>
                      Sign up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
