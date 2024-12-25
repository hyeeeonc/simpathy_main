import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  const { modal_contents, modal_endtime } = await request.json()
  console.log(modal_contents, modal_endtime)

  const post = await prisma.modal.update({
    where: { modal_id: 1 },
    data: {
      modal_contents,
      modal_endtime,
    },
  })

  if (!post) return new Response(null, { status: 404 })
  return new Response(JSON.stringify(post))
}
