import prisma from '@/libs/prisma'

export async function GET() {
  const boards = await prisma.board.findMany()
  if (!boards) return new Response(null, { status: 404 })
  else return new Response(JSON.stringify(boards))
}

export const dynamic = 'force-dynamic'
