import BoardTable from '@/containers/board/BoardTable'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'

const BoardPage = async (props: any) => {
  const board_id = Number(props.params.id)
  const currentUser = await getCurrentUser()
  const currentBoard = await prisma.board.findUnique({
    where: { board_id },
  })

  if (!currentBoard) {
    return <div>존재하지 않는 게시판입니다.</div>
  }

  if (
    !currentUser ||
    currentUser.grade_id === undefined ||
    currentUser.grade_id > currentBoard.board_read_auth
  ) {
    return <div>권한이 없습니다.</div>
  }

  const posts = await prisma.post.findMany({
    where: {
      board_id,
    },
    orderBy: {
      post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
    },
  })

  // posts를 순회하면서 날짜를 변경하고 포맷팅
  const formattedPosts = posts.map(post => {
    // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
    const uploadTime = new Date(post.post_upload_time)

    // 한국 표준시로 변경 (UTC+9)
    const koreanTime = new Date(uploadTime.getTime())

    // 날짜를 'yyyy.mm.dd hh.mm.ss' 형식의 문자열로 변환
    const formattedDate = `${koreanTime.getFullYear()}.${(
      koreanTime.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}.${koreanTime.getDate().toString().padStart(2, '0')}`

    // 변환된 값을 포함하는 새로운 객체를 반환
    return {
      ...post,
      formattedDate,
    }
  })

  return (
    <>
      <div className="w-full mt-20">
        <div className="text-sky-800 text-3xl font-bold mb-[100px]">
          {currentBoard.board_name}
        </div>
        {posts.length === 0 && (
          <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
            등록된 게시글이 없습니다.
          </div>
        )}
        {posts.length !== 0 && <BoardTable posts={formattedPosts} />}
      </div>
    </>
  )
}

export default BoardPage
