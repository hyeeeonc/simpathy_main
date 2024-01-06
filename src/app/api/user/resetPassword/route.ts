import prisma from '@/libs/prisma'
import * as bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'

export async function PUT(request: Request) {
  try {
    const session = await getServerSession()
    const user = await prisma.user.findFirst({
      where: {
        user_id: session?.user.email,
      },
    })

    const { user_id } = await request.json()

    if (user && user.grade_id === 1) {
      const new_user = await prisma.user.update({
        where: {
          user_id,
        },
        data: {
          user_pw: await bcrypt.hash('123456', 10),
        },
      })

      if (!new_user) return new Response(null, { status: 500 }) // 서버 에러
      else return new Response(null, { status: 200 })
    } else return new Response(null, { status: 403 }) // 권한 없음
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 }) // 서버 에러
  }
}
