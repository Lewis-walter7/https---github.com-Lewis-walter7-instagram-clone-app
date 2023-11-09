'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { IconType } from 'react-icons'
import Avatar from './Avatar';
import { useRouter } from 'next/navigation';

interface BottombarItemProps {
    name:string,
    icon: IconType,
    href?: string,
    isactive?: boolean,
    activeIcon: IconType;
    onClick: () => void,
    activeIndex: number | null,
    index: number | null,

}

const BottombarItem: React.FC<BottombarItemProps> = ({
    name, icon: Icon, href,isactive, activeIcon: ActiveIcon, onClick, activeIndex, index
}) => {
    const router = useRouter()
    const handleClick = () => {
        onClick()
        href && router.replace(href)
    }
  return (
    <div className='group'>
        <div onClick={handleClick} className='py-3 px-2 cursor-pointer hover:rounded-lg focus:bg-none'>
            <p className={`${index === 5 ? 'hidden': "block"} group-hover:scale-105`}>
                {index === activeIndex ? (
                    <ActiveIcon className='text-white' size={30} />
                ): (     
                    <Icon className='text-white' size={30}/>
                )} 
            </p>
            <div className={`${index === 5 ? 'block': "hidden"} group-hover:scale-105`}>
                {index == 5 && <Avatar />}
            </div>
        </div>
    </div>
  )
}

export default BottombarItem

