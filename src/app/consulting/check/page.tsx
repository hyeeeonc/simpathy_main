import React from 'react'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import ConsultingCheck from '@/containers/consulting/ConsultingCheck'

async function ConsultingPage() {
  const currentUser = await getCurrentUser()

  if (currentUser) {
    const userBranch = await prisma.branch.findUnique({
      where: {
        branch_id: currentUser?.branch_id,
      },
    })

    const notChecked: any[] = []
    const checked: any[] = []
    const finished: any[] = []

    const userConsulting = await prisma.consulting
      .findMany({
        where: {
          user_id: currentUser?.user_id,
        },
      })
      .then(consulting => {
        consulting.map(consult => {
          if (consult.consulting_checked === 0) {
            notChecked.push(consult)
          } else if (consult.consulting_checked === 1) {
            checked.push(consult)
          } else if (consult.consulting_checked === 2) {
            finished.push(consult)
          }
        })
        return [...notChecked, ...checked, ...finished]
      })

    return (
      <>
        <div className="w-full  mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            상담 신청
          </div>
          <ConsultingCheck
            notChecked={notChecked}
            checked={checked}
            finished={finished}
            consulting={userConsulting}
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
