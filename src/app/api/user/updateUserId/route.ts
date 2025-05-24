import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'

export async function PUT(request: Request) {
  try {
    const session = await getServerSession()
    const { old_user_id, new_user_id } = await request.json()

    // 현재 사용자 권한 확인
    const currentUser = await prisma.user.findFirst({
      where: {
        user_id: session?.user.email,
      },
    })

    if (!currentUser || currentUser.grade_id > 2) {
      return new Response('권한이 없습니다.', { status: 403 })
    }

    // 기존 사용자 정보 조회
    const oldUser = await prisma.user.findUnique({
      where: { user_id: old_user_id },
    })

    if (!oldUser) {
      return new Response('사용자를 찾을 수 없습니다.', { status: 404 })
    }

    // 새 사용자 ID가 이미 존재하는지 확인
    const existingUser = await prisma.user.findUnique({
      where: { user_id: new_user_id },
    })

    if (existingUser) {
      return new Response('이미 존재하는 사용자 ID입니다.', { status: 400 })
    }

    // 트랜잭션으로 처리
    await prisma.$transaction(async (tx) => {
      // 1. 새 사용자 생성
      await tx.user.create({
        data: {
          user_id: new_user_id,
          user_pw: oldUser.user_pw,
          user_name: oldUser.user_name,
          user_phone: oldUser.user_phone,
          user_parent_phone: oldUser.user_parent_phone,
          grade_id: oldUser.grade_id,
          branch_id: oldUser.branch_id,
        },
      })

      // 2. 관련 테이블들의 user_id 업데이트
      await tx.attend.updateMany({
        where: { user_id: old_user_id },
        data: { user_id: new_user_id },
      })

      await tx.consulting.updateMany({
        where: { user_id: old_user_id },
        data: { user_id: new_user_id },
      })

      await tx.reply.updateMany({
        where: { user_id: old_user_id },
        data: { user_id: new_user_id },
      })

      await tx.post.updateMany({
        where: { user_id: old_user_id },
        data: { user_id: new_user_id },
      })

      await tx.qnapost.updateMany({
        where: { user_id: old_user_id },
        data: { user_id: new_user_id },
      })

      await tx.qnareply.updateMany({
        where: { user_id: old_user_id },
        data: { user_id: new_user_id },
      })

      await tx.branchpost.updateMany({
        where: { user_id: old_user_id },
        data: { user_id: new_user_id },
      })

      // 3. 기존 사용자 삭제
      await tx.user.delete({
        where: { user_id: old_user_id },
      })
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('서버 오류가 발생했습니다.', { status: 500 })
  }
} 