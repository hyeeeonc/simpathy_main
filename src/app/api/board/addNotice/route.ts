import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  const { post_id } = await request.json()

  const post = await prisma.post.update({
    where: { post_id },
    data: {
      isNotice: true,
    },
  })

  if (!post) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
