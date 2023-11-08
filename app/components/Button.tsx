import React from 'react'

interface ButtonProps {
    type: "submit" | 'button' | 'reset';
    disabled:boolean
    children: React.ReactNode
}

const Button:React.FC<ButtonProps> = ({
    disabled, type,children
}) => {
  return (
    <div className='items-center w-full'>
        <button
            type={type}
            disabled={disabled}
            className='w-full text-white rounded-lg bg-[#0095f6] p-1 mt-3 '
        >
            {children}
        </button>
    </div>
  )
}

export default Button