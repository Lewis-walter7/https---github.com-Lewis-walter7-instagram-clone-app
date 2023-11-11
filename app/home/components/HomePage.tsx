'use client'

import PostCard from '@/app/components/PostCard'
import usePosts from '@/app/hooks/usePosts'
import { Post } from '@prisma/client'
import React from 'react'

const HomePage = () => {
    const {data: homePosts, isLoading, error, mutate:mutateHomePosts} = usePosts()
    return (
      <div className='border-l border-gray-800 h-full overflow-y-scroll'>
        {homePosts.length > 0 && homePosts.map((item:Post) => (
          <PostCard 
              key={item.id}  // Assuming item[0] is the Record and has an id field
              item={item}
          />
        ))}
      </div>
    )
}

export default HomePage