import React from 'react'
import { IconType } from 'react-icons';


interface PopupItemProps {
    name: string;
    icon: IconType;
    href: string
}
const PopupItem: React.FC<PopupItemProps> = ({
    name, icon: Icon, href
}) => {
  return (
    <div className='flex space-x-3 p-3 hover:bg-gray-50/10'>
        <Icon className='text-white' size={20} /> 
        <p className='text-white text-[15px]'>{name}</p>
    </div>
  )
}

export default PopupItem