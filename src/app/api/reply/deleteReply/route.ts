import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export async function DELETE(request: Request) {
  const session = await getServerSession()
  const { reply_id } = await request.json()

  const reply = await prisma.reply.findUnique({
    where: {
      reply_id: reply_id,
    },
  })

  const user = await prisma.user.findFirst({
    where: {
      user_id: session?.user.email,
    },
  })

  if (
    reply &&
    user &&
    (reply.user_id === user.user_id || user.grade_id === 1)
  ) {
    const sub_reply = await prisma.reply.findMany({
      where: {
        origin_id: reply_id,
      },
    })

    if (sub_reply.length === 1)
      for (const sub of sub_reply) {
        const delete_sub_reply = await prisma.reply.delete({
          where: {
            reply_id: sub.reply_id,
          },
        })

        if (!delete_sub_reply) return new Response(null, { status: 500 })
      }

    const delete_reply = await prisma.reply.delete({
      where: {
        reply_id: reply_id,
      },
    })

    if (!delete_reply) return new Response(null, { status: 500 })
    else return new Response(null, { status: 200 })
  } else return new Response(null, { status: 401 })
}
