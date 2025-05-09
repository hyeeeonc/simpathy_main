import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    }

    const { post_id } = await req.json()

    // 이미 예약된 게시물인지 확인
    const post = await prisma.qnapost.findUnique({
      where: { post_id: Number(post_id) },
      select: { reserve_user_id: true, post_isAnswered: true },
    })

    if (!post) {
      return NextResponse.json({ error: '존재하지 않는 게시물입니다.' }, { status: 404 })
    }

    if (post.reserve_user_id) {
      return NextResponse.json({ error: '이미 예약된 게시물입니다.' }, { status: 400 })
    }

    if (post.post_isAnswered !== 0 && post.post_isAnswered !== 2) {
      return NextResponse.json({ error: '답변 대기 중인 게시물만 예약할 수 있습니다.' }, { status: 400 })
    }

    // 예약하기
    await prisma.qnapost.update({
      where: { post_id: Number(post_id) },
      data: { reserve_user_id: currentUser.user_id },
    })

    return NextResponse.json({ message: '예약이 완료되었습니다.' })
  } catch (error) {
    console.error('예약하기 에러:', error)
    return NextResponse.json({ error: '예약 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    }

    const { post_id } = await req.json()

    const post = await prisma.qnapost.findUnique({
      where: { post_id: Number(post_id) },
      select: { reserve_user_id: true, user_id: true },
    })

    if (!post) {
      return NextResponse.json({ error: '존재하지 않는 게시물입니다.' }, { status: 404 })
    }

    // 최고 운영자(grade_id === 1)이거나 예약자 본인인 경우에만 예약 취소 가능
    if (currentUser.grade_id !== 1 && post.reserve_user_id !== currentUser.user_id) {
      return NextResponse.json({ error: '예약을 취소할 권한이 없습니다.' }, { status: 403 })
    }

    // 예약 취소하기
    await prisma.qnapost.update({
      where: { post_id: Number(post_id) },
      data: { reserve_user_id: null },
    })

    return NextResponse.json({ message: '예약이 취소되었습니다.' })
  } catch (error) {
    console.error('예약 취소하기 에러:', error)
    return NextResponse.json({ error: '예약 취소 중 오류가 발생했습니다.' }, { status: 500 })
  }
} 