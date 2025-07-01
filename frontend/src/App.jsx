import React from 'react'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
// import Navigation from './pages/Auth/Navigation'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
    <ToastContainer className='w-[100%]'/>
    {/* <Navigation /> */}
      <Outlet />
    </>
  )
}

export default App