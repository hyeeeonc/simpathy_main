import prisma from '@/libs/prisma'
import { Branch } from '@/types/branch'

export async function PUT(request: Request) {
  const { branch_id, branch_name } = (await request.json()) as Branch

  try {
    const existingBranch = await prisma.branch.findUnique({
      where: { branch_id },
    })

    if (!existingBranch) {
      return new Response(null, { status: 404 })
    }

    const updatedBranch = await prisma.branch.update({
      where: { branch_id },
      data: {
        branch_name,
      },
    })

    return new Response(JSON.stringify(updatedBranch), { status: 200 })
  } catch (error) {
    console.error('Error updating branch:', error)
    return new Response(null, { status: 500 })
  }
}
