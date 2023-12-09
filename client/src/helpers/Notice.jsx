import React, { createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notice = createContext();

const NoticeContext = ({children}) => {
  return (
    <Notice.Provider value={{
      toast
    }}>
    <>
      <ToastContainer />
      {children}
    </>
    </Notice.Provider>
  )
}

export { Notice, NoticeContext}
