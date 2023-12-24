import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  const { category_id, category_name } = await request.json()

  const board = await prisma.category.update({
    where: { category_id },
    data: { category_name },
  })

  if (!board) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
