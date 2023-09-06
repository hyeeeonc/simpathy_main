import React from 'react'
import prisma from '@/libs/prisma'

import { getServerSession } from 'next-auth'
import getCurrentUser from '@/services/getCurrentuser'
import { User } from '@/types/auth'
import MyPageUser from '@/containers/mypage/MyPageUser'
// import MyPageUser from '@/containers/mypage/MyPageUser'

async function Mypage() {
  const currentUser = await getCurrentUser()
  const currentUserBranch = (
    await prisma.branch.findUnique({
      where: { branch_id: currentUser?.branch },
      select: { branch_name: true },
    })
  )?.branch_name
  console.log(currentUserBranch)

  if (currentUser && currentUserBranch) {
    return (
      <>
        <MyPageUser
          name={currentUser?.name}
          email={currentUser?.email}
          branchName={currentUserBranch}
        />
        {currentUser?.email}
        {currentUserBranch}
      </>
    )
  } else return <div>loading...</div>
}

export default Mypage
