import React from 'react'
import usePosts from '../hooks/usePosts'
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
