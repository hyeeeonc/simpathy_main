import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  const {
    user_id,
    user_name,
    user_phone,
    user_parent_phone,
    grade_id,
    branch_id,
  } = await request.json()

  const user = await prisma.user.update({
    where: {
      user_id,
    },
    data: {
      user_name,
      user_phone,
      user_parent_phone,
      grade_id,
      branch_id,
    },
  })

  if (!user) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
