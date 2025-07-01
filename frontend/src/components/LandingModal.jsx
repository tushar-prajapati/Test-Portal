import React from 'react'

const LandingModal = ({children, isOpen}) => {
  return (
<div className="fixed inset-0 z-10 flex items-center justify-center">
<div className=" max-w-full bg-white shadow-2xl rounded-2xl px-8 py-10 border border-black">
  {isOpen && children}
</div>
</div>

  )
}

export default LandingModal