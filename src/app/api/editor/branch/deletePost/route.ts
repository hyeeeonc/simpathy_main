import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export async function DELETE(request: Request) {
  const session = await getServerSession()
  const { post_id } = await request.json()

  const post = await prisma.branchpost.findUnique({
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
    const delete_post = await prisma.branchpost.delete({
      where: {
        post_id,
      },
    })

    if (!delete_post) return new Response(null, { status: 500 })
    else return new Response(null, { status: 200 })
  } else return new Response(null, { status: 401 })
}
