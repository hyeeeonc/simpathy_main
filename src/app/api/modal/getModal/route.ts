import prisma from '@/libs/prisma'

export async function GET() {
  const modal = await prisma.modal.findUnique({
    where: { modal_id: 1 },
  })
  if (!modal) return new Response(null, { status: 404 })
  else return new Response(JSON.stringify(modal))
}
