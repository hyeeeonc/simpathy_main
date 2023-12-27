import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'
import * as bcrypt from 'bcrypt'

export async function PUT(request: Request) {
  try {
    const session = await getServerSession()

    const { before_pw, new_pw } = await request.json()

    const user = await prisma.user.findFirst({
      where: {
        user_id: session?.user.email,
      },
    })

    if (user && (await bcrypt.compare(before_pw, user.user_pw))) {
      const new_user = await prisma.user.update({
        where: {
          user_id: session?.user.email,
        },
        data: {
          user_pw: await bcrypt.hash(new_pw, 10),
        },
      })

      if (!new_user) return new Response(null, { status: 500 }) // 서버 에러
      else return new Response(null, { status: 200 })
    } else return new Response(null, { status: 401 }) // 비밀번호 안맞음
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 }) // Internal Server Error
  }
}
