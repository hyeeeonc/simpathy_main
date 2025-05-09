import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { branch_id, date, attendances, summary } = body

    // 1. 입력값 검증
    if (!branch_id || !date || !Array.isArray(attendances) || attendances.length === 0) {
      return NextResponse.json({ ok: false, error: '필수값 누락' }, { status: 400 })
    }
    if (!summary) {
      return NextResponse.json({ ok: false, error: '요약 정보 누락' }, { status: 400 })
    }
    // 날짜 포맷 체크 (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ ok: false, error: '날짜 포맷 오류' }, { status: 400 })
    }
    // attendances 각 항목 체크
    for (const a of attendances) {
      if (!a.user_id || !a.user_name || !a.status) {
        return NextResponse.json({ ok: false, error: '학생 정보 누락' }, { status: 400 })
      }
    }

    // 2. 트랜잭션 처리 (모두 성공/실패)
    await prisma.$transaction(async (tx) => {
      const dateObj = new Date(date) // date가 "2025-05-10"이면 Date 객체로 변환됨

      // 기존 출석 삭제
      await tx.attend_snapshot.deleteMany({
        where: { attend_date: dateObj, branch_id }
      })
      // 출석 저장
      await tx.attend_snapshot.createMany({
        data: attendances.map((a: any) => ({
          attend_date: dateObj,
          branch_id,
          ...a
        }))
      })
      // 요약 upsert
      await tx.attend_summary.upsert({
        where: { attend_date_branch_id: { attend_date: dateObj, branch_id } },
        update: { ...summary },
        create: {
          attend_date: dateObj,
          branch_id,
          ...summary
        }
      })
    })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    // Prisma 에러 상세 처리
    if (e.code === 'P2002') {
      // unique 제약 위반
      return NextResponse.json({ ok: false, error: '중복 데이터(UNIQUE 위반)' }, { status: 409 })
    }
    // 기타 에러
    console.error(e)
    return NextResponse.json({ ok: false, error: e.message || String(e) }, { status: 500 })
  }
}