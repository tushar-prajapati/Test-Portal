import React from 'react'

const WhiteModal = ({children, height}) => {
  return (
    <div
    style={{ boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.3)" }}
    className={`p-2 mt-10 ${height} w-full bg-[#f4f4f4]  py-4 pt-3 text-white shadow-lg shadow-gray-400 rounded-2xl`}>
        {children}
    </div>
  )
}

export default WhiteModal