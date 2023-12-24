import prisma from '@/libs/prisma'

export async function POST(request: Request) {
  const { category_name, category_order } = await request.json()

  const category = await prisma.category.create({
    data: {
      category_name,
      category_order,
    },
  })

  if (!category) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
