import React from 'react'

const WhiteModal2 = ({children}) => {
  return (
    <div
    className={`p-2 mt-2 hover:bg-gray-50 shadow-black  w-full bg-white shadow-xs z-1 py-4 pt-3 text-black   rounded-2xl`}>
        {children}
    </div>
  )
}

export default WhiteModal2