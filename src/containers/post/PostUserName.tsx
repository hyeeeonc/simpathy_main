'use client'

import Link from 'next/link'

const PostUserName = ({ user_id }: { user_id: string }) => {
  return (
    <Link href={`/board?searchType=writer&search=${user_id}`}>
      <p className="font-bold">{user_id}</p>
    </Link>
  )
}

export default PostUserName
