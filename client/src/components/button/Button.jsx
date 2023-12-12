import React from 'react'

const Button = ({color, text}) => {
  return (
    <div className={`w-full text-black ${color ? "bg-gray-200": "bg-pink"} hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer`}>
      {text}
    </div>
  )
}

export default Button
