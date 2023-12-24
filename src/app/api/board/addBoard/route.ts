import prisma from '@/libs/prisma'

export async function POST(request: Request) {
  const body = await request.json()

  const board = await prisma.board.create({
    data: {
      board_name: body.board_name,
      board_read_auth: body.board_read_auth,
      board_write_auth: body.board_write_auth,
      category_id: body.category_id,
      board_order: body.board_order,
    },
  })

  if (!board) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
