import prisma from '@/libs/prisma'

export async function POST(request: Request) {
  const {
    user_id,
    branch_id,
    consulting_tag,
    consulting_content,
    consulting_detail,
    consulting_phone,
    consulting_consultant,
    consulting_wishdate,
    consulting_checked,
  } = await request.json()

  console.log(
    user_id,
    branch_id,
    consulting_tag,
    consulting_content,
    consulting_detail,
    consulting_phone,
    consulting_consultant,
    consulting_wishdate,
    consulting_checked,
  )

  const consulting = await prisma.consulting.create({
    data: {
      consulting_detail,
      user_id,
      branch_id,
      consulting_tag,
      consulting_content,

      consulting_phone,
      consulting_consultant,
      consulting_wishdate,
      consulting_checked,
    },
  })

  if (!consulting) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
