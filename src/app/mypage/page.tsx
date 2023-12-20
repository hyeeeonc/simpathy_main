import React from 'react'
import prisma from '@/libs/prisma'

import { getServerSession } from 'next-auth'
import getCurrentUser from '@/services/getCurrentUser'
import { User } from '@/types/auth'
import MyPageUser from '@/containers/mypage/MyPageUser'
import MyPageProgress from '@/containers/mypage/MyPageProgress'
import AdminMain from '@/containers/admin/manage/AdminManage'
import MyPagePosting from '@/containers/mypage/MyPagePosting'
import MyPageAdmin from '@/containers/mypage/MyPageAdmin'
// import MyPageUser from '@/containers/mypage/MyPageUser'

async function Mypage() {
  const currentUser = await getCurrentUser()

  if (currentUser && currentUser.grade_id > 0) {
    const currentUserBranch = await prisma.branch.findUnique({
      where: { branch_id: currentUser?.branch_id },
    })
    const currentUserGrade = await prisma.grade.findUnique({
      where: { grade_id: currentUser?.grade_id },
      select: { grade_name: true },
    })
    const currnetUserReplies = await prisma.reply.count({
      where: { user_id: currentUser?.user_id },
    })
    const currentUserBoards = await prisma.post.count({
      where: { user_id: currentUser?.user_id },
    })
    console.log(currentUserBoards)

    if (currentUserBranch) {
      return (
        <>
          <MyPageUser
            name={currentUser?.user_name}
            email={currentUser?.user_id}
            branchName={currentUserBranch.branch_name}
          />
          <MyPagePosting
            grade={currentUserGrade?.grade_name || ''}
            replies={currnetUserReplies}
            boards={currentUserBoards}
            questions={0}
          />
          {currentUser.grade_id > 1 && (
            <MyPageProgress
              totalPage={currentUserBranch.branch_textbook_total || 0}
              nowPage={currentUserBranch.branch_textbook_now || 0}
              previewPage={currentUserBranch.branch_textbook_preview || 0}
              nowText={currentUserBranch.branch_text_now || ''}
              previewText={currentUserBranch.branch_text_preview || ''}
              branchName={currentUserBranch.branch_name}
              textbook={currentUserBranch.branch_textbook || ''}
            />
          )}
          {currentUser.grade_id === 1 && <MyPageAdmin />}
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
