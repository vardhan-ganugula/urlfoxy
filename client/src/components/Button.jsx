import React from 'react'

const Button = ({
    variant = 'default',
    color = 'white',
    children,
    bolded = 'false'
}) => {
  return (
    <button className={`
        px-5 py-2 cursor-pointer ${
            variant === 'default' ? 'bg-[#A1E231] text-black rounded-full' : 
            variant === 'outline' ? 'bg-black border-2 border-[#A1E231] text-[#A1E231] rounded-full' : '' 
        }

        ${
            bolded && 'font-bold'
        }
    `}>
        {children}
    </button>
  )
}

export default Button