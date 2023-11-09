import React, { Dispatch, SetStateAction } from 'react'
import { IconType } from 'react-icons'
import Avatar from './Avatar';

interface MenuItemProps {
    name:string,
    icon: IconType,
    href: string,
    isactive?: boolean,
    activeIcon: IconType;
    onClick: () => void,
    activeIndex: number | null,
    index: number | null,

}

const MenuItem: React.FC<MenuItemProps> = ({
    name, icon: Icon, href,isactive, activeIcon: ActiveIcon, onClick, activeIndex, index
}) => {
  return (
    <div className='group'>
    <div onClick={onClick} className='flex space-x-3 py-3 px-2 items-center cursor-pointer hover:bg-gray-50/10 hover:rounded-lg'>
        <p className={`${index === 7 ? 'hidden': "block"} group-hover:scale-105`}>
            {index === activeIndex ? (
                <ActiveIcon className='text-white'  size={30} />
            ): (
                <Icon className='text-white' size={30}/>
            )} 
        </p>
        <div className={`${index === 7 ? 'block': "hidden"} group-hover:scale-105 -pl-5`}>
            {index == 7 && <Avatar />}
        </div>
        <p className='hidden lg:block text-[15px]  text-white'>
            {name}
        </p>
    </div>
    </div>
  )
}

export default MenuItem

