import PostCard from '@/app/components/PostCard'
import usePosts from '@/app/hooks/usePosts'
import { Post } from '@prisma/client'
import React from 'react'

const HomePage = () => {
    const {data: homePosts, isLoading, error, mutate:mutateHomePosts} = usePosts()
    return (
      <div className='border-l border-gray-800 h-full overflow-y-scroll'>
        {homePosts.map((item:Post) => (
          <PostCard 
              key={item.id}
              item={item}
          />
        ))}
      </div>
    )
}

export default HomePage