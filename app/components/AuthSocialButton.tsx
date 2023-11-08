import React from 'react'

import { IconType } from 'react-icons'


interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void
    label: string
}
const AuthSocialButton:React.FC<AuthSocialButtonProps> = ({
    icon: Icon, onClick, label
}) => {
  return (
    <div onClick={onClick} className='w-full cursor-pointer flex items-center justify-center space-x-3'>
        <Icon className='text-[#385185]'/>
        <p className='text-[#385185] text-[16px]'>{label}</p>
    </div>
  )
}

export default AuthSocialButton