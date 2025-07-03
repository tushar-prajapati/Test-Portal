import React from 'react'

const ToggleButton = ({value, handleToggle}) => {
  return (
    <>
    <label className="flex items-center cursor-pointer gap-3 text-gray-300">
      <div className="relative">
        <input
          type="checkbox"
          checked={value}
          onChange={handleToggle}
          className="sr-only"
        />
        <div className={`block w-8 h-4 rounded-full transition duration-300 ease-in-out ${value ? "bg-blue-600" : "bg-gray-600"}`}></div>
        <div
          className={`dot absolute  top-1 bg-white w-2 h-2 rounded-full transition transform duration-300 ease-in-out ${
            value ? "translate-x-6" : ""
          }`}
        ></div>
      </div>
    </label>
    </>
  )
}

export default ToggleButton