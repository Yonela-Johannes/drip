import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const Global = createContext();

const GlobalContext = ({children}) => {
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [wishProducts, setWishProducts] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()?.pathname

  const refreshWishlist = async () => {
    if(user?._id){
      setLoading(true)
      const fetchWishlist = async () => {
        const response = await dispatch(getWishlist({userId: user?._id}));
        setWishProducts(response?.payload?.user?.wishlist);
        if(response?.payload?.success){
          setLoading(false)
        }
      }
      fetchWishlist()
    }
  }

  useEffect(() => {
    refreshWishlist()
  }, [user]);

  const logout = () => {
    window.localStorage.clear();
    navigate(location)
    toast.success('Logged out successfully');
    window.location.reload()
  };

  return (
    <Global.Provider value={{
      refreshWishlist,
      user,
      wishProducts,
      loading,
      logout
    }}>
    <>
      {children}
    </>
    </Global.Provider>
  )
}

export { Global, GlobalContext}
