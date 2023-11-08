import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface AvatarProps {
    user?: User | null
}

const Avatar: React.FC<AvatarProps>= ({
    user
}) => {
  return (
    <div className='rounded-full'>
        <Image 
            src={user?.profileImage || '/images/placeholder.jpg'}
            width={30}
            height={30}
            objectFit='contain'
            alt='Avatar'
            className='rounded-full'
        />
    </div>
  )
}

export default Avatar