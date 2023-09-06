import prisma from '@/libs/prisma'

import { getServerSession } from 'next-auth'

export default async function getCurrentUser() {
  try {
    const session = await getServerSession()

    // 유저 ID가 없으면 로그인 x
    if (!session?.user?.email) {
      return null
    }

    // DB에서 해당 ID를 가진 유저 객체 추출
    const { password, ...currentUser } = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    // 잘못된 유저 ID인 경우 로그인 x
    if (!currentUser) {
      return null
    }

    // 추출된 유저 객체 return
    return currentUser
  } catch (error) {
    // 에러 발생 시 로그인 x
    return null
  }
}
