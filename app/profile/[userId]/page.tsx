import getCurrentUser from '@/app/actions/getCurrentUser'
import Avatar from '@/app/home/components/Avatar'
import Image from 'next/image'
import React from 'react'

interface UserProfileProps {
  params: {
    userId: string
  }
}

const UserProfile:React.FC<UserProfileProps> = async ({
  params
}) => {

  const currentUser = await getCurrentUser()

  console.log(params.userId)
  return (
    <div className='h-full overflow-y-auto flex flex-col justify-center pt-5 px-3'>
      <div className='border-b border-gray-50/20'>
        <div className='w-1/3 items-center justify-center'>
          <Avatar />
        </div>
      </div>
      <div className='w-2/3'>

      </div>
    </div>
  )
}

export default UserProfile