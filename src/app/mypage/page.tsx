import React from 'react'
import prisma from '@/libs/prisma'

import { getServerSession } from 'next-auth'
import getCurrentUser from '@/services/getCurrentUser'
import { User } from '@/types/auth'
import MyPageUser from '@/containers/mypage/MyPageUser'
import MyPageProgress from '@/containers/mypage/MyPageProgress'
import AdminMain from '@/containers/admin/AdminMain'
import MyPagePosting from '@/containers/mypage/MyPagePosting'
// import MyPageUser from '@/containers/mypage/MyPageUser'

async function Mypage() {
  const currentUser = await getCurrentUser()
  if (currentUser && currentUser.grade > 0) {
    const currentUserBranch = (
      await prisma.branch.findUnique({
        where: { branch_id: currentUser?.branch },
        select: { branch_name: true },
      })
    )?.branch_name

    if (currentUserBranch) {
      return (
        <>
          <MyPageUser
            name={currentUser?.name}
            email={currentUser?.email}
            branchName={currentUserBranch}
          />
          <MyPagePosting />
          {currentUser.grade > 1 && (
            <MyPageProgress
              branchName={currentUserBranch}
              branchProgress={30}
              textbook={'심찬우화 N제'}
            />
          )}
          {currentUser.grade === 1 && <AdminMain />}
        </>
      )
    } else
      return (
        <div>
          사용자를 확인할 수 없습니다.
          <br />
          다시 로그인해 주세요
        </div>
      )
  } else
    return (
      <div>
        사용자를 확인할 수 없습니다.
        <br />
        다시 로그인해 주세요
      </div>
    )
}

export default Mypage
