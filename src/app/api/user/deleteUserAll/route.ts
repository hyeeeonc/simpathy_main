import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export async function DELETE(request: Request) {
  const { user_ids } = await request.json() // user_ids는 삭제할 사용자 ID 배열
  const session = await getServerSession()

  // "알 수 없음" 사용자 찾기
  const unknownUser = await prisma.user.findUnique({
    where: { user_id: '(알 수 없음)' },
  })

  const currentUser = await prisma.user.findFirst({
    where: {
      user_id: session?.user.email,
    },
  })

  if (!unknownUser) {
    return new Response('알 수 없음 사용자 존재하지 않음', { status: 404 })
  }

  if (!currentUser || currentUser.grade_id > 2) {
    return new Response('Forbidden: Access denied', { status: 403 })
  }

  try {
    await prisma.$transaction(async tx => {
      // 외래키 값들을 "(알 수 없음)"으로 업데이트
      await tx.attend.updateMany({
        where: { user_id: { in: user_ids } },
        data: { user_id: '(알 수 없음)' },
      })

      await tx.consulting.updateMany({
        where: { user_id: { in: user_ids } },
        data: { user_id: '(알 수 없음)' },
      })

      await tx.reply.updateMany({
        where: { user_id: { in: user_ids } },
        data: { user_id: '(알 수 없음)' },
      })

      await tx.post.updateMany({
        where: { user_id: { in: user_ids } },
        data: { user_id: '(알 수 없음)' },
      })

      await tx.qnapost.updateMany({
        where: { user_id: { in: user_ids } },
        data: { user_id: '(알 수 없음)' },
      })

      await tx.qnareply.updateMany({
        where: { user_id: { in: user_ids } },
        data: { user_id: '(알 수 없음)' },
      })

      await tx.branchpost.updateMany({
        where: { user_id: { in: user_ids } },
        data: { user_id: '(알 수 없음)' },
      })

      // 사용자 삭제
      await tx.user.deleteMany({
        where: { user_id: { in: user_ids } },
      })
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE transaction:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
