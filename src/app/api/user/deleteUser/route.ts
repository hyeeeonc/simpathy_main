import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export async function DELETE(request: Request) {
  const { user_id } = await request.json()
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

  // 외래키 값들을 "(알 수 없음)"으로 업데이트
  await prisma.attend.updateMany({
    where: { user_id },
    data: { user_id: '(알 수 없음)' },
  })

  await prisma.consulting.updateMany({
    where: { user_id },
    data: { user_id: '(알 수 없음)' },
  })

  await prisma.reply.updateMany({
    where: { user_id },
    data: { user_id: '(알 수 없음)' },
  })

  await prisma.post.updateMany({
    where: { user_id },
    data: { user_id: '(알 수 없음)' },
  })

  await prisma.qnapost.updateMany({
    where: { user_id },
    data: { user_id: '(알 수 없음)' },
  })

  await prisma.qnareply.updateMany({
    where: { user_id },
    data: { user_id: '(알 수 없음)' },
  })

  await prisma.branchpost.updateMany({
    where: { user_id },
    data: { user_id: '(알 수 없음)' },
  })

  // 사용자 삭제
  const user = await prisma.user.delete({
    where: { user_id },
  })

  if (!user) {
    return new Response(null, { status: 404 })
  }

  return new Response(null, { status: 200 })
}
