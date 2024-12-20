import prisma from '@/libs/prisma'
import { Branch } from '@/types/branch'

export async function POST(request: Request) {
  const { branch_id, branch_name } = (await request.json()) as Branch

  const branch = await prisma.branch.create({
    data: {
      branch_name,
    },
  })

  if (!branch) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
