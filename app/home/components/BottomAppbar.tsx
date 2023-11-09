'use client'

import { bottomappbaritems } from '@/app/constants'
import React, { useCallback, useState } from 'react'
import useUploadModal from '@/app/hooks/useUploadModal';
import BottombarItem from './BottombarItem';

const BottomAppbar = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const uploadModal = useUploadModal()

    const handleClick = useCallback((idx:number) => {
        setActiveIndex(idx)

        if (idx === 4) {
            uploadModal.onOpen();
        } else{
            uploadModal.onClose()
        }
      },[uploadModal],
    )
  return (
    <div className='fixed z-10 bg-black bottom-0 w-full h-15 border-t border-gray-50/20'>
        <div className='p-1 flex md:hidden'>
            {bottomappbaritems.map(({name, icon, href, activeIcon}, idx) => (
                <div className='flex-grow' key={name}>
                    <BottombarItem 
                        key={name}
                        name={name}
                        activeIcon={activeIcon}
                        onClick={() => handleClick(idx)}
                        href={href}
                        icon={icon}
                        index={idx}
                        activeIndex={activeIndex}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default BottomAppbar