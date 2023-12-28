import prisma from '@/libs/prisma'

export async function GET() {
  const categories = await prisma.category.findMany()
  if (!categories) return new Response(null, { status: 404 })
  else return new Response(JSON.stringify(categories))
}

export const dynamic = 'force-dynamic'
