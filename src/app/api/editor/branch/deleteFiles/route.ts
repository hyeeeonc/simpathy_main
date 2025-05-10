import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function DELETE(request: Request) {
  try {
    const { files, post_id } = await request.json()

    // 데이터베이스에서 파일 레코드 삭제
    const deletePromises = files.map((file: any) => {
      return prisma.branchfile.delete({
        where: {
          file_id: file.file_id,
          post_id: post_id,
        },
      })
    })

    await Promise.all(deletePromises)

    return NextResponse.json({ message: '파일이 성공적으로 삭제되었습니다.' })
  } catch (error) {
    console.error('파일 삭제 중 오류 발생:', error)
    return NextResponse.json(
      { error: '파일 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 