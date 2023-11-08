'use client'

import React, { useState, useCallback }from 'react'
import Image from 'next/image'
import { items, menuitems } from '@/app/constants'
import MenuItem from './MenuItem'
import { AiOutlineMenu } from 'react-icons/ai'
import { signOut } from 'next-auth/react'
import PopupItem from './PopupItem'
import { FaThreads } from 'react-icons/fa6'
import useUploadModal from '@/app/hooks/useUploadModal'



const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false)
    const uploadModal = useUploadModal()

    const handleClick = useCallback((idx:number) => {
        setActiveIndex(idx)

        if (idx === 6) {
            uploadModal.onOpen();
        } else{
            uploadModal.onClose()
        }
      },[uploadModal],
    )
    
    const onClick = useCallback(() => {
        setIsOpen((prev) => !prev)
    },[])

  return (
   
        <div className='px-5 lg:w-[300px] w-[100px] bg-black min-h-screen relative z-1'>
            <div className='py-5'>
                <Image
                    src='/images/logo.png'
                    className='text-white'
                    alt='Logo'
                    height={35}
                    width={120}
                />
            </div>
            <div>
                {menuitems.map(({name, icon, href, activeIcon}, idx) => (
                    <MenuItem 
                        key={name}
                        index={idx}
                        name={name} 
                        icon={icon} 
                        href={href} 
                        onClick={() => handleClick(idx)} 
                        activeIcon={activeIcon}
                        activeIndex={activeIndex}
                    />
                ))}
            </div>
            <div className='py-7' onClick={onClick}>
                <div className=' hover:bg-gray-50/10 flex space-x-3  items-center py-3 px-2 rounded-lg cursor-pointer group'>
                    <AiOutlineMenu size={30} className='text-white group-hover:scale-105 group-active:scale-90'/>
                    <p className='hidden lg:block text-white text-[15px]'>More</p>
                </div>
            </div>
            {isOpen && (
                <div className='absolute bottom-20 space-y-4 flex flex-col bg-[#262626] py-4 w-[260px] rounded-lg'>
                    <div className=''>
                        {items.map(({name, icon, href}) => (
                            <PopupItem 
                                key={name}
                                name={name} 
                                icon={icon}
                                href={href}
                            />
                        ))}
                    </div>
                    <div className='border-gray-50/20 border-y-4 px-3 py-6 flex items-center space-x-3 hover:bg-gray-50/10'>
                        <FaThreads size={20} className="text-white"/>
                        <p className='text-white'>Threads</p>
                    </div>
                    <div className='border-b border-gray-50/20  x hover:bg-gray-50/10 p-3 rounded-lg'>
                        <p className='text-white'>Switch Accounts</p>
                    </div>
                    <div onClick={() => signOut()} className='p-3 hover:bg-gray-50/10'>
                        <p className='text-white '>Log out</p>
                    </div>
                </div>
            )}
        </div>
   
  )
}

export default Sidebar