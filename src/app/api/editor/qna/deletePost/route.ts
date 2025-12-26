import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export async function PUT(request: Request) {
  const session = await getServerSession()
  const { post_id } = await request.json()

  const post = await prisma.qnapost.findUnique({
    where: {
      post_id,
    },
  })

  const user = await prisma.user.findFirst({
    where: {
      user_id: session?.user.email,
    },
  })

  if (post && user && user.grade_id === 1) {
    const delete_post = await prisma.qnapost.update({
      where: { post_id },
      data: { user_id: '(알 수 없음)' },
    })

    if (!delete_post) return new Response(null, { status: 500 })
    else return new Response(null, { status: 200 })
  } else return new Response(null, { status: 401 })
}
