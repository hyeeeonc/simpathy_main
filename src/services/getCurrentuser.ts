import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export default async function getCurrentUser() {
  try {
    const session = await getServerSession()
    console.log(session)
    // 유저 ID가 없으면 로그인 x
    if (!session?.user?.email) {
      return null
    }

    // DB에서 해당 ID를 가진 유저 객체 추출
    const user = await prisma.user.findUnique({
      where: {
        user_id: session.user.email,
      },
    })

    // 잘못된 유저 ID인 경우 로그인 x
    if (!user) {
      return null
    } else {
      const { user_pw, ...currentUser } = user
      return currentUser
    }

    // 추출된 유저 객체 return
  } catch (error) {
    // 에러 발생 시 로그인 x
    return null
  }
}
