import React from 'react'

import getCurrentUser from '@/services/getCurrentUser'
import AdminBranch from '@/containers/admin/branch/AdminBranch'
import AdminBranchAdd from '@/containers/admin/branch/AdminBranchAdd'

async function BranchPage() {
  const currentUser = await getCurrentUser()

  if (currentUser && currentUser.grade_id === 1) {
    return (
      <>
        <div className="w-full  mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            지점 관리
          </div>
          <AdminBranch />
          <AdminBranchAdd />
        </div>
      </>
    )
  } else return <div>접근 권한이 없습니다</div>
}

export default BranchPage
