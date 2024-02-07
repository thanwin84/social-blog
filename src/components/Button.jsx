import React from 'react'

export default function Button(
  {
    type='button',
    className,
    category="primary",
    children,
    ...props
  }
){
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    link: "bg-white text-blue-600 hover:underline"
  }
  return (
    <div>
      <button 
        {...props}
        className={`px-4 py-2 rounded  ${styles[category]} ${className}`}
      >
        {children}
      </button>
    </div>
  )
}