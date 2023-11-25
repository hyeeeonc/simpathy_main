import prisma from '@/libs/prisma'

export async function GET() {
  const grades = await prisma.grade.findMany()
  if (!grades) return new Response(null, { status: 404 })
  else return new Response(JSON.stringify(grades))
}
