import useUser from '@/app/hooks/useUser'
import { User } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface AvatarProps {
    userId: string,
    isLarge?: boolean
}

const Avatar: React.FC<AvatarProps>= ({
    userId, isLarge
}) => {
  const router = useRouter();

  const {data: fetchedUser} = useUser(userId)

  const handleClick = (e:any) => {
    e.stopPropagation();

    const url = `/profile/${userId}`
    router.push(url)
  }
  return (
    <div className='rounded-full -ml-3' onClick={handleClick}>
        <Image 
            src={fetchedUser?.profileImage || '/images/placeholder.jpg'}
            width={`${isLarge ? 150 : 30}`}
            height={`${isLarge ? 150 : 30}`}
            objectFit='contain'
            alt='Avatar'
            className='rounded-full'
        />
    </div>
  )
}

export default Avatar