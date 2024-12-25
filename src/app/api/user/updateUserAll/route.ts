import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  const {
    user_ids, // 여러 user_id를 배열로 받습니다.
    grade_id, // 업데이트할 grade_id
    branch_id, // 업데이트할 branch_id
  } = await request.json()

  // user_ids 배열을 이용해 updateMany로 여러 사용자의 정보를 업데이트
  const updatedUsers = await prisma.user.updateMany({
    where: {
      user_id: {
        in: user_ids, // user_ids 배열에 포함된 user_id들만 업데이트
      },
    },
    data: {
      grade_id, // 전달된 grade_id로 업데이트
      branch_id, // 전달된 branch_id로 업데이트
    },
  })

  // 업데이트된 사용자 수를 확인
  if (updatedUsers.count === 0) return new Response(null, { status: 404 })
  return new Response(null, { status: 200 })
}
