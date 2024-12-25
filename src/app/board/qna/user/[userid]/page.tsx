import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import QnaBoardTable from '@/containers/board/QnaBoardTable'
import QnaPagination from '@/containers/board/QnaPagination'
// import qnaPagination from '@/services/board/qnaPagination'

export const revalidate = 1

const BoardPage = async (props: any) => {
  const user_id = decodeURIComponent(props.params.userid)
  const user = await getCurrentUser()

  if (!user) {
    return <div>로그인이 필요합니다.</div>
  }

  // const posts = await prisma.qnapost.findMany()

  if (user?.grade_id === undefined || user?.grade_id >= 6) {
    return (
      <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
        접근 권한이 없습니다.
      </div>
    )
  }

  if (user?.grade_id >= 3 && user?.user_id !== user_id) {
    return (
      <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
        접근 권한이 없습니다.
      </div>
    )
  }

  const posts = await prisma.qnapost.findMany({
    where: { user_id },
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
          질문게시판
        </div>
        {/* {posts.length === 0 && (
          <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
            등록된 게시글이 없습니다.
          </div>
        )} */}

        <>
          <QnaBoardTable isAdmin={false} isUser={true} posts={formattedPosts} />
        </>
      </div>
    </>
  )
}

export default BoardPage
