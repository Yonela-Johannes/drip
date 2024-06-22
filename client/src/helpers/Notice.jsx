import React, { createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notice = createContext();

const NoticeContext = ({ children }) =>
{
  return (
    <Notice.Provider value={{
      toast
    }}>
      <>
        <ToastContainer
          position="bottom-center"
          autoClose={2800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {children}
      </>
    </Notice.Provider>
  )
}

export { Notice, NoticeContext }
