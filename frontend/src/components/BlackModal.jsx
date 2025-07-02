import React from 'react'

const BlackModal = ({children, onClick}) => {
  return (
    <div
    onClick={onClick}
    className='w-full hover:bg-[#212121] py-6 cursor-pointer text-white shadow-lg shadow-gray-600 rounded-3xl bg-black'>
        {children}
    </div>
  )
}

export default BlackModal