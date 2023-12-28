import React from 'react'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import ConsultingMain from '@/containers/consulting/ConsultingMain'

async function ConsultingPage() {
  const currentUser = await getCurrentUser()
  if (currentUser) {
    const userBranch = await prisma.branch.findUnique({
      where: {
        branch_id: currentUser.branch_id,
      },
    })

    return (
      <>
        <div className="w-full  mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            상담 신청
          </div>
          <ConsultingMain
            id={currentUser?.user_id}
            branch_id={currentUser?.branch_id}
            name={currentUser?.user_name}
            branch={userBranch?.branch_name}
          />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="w-full  mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            상담 신청
          </div>
          오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </div>
      </>
    )
  }
}

export default ConsultingPage
