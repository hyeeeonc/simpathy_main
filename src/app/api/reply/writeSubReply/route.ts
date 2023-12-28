import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  const session = await getServerSession()
  const { post_id, reply_content, origin_id } = await request.json()

  const reply = await prisma.reply.create({
    data: {
      user_id: session?.user.email,
      post_id: post_id,
      reply_content: reply_content,
      origin_id: origin_id,
      reply_upload_time: new Date(),
    },
  })

  if (!reply) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
