import { Post } from '@prisma/client'
import React from 'react'


interface PostCardProps {
    item?: Post | null
}
const PostCard: React.FC<PostCardProps> = ({
    item
}) => {
  return (
    <div>
        <div>
            hey
        </div>
    </div>
  )
}

export default PostCard