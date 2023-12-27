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
          // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
          const uploadTime = new Date(consult.consulting_time)

          // UTC+0 기준의 날짜 및 시간을 문자열로 변환
          const formattedDate =
            `${uploadTime.getUTCFullYear()}.${(uploadTime.getUTCMonth() + 1)
              .toString()
              .padStart(2, '0')}.${uploadTime
              .getUTCDate()
              .toString()
              .padStart(2, '0')} ` +
            `${uploadTime
              .getUTCHours()
              .toString()
              .padStart(2, '0')}.${uploadTime
              .getUTCMinutes()
              .toString()
              .padStart(2, '0')}`

          consult.consulting_time = consult.consulting_time
            ? formattedDate
            : '미정'

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
