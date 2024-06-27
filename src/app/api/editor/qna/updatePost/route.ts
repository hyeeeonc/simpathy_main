import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  const { post_qnatype, post_id, post_qnatarget, post_title, post_contents } =
    await request.json()

  const post = await prisma.qnapost.update({
    where: { post_id: post_id },
    data: {
      post_qnatype,
      post_qnatarget,
      post_title,
      post_contents,
      post_upload_time: new Date(),
    },
  })

  if (!post) return new Response(null, { status: 404 })
  const responseBody = JSON.stringify(post)

  return new Response(responseBody, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
// export async function POST(request: Request) {
//   const { board_id, user_id, post_title, post_contents } = await request.json()

//   const post = await prisma.post.create({
//     data: {
//       board_id,
//       user_id,
//       post_title,
//       post_contents,
//       post_upload_time: new Date(),
//     },
//   })

//   if (!post) return new Response(null, { status: 404 })
//   const responseBody = JSON.stringify(post)

//   return new Response(responseBody, {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' },
//   })
// }
