import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  const { category_id, change } = await request.json()

  try {
    const beforeCategory = await prisma.category.findUnique({
      where: { category_id },
    })

    if (!beforeCategory) {
      return new Response(null, { status: 404 })
    }

    const targetCategory = await prisma.category.findFirst({
      where: { category_order: beforeCategory.category_order + change },
    })

    if (!beforeCategory || !targetCategory) {
      return new Response(null, { status: 404 })
    }

    const target = targetCategory.category_id

    // 트랜잭션 시작
    await prisma.$transaction([
      prisma.category.update({
        where: { category_id },
        data: { category_order: { set: targetCategory.category_order } },
      }),
      prisma.category.update({
        where: { category_id: target },
        data: { category_order: { set: beforeCategory.category_order } },
      }),
    ])

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error('Error swapping category_order:', error)
    return new Response(null, { status: 500 })
  }
}
