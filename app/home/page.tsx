'use client'

import React from 'react'
import PostCard from '../components/PostCard'
import usePosts from '../hooks/usePosts'
import { Post } from '@prisma/client'
import HomePage from './components/HomePage'

const page = () => {

  const {data: homePosts, isLoading, error, mutate:mutateHomePosts} = usePosts()
  return (
    <div className='border-l border-gray-800 h-full overflow-y-scroll'>
      <HomePage />
    </div>
  )
}

export default page