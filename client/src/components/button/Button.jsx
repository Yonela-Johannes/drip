import React from 'react'

const Button = ({text}) => {
  return (
    <div className="w-full text-black bg-pink hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      {text}
    </div>
  )
}

export default Button
