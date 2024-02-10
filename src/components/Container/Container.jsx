import React from 'react'

function Container({children, className}) {
  return (
  <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg ${className}`}>
        {children}
    </div>
  )
  
}

export default Container