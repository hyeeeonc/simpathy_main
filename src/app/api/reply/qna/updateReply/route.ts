import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export async function PUT(request: Request) {
  const session = await getServerSession()
  const { post_id, reply_id, reply_content } = await request.json()

  const post = await prisma.qnapost.findUnique({
    where: {
    post_id,
    },
  })

  const reply = await prisma.qnareply.findUnique({
    where: {
    reply_id,
    },
  })

  const user = await prisma.user.findFirst({
    where: {
    user_id: session?.user.email,
    },
  })

  if (post && reply && user && user.grade_id === 1) {
    const update_reply = await prisma.qnareply.update({
      where: { reply_id },
      data: {
        reply_content,
      },
    })

    if (!update_reply) return new Response(null, { status: 500 })
    else return new Response(null, { status: 200 })
  }
  return new Response(null, { status: 401 })

}
