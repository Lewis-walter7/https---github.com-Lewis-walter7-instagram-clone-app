'use client'

import Image from 'next/image'
import AuthForm from './components/forms/AuthForm'
import { useCallback, useEffect, useState } from 'react'


type Variant =  "LOGIN" | "REGISTER"

export default function Home() {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  
 
  return (
   <div className='w-full max-w-4xl md:flex md:space-x-10 md:items-center md:justify-center mx-auto max-h-[100vh] overflow-hidden'>
    <div>
      <div className='hidden md:inline-flex relative justify-end mt-6'>
        <Image
          src='/images/bgImage.jpg'
          className='h-full cursor-pointer'
          alt='Image'
          width={400}
          height={650}
          objectFit='contain'
        />
      </div>
    </div>
    <div className='mt-20 m-7 min-h-screen'>
      <div className='flex flex-col justify-center sm:w-[400px] w-full h-full items-center border border-gray-400 p-3'>
        <div className='flex justify-center w-full'>
          <Image
            src='/images/logo.png'
            width={200}
            height={20}
            className='bg-white'
            objectFit='contain'
            alt='Logo'
          />
        </div>
        <div>
          <AuthForm/>
          {/* <Input type="text" /> */}
        </div>
      </div>
    </div>
   </div>
  )
}
