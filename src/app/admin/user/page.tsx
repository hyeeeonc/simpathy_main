import React from 'react'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import AdminManage from '@/containers/admin/manage/AdminManage'
import AdminUser from '@/containers/admin/user/AdminUser'

async function AdminUserPage() {
  const currentUser = await getCurrentUser()

  if (currentUser && currentUser.grade_id <= 2) {
    return (
      <>
        <div className="w-full  mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            유저 관리
          </div>
          <AdminUser />
        </div>
      </>
    )
  } else return <div>접근 권한이 없습니다</div>
}

export default AdminUserPage
