import React from 'react'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import MyPageUpdatePw from '@/containers/mypage/MyPageUpdatePw'

async function ConsultingPage() {
  const currentUser = await getCurrentUser()

  return (
    <>
      <div className="w-full  mt-20">
        <div className="text-sky-800 text-3xl font-bold mb-10 ">
          비밀번호 변경
        </div>
        <MyPageUpdatePw />
      </div>
    </>
  )
}

export default ConsultingPage
