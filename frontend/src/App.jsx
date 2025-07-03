import React from 'react'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
    <ToastContainer className='w-[100%]'/>
      <Outlet />
    </>
  )
}

export default App