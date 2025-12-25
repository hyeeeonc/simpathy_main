import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export async function DELETE(request: Request) {
  const session = await getServerSession()
  const { post_id } = await request.json()

  const post = await prisma.post.findUnique({
    where: {
      post_id,
    },
  })

  const user = await prisma.user.findFirst({
    where: {
      user_id: session?.user.email,
    },
  })

  if (post && user && (post.user_id === user.user_id || user.grade_id === 1)) {
    let result: any

    if (post.board_id === 13) {
      result = await prisma.post.update({
        where: { post_id },
        data: { user_id: '(알 수 없음)' },
      })
    } else {
      result = await prisma.post.delete({
        where: {
          post_id,
        },
      })
    }

    if (!result) return new Response(null, { status: 500 })
    else return new Response(null, { status: 200 })
  } else return new Response(null, { status: 401 })
}
