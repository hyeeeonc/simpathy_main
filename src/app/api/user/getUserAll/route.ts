import prisma from '@/libs/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  if (!users) return new Response(null, { status: 404 })
  else return new Response(JSON.stringify(users))
}

export const dynamic = 'force-dynamic'
