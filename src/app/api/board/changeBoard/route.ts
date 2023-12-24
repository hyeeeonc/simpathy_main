import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  const {
    board_id,
    board_name,
    board_read_auth,
    board_write_auth,
    category_id,
  } = await request.json()

  const board = await prisma.board.update({
    where: { board_id },
    data: { board_name, board_read_auth, board_write_auth, category_id },
  })

  if (!board) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
