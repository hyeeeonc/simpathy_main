import prisma from '@/libs/prisma'
import { Branch } from '@/types/branch'

export async function POST(request: Request) {
  const {
    branch_id,
    branch_name,
    branch_textbook,
    branch_textbook_total,
    branch_textbook_now,
    branch_textbook_preview,
    branch_text_now,
    branch_text_preview,
  } = (await request.json()) as Branch

  const branch = await prisma.branch.create({
    data: {
      branch_name,
      branch_textbook,
      branch_textbook_total,
      branch_textbook_now,
      branch_textbook_preview,
      branch_text_now,
      branch_text_preview,
    },
  })

  if (!branch) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
