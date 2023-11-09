'use client'

import { bottomappbaritems } from '@/app/constants'
import React, { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import useUploadModal from '@/app/hooks/useUploadModal';

const BottomAppbar = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
  return (
    <div className='fixed bottom-0 w-full h-20'>
        <div className='p-1 flex md:hidden'>
            {bottomappbaritems.map(({name, icon, href, activeIcon}, idx) => (
                <div className='flex-grow' key={name}>
                    <MenuItem 
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