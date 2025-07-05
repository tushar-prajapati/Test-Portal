import React from 'react'

const Legend = ({ color, label }) => {
  return (
    
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <span className="text-gray-500 navText text-sm">{label}</span>
        </div>
      
  )
}

export default Legend