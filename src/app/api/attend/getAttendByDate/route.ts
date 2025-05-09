import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function POST(req: Request) {
  try {
    const { date, branch_id } = await req.json()

    // 1. 날짜와 지점으로 attend_snapshot 조회
    const snapshots = await prisma.attend_snapshot.findMany({
      where: {
        attend_date: new Date(date),
        branch_id: branch_id
      }
    })

    if (snapshots.length === 0) {
      return NextResponse.json({ error: '해당 날짜의 출석 데이터가 없습니다.' }, { status: 404 })
    }

    // 2. attend_summary 조회
    const summary = await prisma.attend_summary.findUnique({
      where: {
        attend_date_branch_id: {
          attend_date: new Date(date),
          branch_id: branch_id
        }
      }
    })

    // 3. attendances 데이터 가공 (User 타입으로 변환)
    const users = snapshots.map(att => ({
      user_id: att.user_id,
      user_name: att.user_name,
      user_phone: att.user_phone,
      user_parent_phone: att.user_parent_phone,
      branch_id: att.branch_id,
      grade_id: att.grade_id,
      status: att.status,
      note: att.note
    }))

    return NextResponse.json({
      ok: true,
      data: {
        users,
        summary: summary ? {
          refund: summary.refund,
          newcomer: summary.newcomer,
          reregister: summary.reregister,
          branch_move: summary.branch_move,
          special_note: summary.special_note,
          newcomer_student: summary.newcomer_student,
          absent_student: summary.absent_student,
          refund_student: summary.refund_student,
          branch_move_detail: summary.branch_move_detail
        } : null,
        date: snapshots[0].attend_date
      }
    })

  } catch (error) {
    console.error('Error in getAttendByDate:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
} 