import React from 'react'
import prisma from '@/libs/prisma'

import getCurrentUser from '@/services/getCurrentUser'
import AdminConsultingCheck from '@/containers/admin/consulting/AdminConsultingCheck'
import getBranch from '@/services/getBranch'

async function AdminConsultingPage() {
  const currentUser = await getCurrentUser()

  if (currentUser && currentUser.grade_id <= 2) {
    const notChecked: any[] = []
    const checked: any[] = []
    const finished: any[] = []
    const branch = await getBranch()

    const userConsulting = await prisma.consulting
      .findMany()
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

        // checked 배열을 consulting_time을 기준으로 정렬
        checked.sort((a, b) => {
          const timeA = a.consulting_time
          const timeB = b.consulting_time

          // null 값이 있다면 null을 맨 앞으로 오도록 처리
          if (timeA === null && timeB === null) return 0
          if (timeA === null) return -1
          if (timeB === null) return 1

          // Date 객체로 변환하여 비교
          const dateA = new Date(timeA as string)
          const dateB = new Date(timeB as string)

          return dateA.getTime() - dateB.getTime()
        })

        // checked 배열을 consulting_time을 기준으로 정렬
        finished.sort((a, b) => {
          const timeA = a.consulting_time
          const timeB = b.consulting_time

          // null 값이 있다면 null을 맨 앞으로 오도록 처리
          if (timeA === null && timeB === null) return 0
          if (timeA === null) return -1
          if (timeB === null) return 1

          // Date 객체로 변환하여 비교
          const dateA = new Date(timeA as string)
          const dateB = new Date(timeB as string)

          return dateA.getTime() - dateB.getTime()
        })

        return [...notChecked, ...checked, ...finished]
      })

    return (
      <>
        <div className="w-full  mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            상담 관리
          </div>
          <AdminConsultingCheck
            notChecked={notChecked}
            checked={checked}
            finished={finished}
            consulting={userConsulting}
            branch={branch}
          />
        </div>
      </>
    )
  } else return <div>접근 권한이 없습니다</div>
}

export default AdminConsultingPage
