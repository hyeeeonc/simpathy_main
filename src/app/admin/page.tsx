import React from 'react'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'

async function AdminPage() {
  const currentUser = await getCurrentUser()

  if (currentUser && currentUser.grade_id === 1) {
    return (
      <>
        <div className="w-full text-3xl font-bold mt-20">관리자 페이지</div>
      </>
    )
  } else return <div>접근 권한이 없습니다</div>
}

export default AdminPage
