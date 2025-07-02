import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { useLocation } from 'react-router-dom'

const Title = () => {
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/register";
  return (
    <>
    <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
        <h2 className="text-2xl mt-6 font-semibold  mb-1">Sign in to your account</h2>
        <p className="mt-2 text-sm text-gray-600 mb-6">
          Don’t have an account?{" "}
          <NavLink
              to={redirect? `/register?redirect=${redirect}`: '/register'}
              className="font-semibold text-black hover:underline cursor-pointer"
            >
            Create an account
            </NavLink>
        </p>
    </>
  )
}

export default Title