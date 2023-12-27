import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  const { board_id, change } = await request.json()

  try {
    const beforeBoard = await prisma.board.findUnique({
      where: { board_id },
    })

    if (!beforeBoard) {
      return new Response(null, { status: 404 })
    }

    const targetBoard = await prisma.board.findFirst({
      where: {
        category_id: beforeBoard.category_id,
        board_order: beforeBoard.board_order + change,
      },
    })

    if (!beforeBoard || !targetBoard) {
      return new Response(null, { status: 404 })
    }

    const target = targetBoard.board_id

    // 트랜잭션 시작
    await prisma.$transaction([
      prisma.board.update({
        where: { board_id },
        data: { board_order: { set: targetBoard.board_order } },
      }),
      prisma.board.update({
        where: { board_id: target },
        data: { board_order: { set: beforeBoard.board_order } },
      }),
    ])

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error('Error swapping category_order:', error)
    return new Response(null, { status: 500 })
  }
}
