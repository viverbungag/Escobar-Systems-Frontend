import { Zoom, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react'

const Toast = () => {
  return (
    <ToastContainer
        position="bottom-center"
        theme='dark'
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        transition={Zoom}
    />
  )
}

export default Toast