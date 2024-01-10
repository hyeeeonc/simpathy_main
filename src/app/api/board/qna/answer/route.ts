import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser()
    const { post_id } = await request.json()

    if (user && user.grade_id <= 2) {
      const post = await prisma.qnapost.update({
        where: { post_id },
        data: { post_isAnswered: 1 },
      })
      if (!post) return new Response(null, { status: 404 })
      return new Response(null, { status: 200 })
    } else {
      // 권한 x
      return new Response(null, { status: 403 })
    }
  } catch (error) {
    console.error('Error swapping category_order:', error)
    return new Response(null, { status: 500 })
  }
}
