'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, {useState, useCallback}from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiSolidChevronUp } from 'react-icons/bi'
import { BsPlusSquare } from 'react-icons/bs'

const TopAppbar = () => {
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  const handleClick = useCallback(
    () => {
      setIsClicked(true)
    },
    [],
  )
  const onClick = () => {
     router.replace('/create')
}
  
  return (
    <div className='fixed top-0 md:hidden w-full h-16 bg-black text-white p-3 border-b border-gray-50/20'>
        <div className='flex justify-between'>
          <div className='flex space-x-2 items-center'>
            <Image
              className='text-white'
              src='/images/logo.png'
              alt='Instagram'
              width={100}
              height={20}
            />
            <BiSolidChevronUp size={30} />
          </div>
          <div className='flex space-x-2 items-center'>
            <BsPlusSquare size={30}/>
            <p onClick={handleClick}>
              {isClicked ? (
                <AiFillHeart className='text-white' size={30}/>
              ): (
                <AiOutlineHeart className='text-white' size={30}/>
              )}
            </p>
          </div>
        </div>
    </div>
  )
}

export default TopAppbar