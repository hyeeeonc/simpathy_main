import BoardTable from '@/containers/board/BoardTable'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import BoardPagination from '@/containers/board/BoardPagination'
import branchPagenation from '@/services/board/branchPagenation'
import BranchBoardTable from '@/containers/board/BranchBoardTable'
import BranchBoardSearch from '@/containers/board/BranchBoardSearch'
import QnaBoardTable from '@/containers/board/QnaBoardTable'

const BoardPage = async (props: any) => {
  const user = await getCurrentUser()

  if (!user) {
    return <div>로그인이 필요합니다.</div>
  }

  const posts = await prisma.qnapost.findMany()

  // if (user?.grade_id === undefined || user?.grade_id >= 4) {
  //   return (
  //     <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
  //       접근 권한이 없습니다.
  //     </div>
  //   )
  // }

  // const pageSize = 15 // 한 페이지당 노출할 post 개수

  // const pageHandler = () => {
  //   const page = props.searchParams.page
  //   if (!/^\d+$/.test(page) || page === undefined || page === null) return 1
  //   else if (Number(page) < 1) return 1
  //   else return Number(page)
  // }

  // const totalPost = await prisma.branchpost.count()

  // const page = pageHandler()

  // const searchText = props.searchParams.search
  // const searchType = props.searchParams.searchType
  // console.log(searchText, searchType)

  // if (
  //   (user?.grade_id === undefined || user?.grade_id >= 3) &&
  //   (searchType != undefined || searchText != undefined)
  // ) {
  //   return (
  //     <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
  //       접근 권한이 없습니다.
  //     </div>
  //   )
  // }

  // const posts = await branchPagenation(
  //   user?.branch_id,
  //   page,
  //   pageSize,
  //   searchText,
  //   searchType,
  // )

  // const totalPage = Math.ceil(totalPost / pageSize)

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
        {posts.length === 0 && (
          <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
            등록된 게시글이 없습니다.
          </div>
        )}
        {posts.length !== 0 && (
          <>
            <QnaBoardTable posts={formattedPosts} />
          </>
        )}
      </div>
    </>
  )
}

export default BoardPage
