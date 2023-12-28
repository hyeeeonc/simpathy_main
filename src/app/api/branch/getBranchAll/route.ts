import prisma from '@/libs/prisma'

export async function GET() {
  const branches = await prisma.branch.findMany()
  if (!branches) return new Response(null, { status: 404 })
  else return new Response(JSON.stringify(branches))
}

export const dynamic = 'force-dynamic'
