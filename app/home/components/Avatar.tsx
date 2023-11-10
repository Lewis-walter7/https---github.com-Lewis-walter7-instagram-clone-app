import { User } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface AvatarProps {
    user?: User | null
}

const Avatar: React.FC<AvatarProps>= ({
    user
}) => {
  const router = useRouter();

  const handleClick = (e:any) => {
    e.stopPropagation();

    const url = `/profile/${user?.id}`
    router.push(url)
  }
  return (
    <div className='rounded-full' onClick={handleClick}>
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