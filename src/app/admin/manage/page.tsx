import React from 'react'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import AdminManage from '@/containers/admin/manage/AdminManage'

async function AdminPage() {
  const currentUser = await getCurrentUser()

  if (currentUser && currentUser.grade_id === 1) {
    return (
      <>
        <div className="w-full  mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            홈페이지 관리
          </div>
          <AdminManage />
        </div>
      </>
    )
  } else return <div>접근 권한이 없습니다</div>
}

export default AdminPage
